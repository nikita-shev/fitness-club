document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const promoCode = document.querySelector('.promocode'),
          fixedGift = document.querySelector('.fixed-gift');

    if (localStorage.code && promoCode) {
        promoCode.value = localStorage.code;
        fixedGift.style.display = 'none'
    }

    const selectBtnClub = document.querySelector('.clubs-list'),
          clubsList = selectBtnClub.querySelector('ul');

    let x = 0, y = 0;

    const displayForm = (form, display = 'block') => {
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = display;
        } else {
            form.style.display = 'none';
        }

        if (form.className.split(' ')[0] === 'popup-menu') {
            window.scrollTo(x, y);
        }
    };

    let popupId = '', form = '';

    document.addEventListener('click', (e) => {
        let target = e.target;

        const successForm = document.getElementById('thanks'),
              giftForm = document.getElementById('gift');
        if (target.matches('#thanks .close_icon') || target.matches('#thanks .overlay') || target.matches('#thanks .close-btn')) {
            displayForm(successForm);
        }

        if (target.matches('.close-btn') && target.closest('#gift')) {
            displayForm(giftForm);
        }

        if (target.matches('.open-popup') || target.matches('#head-callback-btn')) {
            popupId = target.getAttribute('data-popup');
            form = document.querySelector(`${popupId}`);

            displayForm(form);
        }

        if ((target.matches(`${popupId} .overlay`) || target.matches(`${popupId} .close_icon`)) && form) {
            displayForm(form)
        }

        if (target.closest('.clubs-list')) {
            displayForm(clubsList);
        } else if (!target.closest('.clubs-list')) {
            clubsList.style.display = 'none';
        }

        if (target.closest('.fixed-gift')) {
            target.style.display = 'none';

            popupId = target.getAttribute('data-popup');
            form = document.querySelector(`${popupId}`);

            displayForm(form);
        }

        if (target.matches('#gift button')) {localStorage.code = 'ТЕЛО2019';}

        if (target.matches('.menu-button img')) {
            x = window.scrollX;
            y = window.scrollY;
            popupId = target.getAttribute('data-popup');
            form = document.querySelector(`${popupId}`);

            displayForm(form, 'flex')
        }

        if (target.closest(`${popupId} .close-menu-btn_mobile`) || target.closest(`${popupId} .small-menu li`)) {
            displayForm(form)
        }
    });


    const navMenu = document.querySelector('.top-menu'),
          toTop = document.getElementById('totop');

    toTop.style.display = 'none';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 186) {
            navMenu.style.position = 'fixed';
        } else {
            navMenu.style.position = 'static';
        }

        if (window.scrollY >= 646) {
            toTop.style.display = 'block';
        } else {
            toTop.style.display = 'none';
        }
    });


    const menuScroll = document.querySelectorAll('.hidden-small>li a');

    const animateScroll = (elem) => {
        let elemId = elem.getAttribute('href'),
            block = document.querySelector(elemId);

        block.scrollIntoView({block: "start", behavior: "smooth"});
    };

    menuScroll.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            animateScroll(elem);
        });
    });

    toTop.addEventListener('click', (e) => {
        e.preventDefault();
        animateScroll(toTop);
    });


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


    const slideElem = document.querySelectorAll('.services-slider .slide');
    let arrSlideDeActive = [];
    const addClassDeActiveSlide = () => {
        arrSlideDeActive = [];

        slideElem.forEach((item) => {
            if (!item.className.split(' ')[1]) {
                arrSlideDeActive.push(item);
            }
        });

        arrSlideDeActive[arrSlideDeActive.length - 1].classList.add('services-slider-de-active');
    };

    if (screen.width <= 992) { addClassDeActiveSlide(); }
    if (screen.width <= 768) { addClassDeActiveSlide(); }
    if (screen.width <= 576) { addClassDeActiveSlide(); }
    if (screen.width <= 500) { addClassDeActiveSlide(); }


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
            if (target.matches('.arrow-slider') || target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(5000);
    };

    gallerySlider();


    const calc = () => {

        // let obj = {
        //     mozaika: [1999, 9900, 13900, 19900],
        //     schelkovo: [2999, 14990, 21990, 24990]
        // };
        //
        // let json = JSON.stringify(obj);
        // console.log(json);


        const cardsForm = document.getElementById('card_order'),
              cardMozaika = document.getElementById('card_leto_mozaika'),
              cardSchelkovo = document.getElementById('card_leto_schelkovo'),
              promocode = document.querySelector('.promocode'),
              priceTotal = document.getElementById('price-total');

        const month = document.querySelectorAll('input[name=card-type]'),
              clubName = document.querySelectorAll('input[name=club-name]');

        const data = () => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', '/price.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) { return; }

                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText);

                        // let val = '';
                        // data.cars.forEach(item => {
                        //     if (item.brand === select) {
                        //         const {brand, model, price} = item;
                        //         val = `Тачка ${brand} ${model} <br> Цена: ${price}$`;
                        //     }
                        // });


                        resolve(data);
                    } else {
                        const error = 'Произошла ошибка';
                        reject(error);
                    }
                });
                request.send();
            })
        };


        const addTotalPrice = (val) => {
            month.forEach((item, i) => {
                item.addEventListener('click', () => {
                    if (promocode.value === 'ТЕЛО2020') { priceTotal.textContent = Math.floor(val[i] * 0.3); }
                    else priceTotal.textContent = val[i];
                })
            });
        };


        cardsForm.addEventListener('click',() => {
                console.log('click');
                data()
                    .then( (data) => {

                        let val = [];
                        if (cardMozaika.checked) {
                            val = [];
                            data.mozaika.forEach((item) => { val.push(item) });

                            addTotalPrice(val);

                        } else if (cardSchelkovo.checked) {
                            val = [];
                            data.schelkovo.forEach((item) => { val.push(item) });

                            addTotalPrice(val);
                        }

                    })
                    .catch( (error) => console.log(error) )
            }
        );

    };



    const sendForm = (form) => {
        const loadMessage = 'images/icon/hourglass.svg',
              errorMessage = 'images/icon/error.svg';
            // successMessage = 'images/icon/checked.svg';

        const statusMessage = document.createElement('img'),
              statusMessageWrap = document.createElement('div');
        // statusMessage.style.cssText = 'width: 50px; margin-bottom: 10px;';
        statusMessageWrap.classList.add('msg-wrap');

        let timer = 500000;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            form.appendChild(statusMessageWrap);
            const statusMsgWrap = form.querySelector('.msg-wrap');

            statusMsgWrap.appendChild(statusMessage);
            statusMessage.src = loadMessage;

            const formData = new FormData(form);
            let bodySend = {};
            formData.forEach((item, i) => {
               bodySend[i] = item;
            });

            postData(JSON.stringify(bodySend))
                .then( (response) => {
                    if (response.status !== 200) {
                        throw new Error('Status network not 200');
                    }
                    // statusMessage.src = successMessage;
                    const successForm = document.getElementById('thanks');
                    if (form.closest('.popup')) {
                        displayForm(form.closest('.popup'), 'none');
                        displayForm(successForm);
                    } else { displayForm(successForm);}

                    statusMsgWrap.remove();

                    clearForm();
                })
                .catch( (error) => {
                    statusMessage.src = errorMessage;
                    console.log(error);
                    // clearForm();
                });

            setTimeout(() => {
                statusMsgWrap.remove();
            }, timer)
        });

        const postData = (body) => {
            return fetch('./server.php', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : body
            });
        };

        const clearForm = () => {
            const formID = form.id,
                formElem = document.querySelectorAll(`#${formID} input`);

            formElem.forEach((item) => { item.value = ''; });
        };
    };


    const validPhone = (inputVal) => {
        let countPlus = 0,
            arrInputVal = inputVal.split(''),
            newArrInputVal = [];

        arrInputVal.forEach((item, i) => {
            newArrInputVal[i] = item;

            if (item === '+' && countPlus <= 2) { countPlus++;}

            if ((countPlus >= 2 && item === '+') || newArrInputVal.length === 12 || (item === '+' && i >= 1)) {
                delete newArrInputVal[i];
                newArrInputVal.length -= 1;
            }
        });

        return newArrInputVal.join('');
    };

    let create = false;
    const formValid = (e) => {
        const form = e.target.closest('form');

        const formCheck = document.querySelector(`#${form.id} input[type='checkbox']`);
        let elemCheck = document.querySelector('p.msg-wrap');

        if (formCheck && formCheck.checked && elemCheck) {
            elemCheck.remove();
            create = false;
        } else if (formCheck && e.target.type === 'submit' && !formCheck.checked) {
            if (create) { elemCheck.remove(); create = false; }

            const elemWrap = document.createElement('p');
            elemWrap.classList.add('msg-wrap');
            elemWrap.textContent = 'Вы не согласились на обработку персональных данных!';

            if (form.className === 'card-order_club') {
                // form.insertBefore(elemWrap, document.querySelector(`.${form.className} .right`))
                const personalData = document.querySelector(`.${form.className} .personal-data`);
                personalData.appendChild(elemWrap);
            } else if (form.id === 'card_order') {
                form.insertBefore(elemWrap, document.querySelector(`#${form.id} .submit`))
            }  else { form.appendChild(elemWrap); }

            create = true;
        }


        const validForm = () => {
            const formID = form.id,
                formElem = document.querySelectorAll(`#${formID} input`);

            const regNum = /[^0-9\+]/g,
                regPhone = /^[+]?[0-9]{1,11}$/g,
                regStr = /[^А-Яа-яЁё\s]/g;

            const valid = (input) => {
                let val = input.value;

                if (input.focus && input.type === 'tel') {
                    val = val.replace(regNum, '');

                    if (regPhone.test(val)) { input.value = val; }
                    else { input.value = validPhone(val); }

                } else if (input.getAttribute("placeholder") === "Ваше имя..." && regStr.test(val)) {
                    val = val.replace(regStr, '');
                    input.value = val;
                }
            };

            formElem.forEach((item) => { valid(item); })
        };

        form.addEventListener('input', validForm);
    };

    const forms = document.querySelectorAll('form');
    forms.forEach((item) => {
        item.addEventListener('click', formValid);
        sendForm(item);
    });
});
