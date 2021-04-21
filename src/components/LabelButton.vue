<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">
        {{ label }}
      </label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <button
            class="button"
            :class="{ 'is-primary': isPrimary }"
            @click="e => $emit('click', e)"
          >
            {{ text }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: null },
    label: { type: String, default: null },
    isPrimary: { type: Boolean, default: false }
  }
};
</script>
