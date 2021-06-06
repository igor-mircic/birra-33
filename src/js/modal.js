import modalTemplate from "../templates/modal.handlebars";
const { default: MicroModal } = require("micromodal");

const displayModal = () => {
  document.querySelector(".modal__container").innerHTML += modalTemplate();
};

document.querySelector("#toggle-modal").addEventListener("click", () => {
  MicroModal.show("modal-1");
});
