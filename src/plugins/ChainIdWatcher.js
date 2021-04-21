import store from "../store";

const web3ChainId = 1;

store.watch(
  state => state.chainId,
  value => {
    if (value != web3ChainId) {
      store.dispatch("notifications/add", { text: "Chain Id missmatches" });
    }
  }
);
