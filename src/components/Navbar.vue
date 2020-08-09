<template>
  <nav class="navbar is-black">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
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
  </nav>
</template>

<script>
import { storeMixin } from "../mixins";
export default {
  mixins: [storeMixin],
  computed: {
    sidebar() {
      return this.$store.getters["get"]("sidebar");
    }
  }
};
</script>

<style scoped></style>
