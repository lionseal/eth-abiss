import Vue from "vue";
import Vuex from "vuex";
import { Getters, Mutations, Actions } from "./StoreHelper";
import exampleDeployments from "../assets/example-deployments.json";

const localDeployments = localStorage.getItem("deployments");
const deployments = localDeployments ? JSON.parse(localDeployments) : null;

Vue.use(Vuex);

async function executeMethod({ commit, getters }, { method, inputs }, call) {
  const chainId = getters.get("chainId");
  const networkName = getters.get("networkName");
  const contractName = getters.get("contractName");
  const index = getters.getResults(method.name).length;
  commit("addCallResult", {
    chainId,
    networkName,
    contractName,
    methodName: method.name,
    inputs,
    index
  });
  const result = await Vue.prototype[call](
    getters.get("deployments"),
    chainId,
    networkName,
    contractName,
    method,
    inputs,
    undefined,
    index
  );
  commit("addCallResult", {
    chainId,
    networkName,
    contractName,
    methodName: method.name,
    inputs,
    result,
    index
  });
}

export default new Vuex.Store({
  state: {
    deployments: {
      data: deployments || exampleDeployments,
      status: "success"
    },
    chainId: { data: "1", status: "success" },
    networkName: { data: "mainnet", status: "success" },
    contractName: { data: "Asset", status: "success" },
    calls: {},
    sidebar: { data: false, status: "success" },
    web3ChainId: { data: null, status: "success" }
  },
  getters: {
    ...Getters,
    getResults: (state, getters) => methodName => {
      const data = state.calls;
      const chainId = getters.get("chainId");
      const networkName = getters.get("networkName");
      const contractName = getters.get("contractName");
      if (!data[chainId]) return [];
      if (!data[chainId][networkName]) return [];
      if (!data[chainId][networkName][contractName]) return [];
      if (!data[chainId][networkName][contractName][methodName]) return [];
      return data[chainId][networkName][contractName][methodName];
    },
    web3Detected: (state, getters) => {
      return getters.get("web3ChainId", null) !== null;
    },
    isValidChainId: (state, getters) => {
      return getters.get("chainId") == getters.get("web3ChainId");
    }
  },
  mutations: {
    ...Mutations,
    addCallResult(
      state,
      { chainId, networkName, contractName, methodName, inputs, result, index }
    ) {
      Vue.set(state, "calls", state.calls || {});
      Vue.set(state.calls, chainId, state.calls[chainId] || {});
      Vue.set(
        state.calls[chainId],
        networkName,
        state.calls[chainId][networkName] || {}
      );
      Vue.set(
        state.calls[chainId][networkName],
        contractName,
        state.calls[chainId][networkName][contractName] || {}
      );
      Vue.set(
        state.calls[chainId][networkName][contractName],
        methodName,
        state.calls[chainId][networkName][contractName][methodName] || []
      );
      Vue.set(
        state.calls[chainId][networkName][contractName][methodName],
        index,
        { inputs, result }
      );
      return index;
    }
  },
  actions: {
    ...Actions,
    updateDeployments({ dispatch }, data) {
      localStorage.setItem("deployments", JSON.stringify(data));
      return dispatch("set", { prop: "deployments", value: data });
    },
    async readCall(context, params) {
      await executeMethod(context, params, "$methodCall");
    },
    async writeCall(context, params) {
      await executeMethod(context, params, "$methodSend");
    }
  },
  modules: {}
});
