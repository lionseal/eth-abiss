<template>
  <aside
    class="sidebar column is-2 is-fullheight section py-5"
    :class="{ 'is-hidden-mobile': !sidebar }"
  >
    <p class="menu-label">Select contract</p>
    <SidebarList is-menu-list v-for="(x, i) in chainIds" :key="`${x}-${i}`">
      <SidebarListItem
        :item="x"
        @click="change('chainId', x)"
        has-chevron
        :is-open="x === chainId"
      >
        <template v-if="x === chainId">
          <SidebarList>
            <SidebarListItem
              v-for="(y, j) in networkNames"
              :key="`${y}-${j}`"
              :item="y"
              has-chevron
              :is-open="y === networkName"
              @click="change('networkName', y)"
            >
              <template v-if="y === networkName">
                <SidebarList>
                  <SidebarListItem
                    v-for="(z, k) in contractNames"
                    :key="`${z}-${k}`"
                    :item="z"
                    :is-active="z === contractName"
                    @click="change('contractName', z)"
                  >
                  </SidebarListItem>
                </SidebarList>
              </template>
            </SidebarListItem>
          </SidebarList>
        </template>
      </SidebarListItem>
    </SidebarList>
  </aside>
</template>

<script>
import { deploymentsMixin, storeMixin } from "../mixins";
import SidebarList from "./SidebarList";
import SidebarListItem from "./SidebarListItem";
export default {
  components: {
    SidebarList,
    SidebarListItem
  },
  mixins: [deploymentsMixin, storeMixin],
  computed: {
    sidebar() {
      return this.$store.getters["get"]("sidebar");
    }
  },
  watch: {
    chainId() {
      this.$store.dispatch("setState", {
        prop: "networkName",
        value: this.networkNames.length > 0 ? this.networkNames[0] : null
      });
    },
    networkName() {
      this.$store.dispatch("setState", {
        prop: "contractName",
        value: this.contractNames.length > 0 ? this.contractNames[0] : null
      });
    }
  }
};
</script>

<style scoped>
.sidebar {
  z-index: 1;
  background-color: white;
}
@media (prefers-color-scheme: dark) {
  .sidebar {
    background-color: #0a0a0a;
  }
}
.contract-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chevron {
  display: block;
  position: absolute;
  left: auto;
  right: 0;
}
.network {
  margin: 0.25rem;
}
.contract {
  margin: 0.25rem;
}
@media screen and (max-width: 768px) {
  .sidebar {
    width: 100% !important;
  }
}
</style>
