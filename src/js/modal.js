import modalTemplate from "../templates/modal.handlebars";
const { default: MicroModal } = require("micromodal");

export const renderModal = (data) => {
  document.querySelector(".modal__container").innerHTML = modalTemplate(data);
  MicroModal.show("modal-1");
};
