import Vue from "vue";
import Vuex from "vuex";
import { Commiter, Getters, Mutations } from "./StoreHelper";
import deployments from "../assets/example-deployments.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deployments: { data: deployments, status: "success" },
    chainId: { data: "1", status: "success" },
    networkName: { data: "mainnet", status: "success" },
    contractName: { data: "Asset", status: "success" },
    calls: {}
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
    setState({ commit }, { prop, value }) {
      Commiter(commit, prop).success(value);
    },
    async call({ commit, getters }, { method, inputs }) {
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
        result,
        index
      });
      const result = await Vue.prototype.$methodCall(
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
  },
  modules: {}
});
