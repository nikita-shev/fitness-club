/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/modules/popup.js


const popup = () => {
    //localstorage load
    const promoCode = document.querySelector('.promocode'),
        fixedGift = document.querySelector('.fixed-gift');

    if (localStorage.code && promoCode) {
        promoCode.value = localStorage.code;
        fixedGift.style.display = 'none'
    }

    //выбор клуба (var)
    const selectBtnClub = document.querySelector('.clubs-list'),
        clubsList = selectBtnClub.querySelector('ul');

    //записаться на бесплатный визит / кнопка "перезвоните мне" / кнопка "выбор клуба"
    let x = 0, y = 0;

    const displayForm = (form, display = 'block', popupType) => {
        const html = document.querySelector('html'),
              topMenu = document.querySelector('.top-menu'),
              paddingScroll = window.innerWidth - document.querySelector('body').offsetWidth;

        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = display;

            if (!popupType) {
                html.style.overflowY = 'hidden';
                html.style.paddingRight = `${paddingScroll}px`;
                if (window.scrollY >= 126) { topMenu.style.width = `calc(100% - ${paddingScroll}px)`; }
                form.childNodes[1].style.overflowY = 'scroll';

                if (fixedGift) { fixedGift.style.right = `${paddingScroll+20}px`; }
            }

        } else {
            form.style.display = 'none';

            if (!popupType) {
                html.removeAttribute('style');
                topMenu.style.width = `100%`;
                form.childNodes[1].removeAttribute('style');

                if (fixedGift) { fixedGift.style.right = `20px`; }
            }
        }

        if (form.className.split(' ')[0] === 'popup-menu') {
            window.scrollTo(x, y);
        }
    };

    let popupId = '',
        form = '';

    document.addEventListener('click', (e) => {
        let target = e.target;

        //popup: Ваша заявка отправлена
        const successForm = document.getElementById('thanks'),
            giftForm = document.getElementById('gift');
        if (target.matches('#thanks .close_icon') || target.matches('#thanks .overlay') || target.matches('#thanks .close-btn')) {
            displayForm(successForm);
        }

        //display gift click OK
        if (target.matches('.close-btn') && target.closest('#gift')) {
            displayForm(giftForm);
        }

        //Записаться на бусп. везит и Кнопка "Перезвоните мне"
        if (target.matches('.open-popup') || target.matches('#head-callback-btn')) {
            popupId = target.getAttribute('data-popup');
            form = document.querySelector(`${popupId}`);

            displayForm(form);
        }

        if ((target.matches(`${popupId} .overlay`) || target.matches(`${popupId} .close_icon`)) && form) {
            displayForm(form)
        }

        //выбор клуба
        if (target.closest('.clubs-list') && !target.matches('.clubs-list ul') && !target.matches('.clubs-list ul>li')) {
            displayForm(clubsList, 'block', 'club');
        } else if (!target.closest('.clubs-list')) {
            clubsList.style.display = 'none';
        }

        //подарок
        if (target.closest('.fixed-gift')) {
            // target.style.display = 'none';

            popupId = target.getAttribute('data-popup');
            form = document.querySelector(`${popupId}`);

            displayForm(form);
        }

        if (target.matches('#gift button')) {
            localStorage.code = 'ТЕЛО2020';
            fixedGift.style.display = 'none';
        }

        //меню-бургер
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
};

/* harmony default export */ var modules_popup = (popup);
// CONCATENATED MODULE: ./src/modules/animate.js


const animate = () => {
    //бургер меню (фиксация) и btn up
    const navMenu = document.querySelector('.top-menu'),
        toTop = document.getElementById('totop');

    toTop.style.display = 'none';

    window.addEventListener('scroll', () => {
        //бургер меню (фиксация)
        const blockFix = document.querySelector('.block-fix');

        // arr = [126:, 186:991px, 236:580px, 296:390px, 318:320px]

        let scrollY = window.scrollY,
            windowWidth = window.screen.width;

        const menuFix = (positionBlock, displayBlock)=> {
            navMenu.style.position = `${positionBlock}`;
            blockFix.style.display = `${displayBlock}`;
        };

        if (windowWidth <= 320 && scrollY > 318) { menuFix('fixed', 'block') }
        else if (windowWidth <= 390 && windowWidth >= 321 && scrollY > 296) { menuFix('fixed', 'block') }
        else if (windowWidth <= 580 && windowWidth >= 391 && scrollY > 236) { menuFix('fixed', 'block') }
        else if (windowWidth <= 991 && windowWidth >= 581 && scrollY > 186) { menuFix('fixed', 'block') }
        else if (windowWidth > 991 && scrollY > 126) { menuFix('fixed', 'block') }
        else { menuFix('static', 'none') }

        //btn up
        if (window.scrollY >= 646) {
            toTop.style.display = 'block';
        } else {
            toTop.style.display = 'none';
        }
    });


    //анимация прокрутки к блоку
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
};

/* harmony default export */ var modules_animate = (animate);
// CONCATENATED MODULE: ./src/modules/headerSlider.js


const headerSlider = () => {
    //auto slider index.html (п7)
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

/* harmony default export */ var modules_headerSlider = (headerSlider);
// CONCATENATED MODULE: ./src/modules/servicesSlider.js


const servicesSlider = () => {

    //slider (п9)
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

/* harmony default export */ var modules_servicesSlider = (servicesSlider);
// CONCATENATED MODULE: ./src/modules/gallerySlider.js


const gallerySlider = () => {
    //slider (п10)
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

/* harmony default export */ var modules_gallerySlider = (gallerySlider);
// CONCATENATED MODULE: ./src/modules/calc.js


const calc = () => {
    //калькулятор
    const calc = () => {
        const cardsForm = document.getElementById('card_order'),
            cardMozaika = document.getElementById('card_leto_mozaika'),
            cardSchelkovo = document.getElementById('card_leto_schelkovo'),
            promoCode = document.querySelector('.promocode'),
            priceTotal = document.getElementById('price-total'),
            month = document.querySelectorAll('input[name=card-type]');

        const data = () => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', './price.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) { return; }

                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        resolve(data);
                    } else {
                        const error = 'Произошла ошибка';
                        reject(error);
                    }
                });
                request.send();
            })
        };


        const addTotalPrice = () => {
            if (promoCode) {
                if (promoCode.value === 'ТЕЛО2020') { priceTotal.textContent = Math.floor(+priceTotal.textContent * 0.7); }

                promoCode.addEventListener('input', () => {
                    if (promoCode.value === 'ТЕЛО2020') { priceTotal.textContent = Math.floor(+priceTotal.textContent * 0.7); }
                    else {
                        month.forEach((item) => {
                            if (item.checked) { loadForm(item); }
                        })
                    }
                })
            }
        };
        addTotalPrice();
        


        const loadForm = (target = null) => {
            data()
                .then( (data) => {

                    if (promoCode) {
                        let val = [];
                        month.forEach((item, i) => {
                            if (target === item) {
                                let targetId = target.id.slice(-1);

                                if (cardMozaika.checked || cardSchelkovo.checked) {
                                    if (cardMozaika.checked) {
                                        data.mozaika.forEach((item) => { val.push(item) });
                                    } else if (cardSchelkovo.checked) {
                                        data.schelkovo.forEach((item) => { val.push(item) });
                                    }

                                    if (promoCode.value === 'ТЕЛО2020') { priceTotal.textContent = Math.floor(val[i] * 0.7); }
                                    else priceTotal.textContent = val[targetId-1];
                                }
                            } else if (target === cardMozaika || target === cardSchelkovo) {
                                if (item.checked) {
                                    let id = item.id.slice(-1),
                                        nameClub = target.id.split('_')[2];

                                    data[nameClub].forEach((item) => { val.push(item) });
                                    if (promoCode.value === 'ТЕЛО2020') { priceTotal.textContent = Math.floor(val[i] * 0.7); }
                                    else priceTotal.textContent = val[id-1];
                                }
                            }
                        });
                    }
                })
                .catch( (error) => console.log(error) );
        };

        cardsForm.addEventListener('click',(e) => { loadForm(e.target); });
    };

    calc();
};

