export default {
  methods: {
    change(prop, value) {
      this.$store.dispatch("setState", { prop, value });
    }
  }
};
