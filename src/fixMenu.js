const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");


const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
    return sectionEq * -100;
};

const changeMenuThemeForSetion = (sectionEq) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu__item--shadowed";

    if (menuTheme === "white") {
        menuItems.addClass(activeClass);
    } else {
        menuItems.removeClass(activeClass);
    }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {
    if (inScroll) return;

    const tracsitionOver = 1000;
    const mouseInertiaOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    display.css({
        transform: `translateY(${position}vh)`
    });

    resetActiveClassForItem(sections, sectionEq, "active")

    setTimeout(() => {
        inScroll = false;
        resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active")
    }, tracsitionOver + mouseInertiaOver);

    setTimeout(() => {
        changeMenuThemeForSetion(sectionEq);
    }, (tracsitionOver + mouseInertiaOver) / 3)
};

const scrollViewport = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "next" && nextSection.length) {
        performTransition(nextSection.index())
    }

    if (direction === "prev" && prevSection.length) {
        performTransition(prevSection.index())
    }
}


$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewport("next");
    }

    if (deltaY < 0) {
        scrollViewport("prev");
    }
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName !== "input" && tagName !== "textarea") {
        switch (e.keyCode) {
            case 38://prev
                scrollViewport("prev");
                break;

            case 40://next
                scrollViewport("next");
                break;

        }
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

const closePopup = () => {
    const burger = $(".hamburger");
    const popup = $(".popup");
    const burgerIsActive = burger.hasClass("hamburger--active");
    const popupIsActive = popup.hasClass("popup--active");

    if (burgerIsActive && popupIsActive) {
        burger.removeClass("hamburger--active");
        popup.removeClass("popup--active");
    }
}

$("[data-scroll-to]").click(e => {

    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    closePopup();

    performTransition(reqSection.index());
});



if (isMobile) {
    $("body").swipe({
        swipe: function (event, direction) {
            let scrollDirection = "";

            if (direction === "up") scrollDirection = "next";
            if (direction === "down") scrollDirection = "prev";

            scrollViewport(scrollDirection);
        },
    });
}
