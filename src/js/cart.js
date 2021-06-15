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

const update = () => {
  $(".cart__list").empty();
  if (items) {
    items.forEach((item) => {
      render(item);
    });
  } else {
    items = [];
  }
};

const updateTotal = () => {
  const totalPriceElement = document.querySelector(".total__price");
  const cartEmpty = document.querySelector(".cart__empty");
  total = 0;
  items.forEach((item) => {
    total += item.totalPrice;
  });
  if (total > 0) {
    totalPriceElement.innerHTML = " $" + Math.floor(total);
    cartEmpty.innerHTML = "";
  } else {
    totalPriceElement.innerHTML = " $0";
    cartEmpty.innerHTML = "No products in the cart.";
  }
};

export const add = (item) => {
  const itemToUpdate = items.find((el) => el.id === item.id);
  if (itemToUpdate) {
    itemToUpdate.quantity += 1;
    itemToUpdate.totalPrice = itemToUpdate.quantity * itemToUpdate.abv * 10;
    update();
  } else {
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

  update();
  updateTotal();
};
