import filters from "../templates/filters.handlebars";
import * as noUiSlider from "nouislider";
import * as wNumb from "wnumb";

let context = {
  food: ["Chicken", "Cake", "Cheese", "Salad"],
};

document.querySelector(".filters").innerHTML += filters(context);

// document.getEelemntById("filters").html(Templates["templateFilters"](filters));
// this.addFiltersListener();
// addFiltersListener= () => {
//         const buttons = Array.from(document.querySelectorAll('.view__filters .close'));
//         buttons.forEach(button = >{
//             button.addEventListener('click', (e) => {
//                 toggleFilter(e.target);
//             });
//         });
//     }
//

let priceSlider = document.querySelector(".price__slider");
let priceSet = document.querySelector(".price__set");
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
priceSet.addEventListener("click", function () {
  priceDisplay.innerHTML = priceSlider.noUiSlider.get();
});
