import * as noUiSlider from "nouislider";

export const filters = {
  name: {
    input: document.querySelector(".name__input"),
    get value() {
      return this.input.value;
    },
    reset() {
      this.input.value = "";
    },
  },
  price: {
    slider: document.querySelector(".price__slider"),
    display: document.querySelector(".price__display"),
    range: {
      min: 5,
      max: 600,
    },
    init() {
      noUiSlider.create(this.slider, {
        start: [this.range.min, this.range.max],
        connect: true,
        range: this.range,
      });
      this.slider.noUiSlider.on("update.on", () => {
        this.display.innerHTML = this.slider.noUiSlider.get();
      });
    },
    get value() {
      return this.slider.noUiSlider.get().map((p) => p / 10);
    },
    reset() {
      this.slider.noUiSlider.set([this.range.min, this.range.max]);
    },
  },
  date: {
    picker: {
      after: document.querySelector("#date__after"),
      before: document.querySelector("#date__before"),
    },
    format(date) {
      let splitDate = date.value.split("-");
      let formatedDate = splitDate[1] + "-" + splitDate[0];
      return formatedDate;
    },
    get value() {
      return {
        after: this.format(this.picker.after),
        before: this.format(this.picker.before),
      };
    },
    reset() {
      this.picker.after.value = "2007-01-01";
      this.picker.before.value = "2021-01-01";
    },
  },
  food: {
    list: Array.from(document.querySelectorAll(".food__item")),
    get value() {
      return this.list.find((item) => item.checked).value;
    },
    reset() {
      this.list[0].checked = true;
    },
  },
  init() {
    this.price.init();
    this.reset();
  },
  reset() {
    this.name.reset();
    this.price.reset();
    this.date.reset();
    this.food.reset();
  },
};
