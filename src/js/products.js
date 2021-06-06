import products from "../templates/products.handlebars";
import { renderModal } from "./modal";
import { getBeerList } from "./services";

const displayBeer = (beerList) => {
  document.querySelector(".products").innerHTML += products(beerList);
};

getBeerList().then((data) => {
  let beerList = [];
  for (let i = 0; i < data.length; i++) {
    beerList[i] = {
      PID: "PID-" + data[i].id,
      name: data[i].name,
      description: data[i].description,
      img: data[i].image_url,
      price: "$" + data[i].abv * 10 + ".99",
    };
  }
  // console.log(data[0]);
  displayBeer(beerList);

  const hoverBtns = document.querySelectorAll(".product__hover");

  hoverBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const PID = btn.parentNode.parentNode.id.split("-")[1];
      let beer = data.find((beer) => beer.id == PID);
      renderModal(beer);
    });
  });
});
