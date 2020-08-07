<template>
  <div
    @drop.prevent="addFile"
    @dragover.prevent
    @dragleave="hideDropZone"
    @dragenter.prevent="showEffect"
    @dragover.prevent="showEffect"
    class="drop-zone"
    :style="style"
  ></div>
</template>

<script>
export default {
  data: () => ({
    dragenter: null,
    dropZoneVisible: false
  }),
  computed: {
    style() {
      return { visibility: this.dropZoneVisible ? "visible" : "hidden" };
    }
  },
  mounted() {
    this.dragenter = window.addEventListener("dragenter", this.showDropZone);
  },
  destroyed() {
    window.removeEventListener("dragenter", this.dragenter);
  },
  methods: {
    addFile(e) {
      this.hideDropZone();
      const droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      [...droppedFiles]
        .slice(0, 1) // only one file
        .filter(f => f.type === "application/json")
        .forEach(f => {
          const reader = new FileReader();
          reader.onload = e => {
            let json;
            try {
              json = JSON.parse(e.target.result);
            } catch {
              window.alert("Couldn't parse the file");
            }
            this.$store.dispatch("updateDeployments", json);
          };
          reader.readAsText(f);
        });
    },
    showDropZone() {
      this.dropZoneVisible = true;
    },
    hideDropZone() {
      this.dropZoneVisible = false;
    },
    showEffect(e) {
      e.dataTransfer.dropEffect = "copy";
    }
  }
};
</script>

<style scoped>
.drop-zone {
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0.6;
  visibility: hidden;
}
</style>
