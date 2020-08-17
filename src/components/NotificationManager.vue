<template>
  <div class="notifications-container">
    <template v-if="!dismissed">
      <Notification
        v-if="!web3Detected"
        class="is-warning"
        removable
        @dismiss="dismissed = true"
      >
        No web3 provider detected.
      </Notification>
      <Notification
        v-else-if="!isValidChain"
        class="is-warning"
        removable
        @dismiss="dismissed = true"
      >
        The selected chain id does not match the provider chain id.
      </Notification>
    </template>
  </div>
</template>

<script>
import Notification from "./Notification";
export default {
  components: {
    Notification
  },
  data: () => ({
    dismissed: false
  }),
  computed: {
    web3Detected() {
      return this.$store.getters["web3Detected"];
    },
    isValidChain() {
      return this.$store.getters["isValidChainId"];
    }
  },
  watch: {
    isValidChain(val) {
      if (!val) this.dismissed = false;
    }
  }
};
</script>
