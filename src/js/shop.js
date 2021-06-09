import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { getBeerList } from "./services";
import { filters } from "./filters";

const render = (beerList) => {
  // console.log(data);
  const productsWraper = document.querySelector(".products__wraper");

  while (productsWraper.firstChild) {
    productsWraper.removeChild(productsWraper.firstChild);
  }

  beerList.forEach((beer) => {
    beer.price = "$" + beer.abv * 10;

    const productElement = document.createElement("li");
    productElement.classList.add("product");

    productElement.addEventListener("click", (e) => {
      if (e.target.className === "product__hover") {
        renderModal(beer);
      }
    });

    productElement.innerHTML = productTemplate(beer);
    productsWraper.appendChild(productElement);
    // console.log(product);
  });
};

const update = () => {
  getBeerList(1, 9, filters).then((list) => render(list));
};

filters.init();
update();

const filtersSet = document.querySelector(".filters__set");

filtersSet.addEventListener("click", () => {
  update();
});

const filtersReset = document.querySelector(".filters__reset");

filtersReset.addEventListener("click", () => {
  filters.reset();
  update();
});
