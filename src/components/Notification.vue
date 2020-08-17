<template>
  <div class="notification" @click="e => $emit('click', e)">
    <button
      v-if="removable"
      class="delete"
      @click="e => $emit('dismiss', e)"
    ></button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    removable: { type: Boolean, default: false }
  }
};
</script>
