import itemTemplate from "../templates/cart-item.handlebars";

const store = window.localStorage;
let items = [];
let total = 0;

const renderCart = (item) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = itemTemplate(item);
  cartItem.addEventListener("click", (e) => {
    const target = e.target;
    const index = items.indexOf(item);

    if (target.className === "item__quantity") {
      item.quantity = parseInt(target.value);
      item.totalPrice = item.quantity * item.abv * 10;
      items[index] = item;
      store.setItem("cart", JSON.stringify(items));
      updateTotal();
    } else if (target.className === "item__remove") {
      items.splice(index, 1);
      target.parentNode.remove();
      store.setItem("cart", JSON.stringify(items));
      updateTotal();
    }
  });
  $(".cart__list").append(cartItem);
};

const updateCart = () => {
  $(".cart__list").empty();
  if (items) {
    items.forEach((item) => {
      renderCart(item);
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

export const addItemToCart = (item) => {
  const itemToUpdate = items.find((el) => el.id === item.id);
  if (itemToUpdate) {
    itemToUpdate.quantity += 1;
    itemToUpdate.totalPrice = itemToUpdate.quantity * itemToUpdate.abv * 10;
    updateCart();
  } else {
    item.quantity = 1;
    item.totalPrice = item.quantity * item.abv * 10;
    items.push(item);
    renderCart(item);
  }
  store.setItem("cart", JSON.stringify(items));
  updateTotal();
};

export const restoreCart = () => {
  items = JSON.parse(store.getItem("cart"));

  updateCart();
  updateTotal();
};
