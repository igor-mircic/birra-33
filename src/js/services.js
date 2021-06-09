const axios = require("axios").default;

export const getBeerList = async (
  page = 1,
  per_page = 9,
  name,
  price_gt,
  price_lt,
  brewed_after,
  brewed_before,
  food
) => {
  let url = "https://api.punkapi.com/v2/beers?";

  url += "page=" + page;
  url += "&per_page=" + per_page;
  if (name && name != "") url += "&beer_name=" + name;
  if (price_gt) url += "&abv_gt=" + price_gt / 10;
  if (price_lt) url += "&abv_lt=" + price_lt / 10;
  if (brewed_after) url += "&brewed_after=" + brewed_after;
  if (brewed_before) url += "&brewed_before=" + brewed_before;
  if (food) url += "&food=" + food;

  console.log(url);

  return axios.get(url).then((response) => response.data);
};
