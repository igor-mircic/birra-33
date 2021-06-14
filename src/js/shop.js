import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { filters } from "./filters";
import * as cart from "./cart";

const update = () => {
  let url = "https://api.punkapi.com/v2/beers?";
  if (filters) {
    if (filters.name.value !== "") url += "&beer_name=" + filters.name.value;
    url += "&abv_gt=" + filters.price.value[0];
    url += "&abv_lt=" + filters.price.value[1];
    url += "&brewed_after=" + filters.date.value.after;
    url += "&brewed_before=" + filters.date.value.before;
    if (filters.food.value !== "any") url += "&food=" + filters.food.value;
  }
  // console.log(url);
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
          const t = e.target.className;
          if (t === "product__hover") renderModal(item);
          if (t === "product__add") cart.add(item);
        });

        productElement.innerHTML = productTemplate(item);
        $(".products__wraper").append(productElement);
      });
      // console.log(data);
    },
  });
};

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
