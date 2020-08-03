<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to ETH ABIss
          </h1>
          <h2 class="subtitle">
            Upload your deployments and interact with your contracts
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
      <p>TODO: upload section</p>
      <br />
      <Select
        :value="chainId"
        :values="chainIds"
        @input="v => change('chainId', v)"
      />
      <Select
        :value="networkName"
        :values="networkNames"
        @input="v => change('networkName', v)"
      />
      <Select
        :value="contractName"
        :values="contracts"
        class="mb-5"
        @input="v => change('contractName', v)"
      />
      <Contract :name="contractName" :contract="contract" />
    </div>
  </div>
</template>

<script>
import Contract from "../components/Contract";
import Select from "../components/Select";
export default {
  components: {
    Contract,
    Select
  },
  data: () => ({}),
  computed: {
    chainId() {
      return this.$store.getters["get"]("chainId", "1");
    },
    networkName() {
      return this.$store.getters["get"]("networkName", "mainnet");
    },
    contractName() {
      return this.$store.getters["get"]("contractName", "Asset");
    },
    deployments() {
      return this.$store.getters["get"]("deployments", {});
    },
    chainIds() {
      return Object.keys(this.deployments);
    },
    networkNames() {
      return this.chainId ? Object.keys(this.deployments[this.chainId]) : [];
    },
    contracts() {
      return this.networkName
        ? Object.keys(
            this.deployments[this.chainId][this.networkName].contracts
          )
        : [];
    },
    contract() {
      return this.contractName
        ? this.deployments[this.chainId][this.networkName].contracts[
            this.contractName
          ]
        : null;
    },
    address() {
      return this.contract ? this.contract.address : null;
    },
    abi() {
      return this.contract ? this.contract.abi : null;
    }
  },
  methods: {
    change(prop, value) {
      this.$store.dispatch("setState", { prop, value });
    }
  }
};
</script>

<style scoped>
.select + .select {
  margin-left: 1.5rem;
}
</style>
