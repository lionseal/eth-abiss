<template>
  <div class="select">
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option v-for="(v, i) in values" :key="i">
        {{ v }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    values: { type: Array, default: null },
    value: { type: String, default: null }
  }
};
</script>

<style></style>
