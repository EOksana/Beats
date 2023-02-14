ymaps.ready(init);

function init() {

    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 11,
        controls: []
    });
    myMap.behaviors.disable("scrollZoom");

    const coords = [
        [55.701957, 37.725425],
        [55.689004, 37.504262],
        [55.810746, 37.755053],
        [55.823366, 37.626352]
    ]
    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/marcer.png',
        iconImageSize: [58, 73],
        iconImageOffset: [-35, -52]
    });


    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);
}
