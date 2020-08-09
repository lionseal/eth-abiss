<template>
  <div class="method card">
    <div class="card-content">
      <h5 class="title is-5">{{ method.name }}</h5>
      <Input
        v-for="(v, i) in method.inputs"
        :key="i"
        v-model="inputs[v.name]"
        :label="v.name || v.type"
        :placeholder="v.type"
      />
      <LabelButton
        v-if="!isEvent && !isConstant"
        :label="operationType === 'write' ? 'Payable: ' + method.payable : ''"
        :text="operationType"
        :is-primary="operationType === 'write'"
        @click="execute"
      />
      <div v-if="results.length > 0">
        <div v-for="(v, i) in results" :key="i">
          <strong>Call {{ i + 1 }}: </strong><span>{{ v }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input";
import LabelButton from "../components/LabelButton";
export default {
  components: {
    Input,
    LabelButton
  },
  data: () => ({
    inputs: {}
  }),
  props: {
    method: { type: Object, default: null }
  },
  computed: {
    isConstant() {
      return this.method.type === "function" && this.method.inputs.length === 0;
    },
    type() {
      return this.isConstant ? "constant" : this.method.type;
    },
    operationType() {
      return this.method.type === "event"
        ? "event"
        : this.method.constant
        ? "read"
        : "write";
    },
    isEvent() {
      return this.method.type === "event";
    },
    results() {
      return this.$store.getters["getResults"](this.method.name);
    },
    methodInputs() {
      const inputs = [];
      this.method.inputs.forEach(i => inputs.push(this.inputs[i.name]));
      return inputs;
    }
  },
  watch: {
    isConstant() {
      if (this.isConstant) this.execute();
    }
  },
  mounted() {
    if (this.isConstant) this.execute();
  },
  methods: {
    execute() {
      if (this.isConstant && this.results.length > 0) return;
      this.$store.dispatch("call", {
        method: this.method,
        inputs: this.methodInputs
      });
    }
  }
};
</script>

<style scoped>
.method {
  border-radius: 8px;
}
@media (prefers-color-scheme: dark) {
  .method {
    box-shadow: none;
  }
}
</style>
