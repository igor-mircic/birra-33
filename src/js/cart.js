import itemTemplate from "../templates/cart-item.handlebars";

let items = [];
const store = window.localStorage;

const render = (item) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = itemTemplate(item);
  $(".cart__list").append(cartItem);
};

export const add = (item) => {
  items.push(item);
  console.log(items);
  store.setItem("cart", JSON.stringify(items));

  render(item);
};

export const restore = () => {
  items = JSON.parse(store.getItem("cart"));
  console.log(items);
  if (items) {
    items.forEach((item) => {
      render(item);
    });
  }
};
