const sliderContent = document.querySelector('.slider__list');
const paginationBtns = document.querySelectorAll('.pagination__item');
const nextBtn = document.querySelector('.slider__button--next');
const prevBtn = document.querySelector('.slider__button--prev');
const slidesNumber = sliderContent.querySelectorAll('.slide').length;

let translateValue = 0;
let currentSlide = 0;

paginationBtns.forEach((btn, i) => { 
    btn.addEventListener('click', () => {
        paginationBtns.forEach(btn => {
            btn.classList.remove('pagination__item--active');
        });
        btn.classList.add('pagination__item--active');
        currentSlide = i;
        translateValue = currentSlide * (-100 / slidesNumber)
        sliderContent.style.transform = `translateX(${translateValue}%)`;
    })
});

nextBtn.addEventListener('click', () => {
    if (currentSlide !== slidesNumber - 1) {
        currentSlide++;
        paginationBtns.forEach(btn => {
            btn.classList.remove('pagination__item--active');
        });
        paginationBtns[currentSlide].classList.add('pagination__item--active');
        translateValue = currentSlide * (-100 / slidesNumber);  
        sliderContent.style.transform = `translateX(${translateValue}%)`;
    } 
});

prevBtn.addEventListener('click', () => {
    if (currentSlide !== 0) {
        currentSlide--;
        paginationBtns.forEach(btn => {
            btn.classList.remove('pagination__item--active');
        });
        paginationBtns[currentSlide].classList.add('pagination__item--active');
        translateValue = currentSlide * (-100 / slidesNumber);  
        sliderContent.style.transform = `translateX(${translateValue}%)`;
    }
});