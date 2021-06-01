import filters from "../templates/filters.handlebars";

let context = {
  food: ["Chicken", "Cake", "Cheese", "Salad"],
};

document.querySelector(".filters").innerHTML += filters(context);
