import modalTemplate from "../templates/modal.handlebars";
import * as cart from "./cart";
const { default: MicroModal } = require("micromodal");

export const renderModal = (item) => {
  const modalContainer = document.querySelector(".modal__container");
  modalContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "modal__btn modal__btn-primary") {
      cart.add(item);
      MicroModal.close("modal-1");
    }
  });
  modalContainer.innerHTML = modalTemplate(item);
  MicroModal.show("modal-1");
};
