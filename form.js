const form = document.querySelector(".form");
const popupSubmit = document.querySelector(".popup--modal");
const buttonModal = document.querySelector(".modal__button");
const modalTitle = document.querySelector(".modal__title");
const inputName = document.querySelector("#input-name");
const inputPhone = document.querySelector("#input-phone");
const inputComment = document.querySelector("#input-comment");
// const inputStreet = document.querySelector("#input-street");
// const inputHouse = document.querySelector("#input-house");
// const inputBuilding = document.querySelector("#input-building");
// const inputFlat = document.querySelector("#input-flat");
// const inputFloor = document.querySelector("#input-floor");
// const inputChange = document.querySelector("#input-change");
// const inputCard = document.querySelector("#input-card");
// const inputCall = document.querySelector("#input-call");

const API_URL = "https://webdev-api.loftschool.com/sendmail";
const TEST_EMAIL = "test@yandex.ru";

const sendForm = async () => {

    const requestBody = {
        name: inputName.value,
        phone: inputPhone.value,
        comment: inputComment.value,
        to: TEST_EMAIL
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    return await response.json();
};

const handleValidation = () => {
    let isNameValid = false;
    let isPhoneValid = false;
    let isCommentValid = false;
    let isFormValid = false;

    if (inputName.value.length > 0) {
        isNameValid = true;
        inputName.classList.remove("error")
    } else {
        inputName.classList.add("error")
    }

    if (inputPhone.value.length > 0) {
        isPhoneValid = true;
        inputPhone.classList.remove("error")
    } else {
        inputPhone.classList.add("error")
    }

    if (inputComment.value.length > 0) {
        isCommentValid = true;
        inputComment.classList.remove("error")
    } else {
        inputComment.classList.add("error")
    }

    if (isNameValid === true && isPhoneValid === true && isCommentValid === true) {
        isFormValid = true;
    }

    return isFormValid;
};

const handleOpenModal = (needOpen) => {
    if (needOpen === true) {
        popupSubmit.style.display = "flex";
    } else if (needOpen === false) {
        popupSubmit.style.display = "none";
    }
}

const handleClearValues = () => {
    form.reset();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isFormValid = handleValidation();

    if (isFormValid) {

        try {
            const result = await sendForm();

            if (result.status === 1) {
                modalTitle.innerText = "Cообщение отправлено";
                handleOpenModal(true);
                handleClearValues();
            }
        } catch {
            modalTitle.innerText = "Произошла ошибка";
            handleOpenModal(true);
        }
    }


});

buttonModal.addEventListener("click", () => {
    handleOpenModal(false);
});