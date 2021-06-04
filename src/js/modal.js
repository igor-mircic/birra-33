const { default: MicroModal } = require("micromodal");

document.querySelector("#toggle-modal").addEventListener("click", () => {
  MicroModal.show("modal-1");
});
