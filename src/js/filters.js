import * as noUiSlider from "nouislider";
import { render } from "./shop";

const getName = () => {
  const nameInput = document.querySelector(".name__input");
  return nameInput.value;
};

const priceSlider = document.querySelector(".price__slider");
const priceDisplay = document.querySelector(".price__display");

noUiSlider.create(priceSlider, {
  start: [0, 100],
  connect: true,
  range: {
    min: 0,
    max: 100,
  },
});

priceSlider.noUiSlider.on("update.on", () => {
  priceDisplay.innerHTML = priceSlider.noUiSlider.get();
});

const getDate = () => {
  const dateAfter = document.querySelector("#date__after");
  const dateBefore = document.querySelector("#date__before");

  const formatDate = (date) => {
    let splitDate = date.value.split("-");
    let formatedDate = splitDate[1] + "-" + splitDate[0];
    return formatedDate;
  };

  const date = [formatDate(dateAfter), formatDate(dateBefore)];

  return date;
};

const getFood = () => {
  const foodArray = Array.from(document.querySelectorAll(".food__item"));
  return foodArray.find((item) => item.checked).value;
};

const getFilterValues = () => {
  return {
    name: getName(),
    price: priceSlider.noUiSlider.get(),
    date: getDate(),
    food: getFood(),
  };
};

const filtersSet = document.querySelector(".filters__set");

filtersSet.addEventListener("click", () => {
  render(getFilterValues());
});
