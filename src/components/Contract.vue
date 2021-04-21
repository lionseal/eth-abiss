<template>
  <div class="contract box">
    <h4 class="title is-4">{{ name }} {{ contract.address }}</h4>
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
    <Method
      class="mt-5"
      v-for="(v, i) in methods"
      :key="`${i}-${contract.address}-${v.name}`"
      :method="v"
    />
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
      const methods = this.contract
        ? this.contract.abi.filter(
            v =>
              (this.tab === "read" && v.type === "function" && v.constant) ||
              (this.tab === "write" && v.type === "function" && !v.constant) ||
              (this.tab === "events" && v.type === "event")
          )
        : [];
      return methods.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        if (a.inputs.length > b.inputs.length) return 1;
        if (a.inputs.length < b.inputs.length) return -1;
        return 0;
      });
    }
  }
};
</script>

<style scoped>
.tabs {
  text-transform: capitalize;
}
.contract.box {
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}
</style>
