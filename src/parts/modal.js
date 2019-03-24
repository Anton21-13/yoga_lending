function modal() {

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

}

module.exports = modal;