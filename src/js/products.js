import products from "../templates/products.handlebars";
import { getBeerList } from "./services";

const displayBeer = (beerList) => {
  document.querySelector(".products").innerHTML += products(beerList);
};

getBeerList().then((data) => {
  let beerList = [];
  for (let i = 0; i < data.length; i++) {
    beerList[i] = {
      name: data[i].name,
      description: data[i].description,
      img: data[i].image_url,
      price: "$" + data[i].abv * 10 + ".99",
    };
  }
  console.log(data[0]);
  console.log(data[0].description);
  displayBeer(beerList);
});
