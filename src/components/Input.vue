<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            type="text"
            :value="value"
            :placeholder="placeholder"
            @input="$emit('input', $event.target.value)"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: null },
    value: { type: String, default: null },
    placeholder: { type: String, default: null }
  }
};
</script>
