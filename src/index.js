'use strict';

import popup from './modules/popup';
import animate from './modules/animate';
import headerSlider from './modules/headerSlider';
import servicesSlider from './modules/servicesSlider';
import gallerySlider from './modules/gallerySlider';
import calc from './modules/calc';
import sendForms from './modules/sendForms';


//popup
popup();

//animate
animate();

//sliders
headerSlider();
servicesSlider();
gallerySlider();

//calc
calc();

//form
sendForms();