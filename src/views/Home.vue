<template>
  <div>
    <section class="hero">
      <div class="hero-body py-5">
        <div class="container">
          <h1 class="title">
            Welcome to ETH ABIss
          </h1>
          <h2 class="subtitle">
            Drag and drop your deployments and interact with your contracts
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
      <Upload />
      <Contract :name="contractName" :contract="contract" />
    </div>
  </div>
</template>

<script>
import Contract from "../components/Contract";
import Upload from "../components/Upload";
import { deploymentsMixin } from "../mixins";
export default {
  components: {
    Contract,
    Upload
  },
  mixins: [deploymentsMixin]
};
</script>

<style scoped></style>
