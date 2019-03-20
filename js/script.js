window.addEventListener('DOMContentLoaded', () => {

  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  //Timer
  let deadline = '2019-03-23';

  function getTimeRamaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
    seconds = Math.floor((t/1000) % 60),
    minutes = Math.floor((t/1000/60) % 60),
    hours = Math.floor((t/1000/60/60) % 24);

    if (hours < 10) {
      hours = `0 ${hours}`;
    }

    if (minutes < 10) {
      minutes = `0 ${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0 ${seconds}`;
    }

    return {
      'total' : t,
      'hours' : hours,
      'minutes' : minutes,
      'seconds' : seconds
    };
  }

  function setClock(id, endtime) {
    let timer =document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRamaining(endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = "00";
        seconds.textContent = "00";
        minutes.textContent = "00";
      }

    }  
  }
  
  setClock('timer', deadline);

  //Modal window

  let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    descrBtn = document.querySelectorAll('.description-btn');

  function modalOpen() {
    overlay.style.display = 'block',
    this.classList.add('more-splash'),
    document.body.style.overflow = 'hidden';
  }

  function modalClose() {
    overlay.style.display = 'none',
    more.classList.remove('more-splash'),
    document.body.style.overflow = '';
  }
    
  descrBtn.forEach((item) => {
    item.addEventListener('click', modalOpen);
  });
  
  more.addEventListener('click', modalOpen);

  close.addEventListener('click', modalClose);

  //Form

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжимся!',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form'),
    contactForm = document.querySelector('#form'),
    input = document.getElementsByTagName('input'),
    statusMessage = document.createElement('div'),
    btnLast = document.querySelector('input[type="submit"]');

  statusMessage.classList.add('status');

  btnLast.addEventListener('click', () => {
    input[0].setAttribute('name', 'email');
    input[1].setAttribute('name', 'phone');
  });
  
  function submissionForm(element) {
    element.addEventListener('submit', (a) => {
      a.preventDefault();
      element.appendChild(statusMessage);


      let request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

      let formData = new FormData(element);

      let obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });

      let json = JSON.stringify(obj);

      request.send(json);

      request.addEventListener('readystatechange', () => {
        if (request.readyState < 4) {
          statusMessage.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200) {
          statusMessage.innerHTML = message.success;
        } else {
          statusMessage.innerHTML = message.failure;
        }
      });

      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    });
  }

  submissionForm(form);
  submissionForm(contactForm);


});
