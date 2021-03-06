require('es6-promise').polyfill();

window.addEventListener('DOMContentLoaded', () => {

  'use strict';

  let calc = require('./parts/calc'),
    form = require('./parts/form'),
    modal = require('./parts/modal'),
    slider = require('./parts/slider'),
    tabs = require('./parts/tabs'),
    timer = require('./parts/timer');

  calc();
  form();
  modal();
  slider();
  tabs();
  timer();

});
