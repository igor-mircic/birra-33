import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { getBeerList } from "./services";

export const render = (filterValues) => {
  // console.log(filterValues);
  getBeerList(
    1,
    9,
    filterValues.name,
    filterValues.price[0],
    filterValues.price[1],
    filterValues.date[0],
    filterValues.date[1],
    filterValues.food
  ).then((data) => {
    console.log(data);
    const productsWraper = document.querySelector(".products__wraper");

    while (productsWraper.firstChild) {
      productsWraper.removeChild(productsWraper.firstChild);
    }

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
      // console.log(product);
    });
  });
};

// render();
