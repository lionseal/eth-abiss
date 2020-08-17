import Vue from "vue";
export function Commiter(commit, state) {
  return {
    loading: progress => {
      commit("registerState", { state, status: "loading", data: progress });
      return true;
    },
    success: data => {
      commit("registerState", { state, status: "success", data });
      return true;
    },
    error: err => {
      commit("registerState", { state, status: "error", data: err });
      return false;
    }
  };
}

export const Mutations = {
  registerState(state, payload) {
    Vue.set(state, payload.state, {
      status: payload.status,
      data: payload.data
    });
  }
};

export const Getters = {
  get: state => (name, defaultValue = null) => {
    const value = state[name];
    return value && value.status === "success" ? value.data : defaultValue;
  }
};

export const Actions = {
  set({ commit }, { prop, value }) {
    Commiter(commit, prop).success(value);
  }
};
