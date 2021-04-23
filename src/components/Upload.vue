<template>
  <div>
    <div
      @drop.prevent="addFile"
      @dragleave="hideDropZone"
      @dragenter.prevent="showEffect"
      @dragover.prevent="showEffect"
      class="drop-zone"
      :style="style"
    ></div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <Input v-model="deployment.name" label="Contract name" required />
          <Input v-model="deployment.address" label="Address" required />
          <Input v-model="deployment.chainId" label="Chain Id" required />
          <Input v-model="deployment.chainName" label="Chain Name" required />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateDeployments">
            Save changes
          </button>
          <button class="button" @click="() => (showModal = false)">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
const isContract = json => json && json.abi && json.address;
const isDeployments = json => {
  if (!json) return false;
  const chainIds = Object.keys(json);
  for (let i = 0; i < chainIds.length; i++) {
    const chainId = chainIds[i];
    const chain = json[chainId];
    if (!chain) return false;
    const networkNames = Object.keys(chain);
    for (let j = 0; j < networkNames.length; j++) {
      const networkName = networkNames[j];
      const network = chain[networkName];
      if (!network || !network.name || !network.chainId || !network.contracts) {
        return false;
      }
      const contractNames = Object.keys(network.contracts);
      for (let k = 0; k < contractNames.length; k++) {
        const contractName = contractNames[k];
        const contract = network.contracts[contractName];
        if (!contract || !isContract(contract)) return false;
      }
    }
  }
  return true;
};
export default {
  components: {
    Input: () => import("./Input")
  },
  data: () => ({
    dragenter: null,
    dropZoneVisible: false,
    showModal: false,
    deployment: {
      name: null,
      address: null,
      abi: null,
      chainId: null,
      chainName: null
    }
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
              if (isContract(json)) {
                this.deployment = {
                  name: f.name,
                  address: json.address,
                  abi: json.abi,
                  chainId: "1",
                  chainName: "mainnet"
                };
                this.showModal = true;
                return;
              } else if (isDeployments(json)) {
                this.$store.dispatch("updateDeployments", json);
              }
            } catch {
              window.alert("Couldn't parse the file");
            }
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
    },
    updateDeployments() {
      this.$store.dispatch("updateDeployments", {
        [this.deployment.chainId]: {
          [this.deployment.chainName]: {
            name: this.deployment.chainName,
            chainId: this.deployment.chainId,
            contracts: {
              [this.deployment.name]: {
                address: this.deployment.address,
                abi: this.deployment.abi
              }
            }
          }
        }
      });
      this.showModal = false;
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
