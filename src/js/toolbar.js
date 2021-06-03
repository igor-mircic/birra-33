listBtn = document.querySelector(".modes__list");
gridBtn = document.querySelector(".modes__grid");
products = document.querySelector(".products");

listBtn.addEventListener("click", () => {
  products.classList.remove("products--grid");
  products.classList.add("products--list");
});

gridBtn.addEventListener("click", () => {
  products.classList.remove("products--list");
  products.classList.add("products--grid");
});
