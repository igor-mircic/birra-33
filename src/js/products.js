import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { getBeerList } from "./services";

getBeerList(1, 9, "", 10, 50, "10-2008", "10-2019", "Cake").then((data) => {
  const productsWraper = document.querySelector(".products__wraper");

  data.forEach((product) => {
    product.price = "$" + product.abv * 10 + ".99";

    const productElement = document.createElement("li");
    productElement.classList.add("product");

    productElement.addEventListener("click", (e) => {
      if (e.target.className === "product__hover") {
        renderModal(product);
      }
    });

    productElement.innerHTML = productTemplate(product);
    productsWraper.appendChild(productElement);
    console.log(product);
  });
});
