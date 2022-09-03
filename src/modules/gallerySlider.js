'use strict';

const gallerySlider = () => {
    const dotAdd = () => {
        const slide = document.querySelectorAll('.gallery-slider .slide'),
            dots = document.querySelector('.slider-dots');
        slide.forEach(() => {
            let dotElem = document.createElement('button');
            dots.appendChild(dotElem);
            dotElem.classList.add('dot');
        });

        let newDots = document.querySelectorAll('.dot');
        newDots[0].classList.add('dot-active');
    };

    dotAdd();

    const gallerySlider = () => {
        const slide = document.querySelectorAll('.gallery-slider .slide'),
            dot = document.querySelectorAll('.gallery-slider .dot'),
            slider = document.querySelector('.gallery-slider');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'slide-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'slide-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 5000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;

            if (!target.matches('.arrow-slider, .dot')) {return;}

            prevSlide(slide, currentSlide, 'slide-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('.arrow-right')) {
                currentSlide++;
            } else if (target.matches('.arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                })
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'slide-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
            let target = e.target;
            if (target.matches('.arrow-slider') || target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (e) => {
            let target = e.target;
            if ((target.matches('.arrow-slider') || target.matches('.dot')) && window.screen.width > 992) {
                startSlide();
            }
        });

        if (window.screen.width > 992) { startSlide(5000); }
    };

    gallerySlider();
};

export default gallerySlider;
