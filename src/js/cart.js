import itemTemplate from "../templates/cart-item.handlebars";

let items = [];
const store = window.localStorage;

const render = (item) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = itemTemplate(item);
  $(".cart__list").append(cartItem);
  console.log(item);
};

export const add = (item) => {
  items.push(item);
  store.setItem("cart", JSON.stringify(items));

  render(item);
};

export const restore = () => {
  const items = JSON.parse(store.getItem("cart"));
  items.forEach((item) => {
    render(item);
  });
};
