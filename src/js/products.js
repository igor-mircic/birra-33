import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { getBeerList } from "./services";

const productsWraper = document.querySelector(".products__wraper");
getBeerList().then((data) => {
  let beerList = [];
  let beer = {};
  for (let i = 0; i < data.length; i++) {
    beer = {
      id: data[i].id,
      name: data[i].name,
      description: data[i].description,
      img: data[i].image_url,
      price: "$" + data[i].abv * 10 + ".99",
      ingredients: data[i].ingredients,
      food_pairing: data[i].food_pairing,
    };
    beerList[i] = beer;

    const product = document.createElement("li");
    product.classList.add("product");
    product.addEventListener("click", (e) => {
      if (e.target.className === "product__hover") {
        renderModal(beer);
      }
    });
    product.innerHTML = productTemplate(beer);
    productsWraper.appendChild(product);
  }
});
