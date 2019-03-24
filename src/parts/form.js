function form() {


  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжимся!',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form'),
    contactForm = document.querySelector('#form'),
    input = document.querySelectorAll('input'),
    statusMessage = document.createElement('div'),
    inputPhone = document.querySelectorAll('input[type="tel"]');

  statusMessage.classList.add('status');

  input[2].setAttribute('name', 'email');
  input[3].setAttribute('name', 'phone');

  function submissionForm(element) {
    element.addEventListener('submit', (a) => {
      a.preventDefault();
      element.appendChild(statusMessage);
      let formData = new FormData(element);

      // let obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });

      //let json = JSON.stringify(obj);      
      

      function postData(data) {
        return new Promise((resolve, reject) => {
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          request.onreadystatechange = () => {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status == 200) {
              resolve();
            } else {
              reject();
            }
          };
          request.send(/*json*/data);
        });
      }

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
        statusMessage.innerHTML = '';
      }

      postData(formData)
      .then(() => statusMessage.innerHTML = message.loading)
      .then(() => statusMessage.innerHTML = message.success)
      .catch(() => statusMessage.innerHTML = message.failure)
      .then(() => setTimeout(clearInput, 4000));
    });
  }

  submissionForm(form);
  submissionForm(contactForm);
  
  inputPhone.forEach((elem) => {
    elem.addEventListener('focus', () => {
      if(!/^\+\d*$/.test(elem.value)) {
        elem.value = '+';
      }
    });

    elem.addEventListener('keydown', (e) => {
      if(!/\d/.test(e.key)) {
        e.preventDefault();
      }
    });
  });



}

module.exports = form;

