import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { filters } from "./filters";
import * as cart from "./cart";

const update = () => {
  let url = "https://api.punkapi.com/v2/beers?";
  if (filters) {
    url +=
      "&abv_gt=" +
      filters.price.value[0] +
      "&abv_lt=" +
      filters.price.value[1] +
      "&brewed_after=" +
      filters.date.value.after +
      "&brewed_before=" +
      filters.date.value.before;
    if (filters.name.value !== "") url += "&beer_name=" + filters.name.value;
    if (filters.food.value !== "any") url += "&food=" + filters.food.value;
  }
  $(".products__pagination").pagination({
    alias: {
      pageSize: "per_page",
      pageNumber: "page",
    },
    dataSource: url,
    locator: "data",
    totalNumber: 90,
    pageSize: 9,
    showPrevious: true,
    showNext: true,
    ajax: {
      beforeSend: function () {
        $(".products__wraper").empty();
        const loader = document.createElement("div");
        loader.classList.add("loader");
        $(".products").prepend(loader);
      },
    },
    callback: function (data) {
      $(".loader").remove();

      data.forEach((item) => {
        item.price = "$" + item.abv * 10;

        const productElement = document.createElement("li");
        productElement.classList.add("product");

        productElement.addEventListener("click", (e) => {
          const target = e.target.className;
          if (target === "product__hover") renderModal(item);
          if (target === "product__add") cart.add(item);
        });

        productElement.innerHTML = productTemplate(item);
        $(".products__wraper").append(productElement);
      });
    },
  });
};

// init
filters.init();
cart.restore();
update();

$(".filters__set").on("click", () => {
  update();
});

$(".filters__reset").on("click", () => {
  filters.reset();
  update();
});