/* harmony default export */ var modules_calc = (calc);
// CONCATENATED MODULE: ./src/modules/displayForm.js
//записаться на бесплатный визит / кнопка "перезвоните мне" / кнопка "выбор клуба"
let x = 0, y = 0;

// const displayForm = (form, display = 'block') => {
//     if (form.style.display === 'none' || form.style.display === '') {
//         form.style.display = display;
//     } else {
//         form.style.display = 'none';
//     }
//
//     if (form.className.split(' ')[0] === 'popup-menu') {
//         window.scrollTo(x, y);
//     }
// };

const displayForm = (form, display = 'block', popupType) => {
    const html = document.querySelector('html'),
        topMenu = document.querySelector('.top-menu'),
        fixedGift = document.querySelector('.fixed-gift'),
        paddingScroll = window.innerWidth - document.querySelector('body').offsetWidth;

    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = display;

        if (!popupType) {
            html.style.overflowY = 'hidden';
            html.style.paddingRight = `${paddingScroll}px`;
            if (window.scrollY >= 126) { topMenu.style.width = `calc(100% - ${paddingScroll}px)`; }
            form.childNodes[1].style.overflowY = 'scroll';

            if (fixedGift) { fixedGift.style.right = `${paddingScroll+20}px`; }
        }

    } else {
        form.style.display = 'none';

        if (!popupType) {
            html.removeAttribute('style');
            topMenu.style.width = `100%`;
            form.childNodes[1].removeAttribute('style');

            if (fixedGift) { fixedGift.style.right = `20px`; }
        }
    }

    if (form.className.split(' ')[0] === 'popup-menu') {
        window.scrollTo(x, y);
    }
};


