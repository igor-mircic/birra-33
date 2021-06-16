import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { filters } from "./filters";
import { addItemToCart, restoreCart } from "./cart";

const buildUrl = () => {
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
  return url;
};

const addProductsLoader = () => {
  $(".products__wraper").empty();
  const loader = document.createElement("div");
  loader.classList.add("loader");
  $(".products").prepend(loader);
};

const removeProductsLoader = () => {
  $(".loader").remove();
};

const renderProducts = (products) => {
  products.forEach((product) => {
    product.price = "$" + product.abv * 10;

    const productElement = document.createElement("li");
    productElement.classList.add("product");

    productElement.addEventListener("click", (e) => {
      const target = e.target.className;
      if (target === "product__hover") renderModal(product);
      if (target === "product__add") addItemToCart(product);
    });

    productElement.innerHTML = productTemplate(product);
    $(".products__wraper").append(productElement);
  });
};

const updateProductsList = () => {
  let url = buildUrl();
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
        addProductsLoader();
      },
    },
    callback: function (data) {
      removeProductsLoader();
      renderProducts(data);
    },
  });
};

// init
filters.init();
restoreCart();
updateProductsList();

$(".filters__set").on("click", () => {
  updateProductsList();
});

$(".filters__reset").on("click", () => {
  filters.reset();
  updateProductsList();
});
