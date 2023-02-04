const buttonArr = document.querySelectorAll('.reviews__user-button');
const buttonWrapArr = document.querySelectorAll('.reviews__user-item');
const reviewArr = document.querySelectorAll('.reviews__item');


const clickButtonFn = (btnIndex) => { // 1
    buttonWrapArr.forEach((element, index) => {
        if (index === btnIndex) {
            element.classList.add('reviews__user-item--active');
            reviewArr[index].classList.add('reviews__item--active');
        } else {
            element.classList.remove('reviews__user-item--active');
            reviewArr[index].classList.remove('reviews__item--active');
        }
    })
}

buttonArr.forEach((element, index) => { // click on buttonArr[1]
    element.addEventListener("click", () => {
        clickButtonFn(index);
    })
})