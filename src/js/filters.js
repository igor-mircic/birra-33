import filters from "../templates/filters.handlebars";

let context = {
  categories: [
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
