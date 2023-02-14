$(document).ready(function () {
    $('.owl-carousel').owlCarousel();
});

const owl = $(".owl-carousel");
owl.owlCarousel({
    items: 1,
    loop: true
});

$(".slider__arrow--right").click((event) => {
    event.preventDefault();
    owl.trigger("next.owl.carousel");
})

$(".slider__arrow--left").click((event) => {
    event.preventDefault();
    owl.trigger("prev.owl.carousel");
})