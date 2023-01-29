const burger = document.querySelector(".hamburger");
const popup = document.querySelector(".popup");

burger.addEventListener("click", () => {
    burger.classList.toggle("hamburger--active");
    popup.classList.toggle("popup--active");
})