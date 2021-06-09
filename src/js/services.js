const axios = require("axios").default;

export const getBeerList = async (page = 1, per_page = 9, filterValues) => {
  let url = "https://api.punkapi.com/v2/beers?";

  url += "page=" + page;
  url += "&per_page=" + per_page;

  if (filterValues) {
    // console.log(filterValues);
    if (filterValues.name !== "") url += "&beer_name=" + filterValues.name;
    url += "&abv_gt=" + filterValues.price[0] / 10;
    url += "&abv_lt=" + filterValues.price[1] / 10;
    url += "&brewed_after=" + filterValues.date[0];
    url += "&brewed_before=" + filterValues.date[1];
    if (filterValues.food !== "any") url += "&food=" + filterValues.food;
  }

  // console.log(url);

  return axios.get(url).then((response) => response.data);
};
