import productTemplate from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { filters } from "./filters";

filters.init();
// update();

$(".filters__set").on("click", () => {
  // update();
});

$(".filters__reset").on("click", () => {
  filters.reset();
  // update();
});

$(".products__pagination").pagination({
  alias: {
    pageSize: "per_page",
    pageNumber: "page",
  },
  dataSource: "https://api.punkapi.com/v2/beers?",
  locator: "data",
  totalNumber: 330,
  pageSize: 9,
  showPageNumbers: true,
  showPrevious: true,
  showNext: true,
  showNavigator: true,
  showFirstOnEllipsisShow: true,
  showLastOnEllipsisShow: true,
  ajax: {
    beforeSend: function () {
      $(".products__wraper").html("Loading data ...");
    },
  },
  callback: function (data) {
    const productsWraper = document.querySelector(".products__wraper");

    while (productsWraper.firstChild) {
      productsWraper.removeChild(productsWraper.firstChild);
    }

    data.forEach((item) => {
      item.price = "$" + item.abv * 10;

      const productElement = document.createElement("li");
      productElement.classList.add("product");

      productElement.addEventListener("click", (e) => {
        if (e.target.className === "product__hover") {
          renderModal(item);
        }
      });

      productElement.innerHTML = productTemplate(item);
      productsWraper.appendChild(productElement);
    });
    // console.log(data);
  },
});
