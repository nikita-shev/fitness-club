'use strict';

const popup = () => {
    const promoCode = document.querySelector('.promocode'),
        fixedGift = document.querySelector('.fixed-gift');

    if (localStorage.code && promoCode) {
        promoCode.value = localStorage.code;
        fixedGift.style.display = 'none'
    }

    const selectBtnClub = document.querySelector('.clubs-list'),
        clubsList = selectBtnClub.querySelector('ul');

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

        if (target.closest('.clubs-list') && !target.matches('.clubs-list ul') && !target.matches('.clubs-list ul>li')) {
            displayForm(clubsList, 'block', 'club');
        } else if (!target.closest('.clubs-list')) {
            clubsList.style.display = 'none';
        }

        if (target.closest('.fixed-gift')) {
            popupId = target.getAttribute('data-popup');
            form = document.querySelector(`${popupId}`);

            displayForm(form);
        }

        if (target.matches('#gift button')) {
            localStorage.code = 'ТЕЛО2020';
            fixedGift.style.display = 'none';
        }

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

export default popup;
