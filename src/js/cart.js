import itemTemplate from "../templates/cart-item.handlebars";

const store = window.localStorage;
let items = [];
let total = 0;

const render = (item) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = itemTemplate(item);
  $(".cart__list").append(cartItem);
};

const updateTotal = (total) => {
  const totalPriceElement = document.querySelector(".total__price");
  totalPriceElement.innerHTML = total;
};

export const add = (item) => {
  items.push(item);
  store.setItem("cart", JSON.stringify(items));

  total += item.abv * 10;
  updateTotal(total);
  store.setItem("total", total);

  render(item);
};

export const restore = () => {
  items = JSON.parse(store.getItem("cart"));
  if (items) {
    items.forEach((item) => {
      render(item);
    });
  } else {
    items = [];
  }

  total = store.getItem("total");
  updateTotal(total);
};
