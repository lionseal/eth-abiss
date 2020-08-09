<template>
  <li>
    <a
      @click="$emit('click', item)"
      class="sidebar-list-item"
      :class="{
        'is-active': isActive,
        'has-chevron': hasChevron,
        'is-open': isOpen
      }"
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
    isActive: { type: Boolean, default: false },
    hasChevron: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false }
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

.sidebar-list-item.is-active {
  background-color: #009e86;
}

.sidebar-list-item.has-chevron.is-open::after {
  position: absolute;
  content: "˄";
  margin-left: auto;
  right: 1.75rem;
}

.sidebar-list-item.has-chevron.is-open:hover::after {
  color: #009e86;
}

.sidebar-list-item.has-chevron:not(.is-open)::after {
  position: absolute;
  content: "˅";
  margin-left: auto;
  right: 1.75rem;
}

.sidebar-list-item.has-chevron:not(.is-open):hover::after {
  color: #009e86;
}
</style>
