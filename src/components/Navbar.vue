<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <a class="navbar-item" :href="url">
        <img class="mr-3" src="/ethereum-eth-logo.svg" width="18" height="28" />
        <span>ETH ABIss</span>
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="change('sidebar', !sidebar)"
        :class="{ 'is-active': sidebar }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <a
            class="button is-primary is-small"
            href="https://github.com/lionseal/eth-abiss"
            target="_blank"
            rel="noopener"
          >
            <span class="icon"><img src="../assets/github.png"/></span>
            <span>Source</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { storeMixin } from "../mixins";
export default {
  mixins: [storeMixin],
  computed: {
    sidebar() {
      return this.$store.getters["get"]("sidebar");
    },
    url() {
      return process.env.BASE_URL;
    }
  }
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}
</style>
