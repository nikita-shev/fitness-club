'use strict';

const calc = () => {
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

export default calc;
