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
        :values="contractNames"
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
  },
  watch: {
    chainId() {
      this.$store.dispatch("setState", { prop: "networkName", value: null });
    },
    networkName() {
      this.$store.dispatch("setState", { prop: "contractName", value: null });
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
