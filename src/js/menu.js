const mainNav = document.querySelector('.main-nav');
const toggleBtn = document.querySelector('.page-header__toggle');

mainNav.classList.add('main-nav--closed');
toggleBtn.classList.add('page-header__toggle--closed');

toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('main-nav--closed');
    toggleBtn.classList.toggle('page-header__toggle--closed');
})