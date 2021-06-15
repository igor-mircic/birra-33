import itemTemplate from "../templates/cart-item.handlebars";

const store = window.localStorage;
let items = [];
let total = 0;

const render = (item) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = itemTemplate(item);
  cartItem.addEventListener("click", (e) => {
    const t = e.target;
    const index = items.indexOf(item);

    if (t.className === "item__quantity") {
      // Update item__price element
      item.quantity = parseInt(t.value);
      let price = e.path[1].childNodes[3].innerHTML.split("x")[1];
      e.path[1].childNodes[3].innerHTML = `${item.quantity} x ` + price;
      // Update total price
      item.totalPrice = item.quantity * item.abv * 10;
      items[index] = item;
      store.setItem("cart", JSON.stringify(items));
      updateTotal();
    } else if (t.className === "item__remove") {
      items.splice(index, 1);
      t.parentNode.remove();
      store.setItem("cart", JSON.stringify(items));
      updateTotal();
    }
  });
  $(".cart__list").append(cartItem);
};

const updateTotal = () => {
  const totalPriceElement = document.querySelector(".total__price");
  total = 0;
  items.forEach((item) => {
    total += item.totalPrice;
  });
  store.setItem("total", total);
  totalPriceElement.innerHTML = Math.floor(total);
};

export const add = (item) => {
  const i = items.indexOf(item);
  if (i > -1) {
    console.log(" in if");
    items[i].quantity += 1;
    items[i].totalPrice = items[i].quantity * items[i].abv * 10;
  } else {
    console.log(" in else");
    item.quantity = 1;
    item.totalPrice = item.quantity * item.abv * 10;
    items.push(item);
    render(item);
  }
  store.setItem("cart", JSON.stringify(items));
  updateTotal();
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
  updateTotal();
};
