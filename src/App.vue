<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer";
export default {
  components: {
    Footer
  }
};
</script>

<style>
@media (prefers-color-scheme: dark) {
  .select select {
    background-color: #0a0a0a;
    border-color: #363636;
    color: #dbdbdb;
  }
}
</style>
