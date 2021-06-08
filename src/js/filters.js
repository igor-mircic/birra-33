import foodTemplate from "../templates/food.handlebars";
import * as noUiSlider from "nouislider";
import * as wNumb from "wnumb";

let foodList = ["Chicken", "Cake", "Cheese", "Salad"];

const foodListElement = document.querySelector(".food__list");
foodList.forEach((item) => {
  foodListElement.innerHTML += foodTemplate(item);
});

let priceSlider = document.querySelector(".price__slider");
let priceDisplay = document.querySelector(".price__display");

noUiSlider.create(priceSlider, {
  start: [0, 100],
  connect: true,
  range: {
    min: 0,
    max: 100,
  },
  format: wNumb({
    decimals: 2,
    thousand: ".",
    prefix: " $",
    suffix: " ",
  }),
});

priceSlider.noUiSlider.on("update.on", () => {
  priceDisplay.innerHTML = priceSlider.noUiSlider.get();
});

// Read the slider value.
// console.log(priceSlider.noUiSlider.get());
