<template>
  <div id="app">
    <Navbar />
    <Sidebar />
    <div class="main-content">
      <router-view class="container" />
    </div>
    <Footer v-if="false" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
export default {
  components: {
    Navbar,
    Footer,
    Sidebar
  }
};
</script>

<style>
*::-webkit-scrollbar {
  width: 0.25em;
}

*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>

<style scoped>
.navbar {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  width: 100%;
}
.sidebar {
  position: fixed;
  left: 0;
  top: 52px;
  width: 300px;
  height: calc(100% - 52px);
  overflow: auto;
}
.main-content {
  margin-left: 300px;
  margin-top: 52px;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
}
.footer {
  margin-left: 300px;
}
@media screen and (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  .footer {
    margin-left: 0;
  }
}
</style>
