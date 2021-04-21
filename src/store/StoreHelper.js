import Vue from "vue";

export const SUCCESS = "success";
export const LOADING = "loading";
export const ERROR = "error";

export function Init(data, status) {
  if (![SUCCESS, LOADING, ERROR].includes(status)) {
    throw new Error("Invalid status");
  }
  return { data, status };
}

export function Commiter(commit, prop) {
  const onCommit = (data, status) => commit("SET", { prop, status, data });
  return {
    loading: progress => onCommit(progress, LOADING),
    success: data => onCommit(data, SUCCESS),
    error: err => onCommit(err, ERROR)
  };
}

export const Mutations = {
  SET(state, { prop, status, data }) {
    Vue.set(state, prop, { status, data });
  }
};

export const Getters = {
  get: state => (prop, defaultValue = null) => {
    const value = state[prop];
    return value && value.status === SUCCESS ? value.data : defaultValue;
  },
  isLoading: state => props => {
    if (Array.isArray(props)) props = [props];
    return props.some(prop => state[prop] && state[prop].status === LOADING);
  }
};

export const Actions = {
  set({ commit }, { prop, value }) {
    Commiter(commit, prop).success(value);
  }
};
