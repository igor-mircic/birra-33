const axios = require("axios").default;

export const getBeerList = async () => {
  const url = "https://api.punkapi.com/v2/beers?page=1&per_page=9";

  return axios.get(url).then((response) => response.data);
};
