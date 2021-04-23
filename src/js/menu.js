const mainNav = document.querySelector('.main-nav');
const toggleBtn = document.querySelector('.page-header__button');

mainNav.classList.add('main-nav--closed');
toggleBtn.classList.add('page-header__button--closed');

toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('main-nav--closed');
    toggleBtn.classList.toggle('page-header__button--closed');
})