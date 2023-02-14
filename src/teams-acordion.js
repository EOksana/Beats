const accordionHeadArr = document.querySelectorAll(".accordion__head");
const accordionsArr = document.querySelectorAll(".accordion");

const headClickFn = (headIndex) => {
    accordionsArr.forEach((accordionEl, accordionIndex) => {
        if (headIndex === accordionIndex) {
            accordionEl.classList.toggle("accordion--active");
        } else {
            accordionEl.classList.remove("accordion--active");
        }
    })
}

accordionHeadArr.forEach((headElement, headIndex) => {
    headElement.addEventListener("click", () => {
        headClickFn(headIndex);
    })
})