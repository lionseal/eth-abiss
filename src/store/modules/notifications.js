import { Getters, Mutations, Init } from "../StoreHelper";
export default {
  namespaced: true,
  state: {
    all: Init([], "success")
  },
  getters: Getters,
  mutations: {
    ...Mutations,
    dismiss(state, index) {
      state.all.data.splice(index, 1);
    }
  },
  actions: {
    dismiss({ commit }, index) {
      commit("dismiss", index);
    }
  },
  modules: {}
};
