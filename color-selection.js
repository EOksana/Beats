const item = document.querySelectorAll('.color-selection__item');

for (let index = 0; index < item.length; index++) {
    const element = item[index]
    element.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.classList.contains('color-selection__description')) return

        const currentLine = e.target.closest('.color-selection__item');

        for (let i = 0; i < item.length; i++) {
            if (item[i] !== currentLine)
                item[i].classList.remove('color-selection__item_active')
        }

        if (currentLine.classList.contains('color-selection__item_active')) {
            currentLine.classList.remove('color-selection__item_active')
        } else {
            currentLine.classList.add('color-selection__item_active')
        }

    })
}
// item.addEventListener("click", () => {
//     item.classList.toggle("color-selection__item--active");
// })


