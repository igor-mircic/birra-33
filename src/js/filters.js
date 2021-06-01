import filters from "../templates/filters.handlebars";

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
