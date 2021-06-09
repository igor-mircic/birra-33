const axios = require("axios").default;

export const getBeerList = async (page = 1, per_page = 9, filters) => {
  let url = "https://api.punkapi.com/v2/beers?";

  url += "page=" + page;
  url += "&per_page=" + per_page;

  if (filters) {
    if (filters.name.value !== "") url += "&beer_name=" + filters.name.value;
    url += "&abv_gt=" + filters.price.value[0];
    url += "&abv_lt=" + filters.price.value[1];
    url += "&brewed_after=" + filters.date.value.after;
    url += "&brewed_before=" + filters.date.value.before;
    if (filters.food.value !== "any") url += "&food=" + filters.food.value;
  }

  // console.log(url);

  return axios.get(url).then((response) => response.data);
};
