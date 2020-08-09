<template>
  <nav class="navbar is-black">
    <div class="navbar-brand">
      <a class="navbar-item" :href="url">
        ETH ABIss
      </a>
      <a
        role="button"
        class="navbar-burger is-hidden-tablet"
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
            class="button is-primary"
            href="https://github.com/lionseal/eth-abiss"
            target="_blank"
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

<style scoped></style>
