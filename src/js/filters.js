import filters from "../templates/filters.handlebars";

let context = {
  food: [
    "Ale",
    "Blonde",
    "Citer",
    "Dark beer",
    "Light beer",
    "Uncategorized",
    "Weat Beer",
  ],
};

document.querySelector(".filters").innerHTML += filters(context);
