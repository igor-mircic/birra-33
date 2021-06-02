import products from "../templates/products.handlebars";
import tmpImg from "../images/beer.png";

let dummyBeerList = [];
for (let i = 0; i < 9; i++) {
  dummyBeerList[i] = {
    img: tmpImg,
    price: "$195",
  };
}

document.querySelector(".products").innerHTML += products(dummyBeerList);
