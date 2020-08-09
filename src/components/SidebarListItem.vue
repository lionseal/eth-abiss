<template>
  <li>
    <a
      @click="$emit('click', item)"
      class="sidebar-list-item"
      :class="{ 'is-active': isActive }"
      :title="item"
    >
      {{ item }}
    </a>
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    item: { type: String, default: null },
    isActive: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
.sidebar-list-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0.25rem;
}
</style>
