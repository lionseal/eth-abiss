<template>
  <ul class="sidebar-list" :class="{ 'menu-list': isMenuList }">
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
.sidebar-list {
  margin: 0.25rem;
}
.sidebar-list:not(.menu-list) {
  padding-left: 0.5rem;
}
</style>
