<template>
  <ul class="sidebar-list m-1 mr-0" :class="{ 'menu-list': isMenuList }">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    isMenuList: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
.sidebar-list .sidebar-list {
  margin-right: 0 !important;
  padding-left: 0.5rem;
}
</style>
