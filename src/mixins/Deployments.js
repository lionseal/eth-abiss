export default {
  computed: {
    deployments() {
      return this.$store.getters["get"]("deployments", {});
    },
    chainId() {
      return this.$store.getters["get"]("chainId");
    },
    networkName() {
      return this.$store.getters["get"]("networkName");
    },
    contractName() {
      return this.$store.getters["get"]("contractName");
    },
    chainIds() {
      return Object.keys(this.deployments);
    },
    chain() {
      return this.deployments[this.chainId];
    },
    network() {
      return this.chain ? this.chain[this.networkName] : null;
    },
    networkNames() {
      return this.chain ? Object.keys(this.chain) : [];
    },
    contracts() {
      return this.network ? this.network.contracts : null;
    },
    contractNames() {
      return this.contracts ? Object.keys(this.contracts) : [];
    },
    contract() {
      return this.contracts ? this.contracts[this.contractName] : null;
    },
    address() {
      return this.contract ? this.contract.address : null;
    },
    abi() {
      return this.contract ? this.contract.abi : null;
    }
  }
};
