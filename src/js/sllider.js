(function () {
    const sliderContent = document.querySelector('.slider__list');
    const paginationBtns = document.querySelectorAll('.pagination__item');
    const nextBtn = document.querySelector('.slider__button--next');
    const prevBtn = document.querySelector('.slider__button--prev');
    const slidesNumber = sliderContent.querySelectorAll('.slide').length;
    const slideButtons = sliderContent.querySelectorAll('.slide__button');
    const progressBar = document.querySelector('.circle__progress');

    const RADIUS = 22;
    const ACCELERATION_RATE = 10;
    const SLIDE_INTERVAL_TIME = 10;

    const length = Math.PI * 2 * RADIUS;

    progressBar.style.strokeDasharray = length;

    function updateStroke(value, timePercent) {
        var offset = -(length - length * value / (timePercent));
        progressBar.style.strokeDashoffset = offset; 
    };

    let intervalTimer;
    let timeLeft;
    let wholeTime = SLIDE_INTERVAL_TIME * ACCELERATION_RATE;  

    updateStroke(wholeTime, wholeTime);

    function timer (seconds) { 
        let remainTime = Date.now() + (seconds * (1000 / ACCELERATION_RATE));
        updateStroke(timeLeft, wholeTime);
        intervalTimer = setInterval(function() {
            timeLeft = Math.round((remainTime - Date.now()) / (1000 / ACCELERATION_RATE));
            if (timeLeft === 0) {
                playNextSlide();
                clearInterval(intervalTimer);
                updateStroke(wholeTime, wholeTime);
                timer(wholeTime);
            }
            updateStroke(timeLeft, wholeTime)
        }, (1000 / ACCELERATION_RATE));
    }

    timer(wholeTime)

    let translateValue = 0;
    let currentSlide = 0;
    prevBtn.disabled = 'disabled';

    function goToSlide(n) {
        resetInterval()
        
        paginationBtns[currentSlide].classList.remove('pagination__item--active');
        slideButtons[currentSlide].tabIndex = '-1';

        currentSlide = (n + slidesNumber) % slidesNumber;

        if (currentSlide === slidesNumber - 1) {
            nextBtn.disabled = 'disabled';
        } else {
            nextBtn.disabled = '';
        }

        if (currentSlide === 0) {
            prevBtn.disabled = 'disabled';
        } else {
            prevBtn.disabled = '';
        }

        slideButtons[currentSlide].tabIndex = '1';
        paginationBtns[currentSlide].classList.add('pagination__item--active');
        translateValue = currentSlide * (-100 / slidesNumber);  
        sliderContent.style.transform = `translateX(${translateValue}%)`;
    }

    function playNextSlide() {
        goToSlide(currentSlide + 1);
    }

    function resetInterval() {
        clearInterval(intervalTimer);
        timer(wholeTime);
    }

    paginationBtns.forEach((btn, i) => { 
        btn.addEventListener('click', () => {
            goToSlide(i);
        })
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide !== slidesNumber - 1) {
            goToSlide(currentSlide + 1);
        } 
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide !== 0) {
            goToSlide(currentSlide - 1);
        } 
    });
})();

