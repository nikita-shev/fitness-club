'use strict';

const headerSlider = () => {
    const slider = () => {
        const slide = document.querySelectorAll('.main-slider .slide');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].style.display = strClass;
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].style.display = strClass;
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'none');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'flex');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };


        startSlide(5000);
    };

    slider();
};

export default headerSlider;
