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

export {x, y, displayForm};
