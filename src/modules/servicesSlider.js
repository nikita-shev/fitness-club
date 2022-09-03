'use strict';

const servicesSlider = () => {
    const servicesSlider = () => {
        const slide = document.querySelectorAll('.services-slider .slide'),
            slider = document.querySelector('.services-slider'),
            arrowRight = slider.querySelector('.arrow-right');

        let currentSlide = 0,
            arrSlideDeActive = [];

        const slideDeActive = () => {
            arrSlideDeActive = [];

            let slide = document.querySelectorAll('.services-slider .slide');
            slide.forEach((item) => {
                if (item.className === 'slide services-slider-de-active') {
                    arrSlideDeActive.push(item);
                }
            });
        };


        const prevSlide = (elem, index) => {
            elem[index].classList.add('services-slider-de-active');
            slider.insertBefore(elem[index], arrowRight);

            slideDeActive();
            arrSlideDeActive[0].classList.remove('services-slider-de-active');
        };

        const nextSlide = (elem, index) => {
            arrSlideDeActive = [];
            let slide = document.querySelectorAll('.services-slider .slide');
            slide.forEach((item) => {
                if (item.className !== 'slide services-slider-de-active') {
                    arrSlideDeActive.push(item);
                }
            });
            arrSlideDeActive[arrSlideDeActive.length-1].classList.add('services-slider-de-active');

            slideDeActive();
            arrSlideDeActive[arrSlideDeActive.length-1].classList.remove('services-slider-de-active');
            slider.insertBefore(arrSlideDeActive[arrSlideDeActive.length-1], elem[index]);
        };

        const arrowSlide = document.querySelectorAll('.services-slider .arrow-slider');
        arrowSlide.forEach((arrow) => {
            arrow.addEventListener('click', (e) => {
                e.preventDefault();
                let target = e.target;

                let courseArrowClass = target.className.split(' ')[1];
                if (courseArrowClass === 'arrow-right') {
                    prevSlide(slide, currentSlide);
                } else if (courseArrowClass === 'arrow-left') {
                    nextSlide(slide, currentSlide);
                }

                if (target.matches('.arrow-right')) {
                    currentSlide++;
                } else if (target.matches('.arrow-left')) {
                    currentSlide--;
                }

                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }

                if (currentSlide < 0) {
                    currentSlide = slide.length - 1;
                }
            });

        });
    };

    servicesSlider();
};

export default servicesSlider;