// CONCATENATED MODULE: ./src/modules/sendForms.js




const sendForms = () => {
    //send form
    const sendForm = (form) => {
        const loadMessage = 'images/icon/hourglass.svg',
            errorMessage = 'images/icon/error.svg';

        const statusMessage = document.createElement('img'),
            statusMessageWrap = document.createElement('div');
        statusMessageWrap.classList.add('msg-wraper');

        let timer = 5000;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            form.appendChild(statusMessageWrap);
            const statusMsgWrap = form.querySelector('.msg-wraper');

            form.style.position = 'relative';

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

                    const successForm = document.getElementById('thanks');
                    if (form.closest('.popup')) {
                        displayForm(form.closest('.popup'), 'none');
                        displayForm(successForm);
                    } else { displayForm(successForm);}



                    const promoCode = document.querySelector('.promocode');
                    if (form.id === 'card_order' && promoCode) {
                        const monthCheck = document.querySelectorAll(`#${form.id} input[type="radio"]`)[0],
                              clubCheck = document.querySelectorAll(`#${form.id} .club input[type="radio"]`)[0],
                              priceTotal = document.getElementById('price-total');

                        monthCheck.checked = true;
                        clubCheck.checked = true;
                        priceTotal.textContent = '1999'
                    }

                    statusMsgWrap.remove();
                    clearForm();
                })
                .catch( (error) => {
                    statusMessage.src = errorMessage;
                    console.log(error);
                });

            setTimeout(() => {
                const thanksPopup = document.getElementById('thanks');
                if (thanksPopup.style.display === 'block') {
                    thanksPopup.style.display = 'none';

                    document.querySelector('html').removeAttribute('style');
                    document.querySelector('.top-menu').style.width = `100%`;
                }

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

        //clear form
        const clearForm = () => {
            const formID = form.id,
                formElem = document.querySelectorAll(`#${formID} input`);

            formElem.forEach((item) => { item.value = ''; });
        };
    };


    //validate form
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
                const personalData = document.querySelector(`.${form.className} .personal-data`);
                personalData.appendChild(elemWrap);
            } else if (form.id === 'card_order') {
                const personalData = document.querySelector(`#${form.id} .personal-data`);
                elemWrap.classList.add('msg-wrap-pos');
                personalData.insertAdjacentElement('beforeend', elemWrap);
                // form.insertBefore(elemWrap, document.querySelector(`#${form.id} .submit`))
            }  else { form.appendChild(elemWrap); }

            create = true;
        }


        const validForm = () => {
            const formID = form.id,
                formElem = document.querySelectorAll(`#${formID} input`);

            const regNum = /[^0-9\+]/g,
                regPhone = /^[+]?[0-9]{1,11}$/g,
                regStr = /[^А-Яа-яЁё\s]/g,
                regStrCode = /[^A-Za-zА-Яа-яЁё0-9]/g;

            const valid = (input) => {
                let val = input.value;

                if (input.focus && input.type === 'tel') {
                    val = val.replace(regNum, '');

                    if (regPhone.test(val)) { input.value = val; }
                    else { input.value = validPhone(val); }

                } else if (input.getAttribute("placeholder") === "Ваше имя..." && regStr.test(val)) {
                    val = val.replace(regStr, '');
                    input.value = val;
                } else if (input.className === "promocode") {
                    val = val.replace(regStrCode, '');
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
};

/* harmony default export */ var modules_sendForms = (sendForms);
// CONCATENATED MODULE: ./src/index.js











//popup
modules_popup();

//animate
modules_animate();

//sliders
modules_headerSlider();
modules_servicesSlider();
modules_gallerySlider();

//calc
modules_calc();

//form
modules_sendForms();

/***/ })
/******/ ]);