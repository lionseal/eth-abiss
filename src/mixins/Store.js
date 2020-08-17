export default {
  methods: {
    change(prop, value) {
      this.$store.dispatch("set", { prop, value });
    }
  }
};
