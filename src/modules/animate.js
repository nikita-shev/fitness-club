'use strict';

const animate = () => {
    const navMenu = document.querySelector('.top-menu'),
        toTop = document.getElementById('totop');

    toTop.style.display = 'none';

    window.addEventListener('scroll', () => {
        const blockFix = document.querySelector('.block-fix');

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
};

export default animate;
