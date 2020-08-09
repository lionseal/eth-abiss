<template>
  <div class="field">
    <label class="label ml-1">{{ label }}</label>
    <div class="control">
      <div class="select">
        <select :value="value" @input="$emit('input', $event.target.value)">
          <option v-for="(v, i) in values" :key="`${i}-${v}`">
            {{ v }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: null },
    values: { type: Array, default: null },
    value: { type: String, default: null }
  }
};
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  .select select {
    background-color: #0a0a0a;
    border-color: #363636;
    color: #dbdbdb;
  }
}
</style>
