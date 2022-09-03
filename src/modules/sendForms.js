'use strict';

import {x, y, displayForm} from "./displayForm";

const sendForms = () => {
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

export default sendForms;
