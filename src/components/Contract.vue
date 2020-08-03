<template>
  <div>
    <h4 class="title is-4">{{ name }}</h4>
    <div class="tabs">
      <ul>
        <li
          v-for="(v, i) in tabs"
          :key="i"
          :class="{ 'is-active': activeTab === i }"
          @click="activeTab = i"
        >
          <a>{{ v }}</a>
        </li>
      </ul>
    </div>
    <Method class="mt-5" v-for="(v, i) in methods" :key="i" :method="v" />
  </div>
</template>

<script>
import Method from "../components/Method";
export default {
  components: {
    Method
  },
  data: () => ({
    activeTab: 0,
    tabs: ["read", "write", "events"]
  }),
  props: {
    name: { type: String, default: null },
    contract: { type: Object, default: null }
  },
  computed: {
    tab() {
      return this.tabs[this.activeTab];
    },
    methods() {
      return this.contract.abi.filter(
        v =>
          (this.tab === "read" && v.constant) ||
          (this.tab === "write" && !v.constant) ||
          (this.tab === "events" && v.type === "event")
      );
    }
  }
};
</script>

<style scoped>
.tabs {
  text-transform: capitalize;
}
</style>
