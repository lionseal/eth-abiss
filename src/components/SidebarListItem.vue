<template>
  <li>
    <a
      @click="$emit('click', item)"
      class="sidebar-list-item p-1"
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
  position: relative;
}

.sidebar-list-item.is-active {
  background-color: #009e86;
}

.sidebar-list-item.has-chevron.is-open::after {
  position: absolute;
  content: "˄";
  margin-left: auto;
  right: 0;
}

.sidebar-list-item.has-chevron.is-open:hover::after {
  color: #009e86;
}

.sidebar-list-item.has-chevron:not(.is-open)::after {
  position: absolute;
  content: "˅";
  margin-left: auto;
  right: 0;
}

.sidebar-list-item.has-chevron:not(.is-open):hover::after {
  color: #009e86;
}
</style>
