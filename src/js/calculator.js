(function() {
    const calculatorItems = document.querySelectorAll('.calculator__item');
    const creditInput = document.querySelector('#credit');
    const initialPaymentInput = document.querySelector('#initial-payment');
    const termInput = document.querySelector('#term');
    const initialPaymentOutput = document.querySelector('.calculator__payment-result');
    const monthlyPaymentOutput = document.querySelector('.calculator__result--payment');
    const priceOutput = document.querySelector('.calculator__result--sum');


    const MAX_PRICE = 6000000;
    const MIN_PRICE = 1000000;
    const MIN_PERCENT = 10;
    const MAX_PERCENT = 60;
    const MIN_TERM = 1;
    const MAX_TERM = 60;
    const ANNUAL_INTEREST_RATE = 5;

    reset();

    function reset() {
        creditInput.value = MIN_PRICE;
        initialPaymentInput.value = `${MIN_PERCENT}%`;
        termInput.value = MIN_TERM;
        initialPaymentOutput.textContent = Math.floor(creditInput.value * parseInt(initialPaymentInput.value) / 100);

        displayCreditConditions();
    }

    function countMonthlyPayment(credit, initialPayment, interestRate, term) {
        const mothlyInterestRate = interestRate / 100 / 12;
        return Math.round((credit - initialPayment) * (mothlyInterestRate + mothlyInterestRate / ((1 + mothlyInterestRate) ** term - 1)));
    }

    function countTotalSum(monthlyPayment, term) {
        return monthlyPayment * term;
    }

    function displayCreditConditions() {
        const monthlyPayment = countMonthlyPayment(creditInput.value, initialPaymentOutput.textContent, ANNUAL_INTEREST_RATE, termInput.value);
        monthlyPaymentOutput.textContent = monthlyPayment;
        priceOutput.textContent = countTotalSum(monthlyPayment, termInput.value);
    }

    function displayInitialPayment() {
        initialPaymentOutput.textContent = Math.floor(creditInput.value * parseInt(initialPaymentInput.value) / 100);
    }

    calculatorItems.forEach(calculatorItem => {
        const rangeContainer = calculatorItem.querySelector('.range');
        const rangeLine = calculatorItem.querySelector('.range__line');
        const rangePin = calculatorItem.querySelector('.range__pin');
        const calculatorInput = calculatorItem.querySelector('.calculator__input');

        let backgroundImageValue = 0;
        rangeLine.style.backgroundImage = `linear-gradient(to right, #ff9514 0%, #ff9514 ${backgroundImageValue}%, #e1e1e1 ${backgroundImageValue}%, #e1e1e1)`;

        function updateFieldOnChange(input, minValue, maxValue) {
            if (parseInt(input.value) > maxValue) {
                input.value = maxValue;
            }

            if (parseInt(input.value) < minValue) {
                input.value = minValue;
            }

            if (input === initialPaymentInput && input.value[input.value.length - 1] !== '%') {
                input.value += '%';
            }

            rangePin.style.left = `${(parseInt(input.value) - minValue) / (maxValue - minValue) * 100}%`;
            backgroundImageValue = `${(parseInt(input.value) - minValue) / (maxValue -  minValue) * 100}`;
            rangeLine.style.backgroundImage = `linear-gradient(to right, #ff9514 0%, #ff9514 ${backgroundImageValue}%, #e1e1e1 ${backgroundImageValue}%, #e1e1e1)`;

            displayInitialPayment()
            displayCreditConditions()
        }

        function updateFieldOnMove(input, minValue, maxValue, pinPosition) {
            backgroundImageValue = pinPosition / rangeLine.offsetWidth * 100;
            rangeLine.style.backgroundImage = `linear-gradient(to right, #ff9514 0%, #ff9514 ${backgroundImageValue}%, #e1e1e1 ${backgroundImageValue}%, #e1e1e1)`;
            rangePin.style.left = `${pinPosition}px`;

            input.value = Math.floor(minValue + (maxValue - minValue) * (pinPosition / rangeLine.offsetWidth));
            if (input === initialPaymentInput) {
                input.value += '%';
            }

            displayInitialPayment();
            displayCreditConditions();
        }

        function validateInput(input) {
            const lastIndex = input.value.length - 1;
            if (isNaN(input.value[lastIndex])) {
                input.value = input.value.substring(0, lastIndex);
            }
        }

        calculatorInput.addEventListener('input', () => {
            validateInput(calculatorInput);
        });

        calculatorInput.addEventListener('change', evt => {
            if (evt.target === creditInput) {
                updateFieldOnChange(creditInput, MIN_PRICE, MAX_PRICE);
            }

            if (evt.target === initialPaymentInput) {
                updateFieldOnChange(initialPaymentInput, MIN_PERCENT, MAX_PERCENT);
            }

            if (evt.target === termInput) {
                updateFieldOnChange(termInput, MIN_TERM, MAX_TERM);
            }
        });

        rangePin.addEventListener('mousedown', () => {
            const lineCoord = rangeLine.getBoundingClientRect().left;
            const maxLeftPosition = lineCoord;
            const maxRightPosition = rangeLine.offsetWidth + lineCoord;

            rangeContainer.addEventListener('mousemove', handleMousemove);
            document.addEventListener('mouseup', handleMousedown);

            function handleMousemove(evt) {
                let currentCoord = evt.clientX;
                
                if (currentCoord > maxRightPosition) {
                    currentCoord = maxRightPosition;
                }

                if (currentCoord < maxLeftPosition) {
                    currentCoord = maxLeftPosition;
                }

                const pinPosition = currentCoord - lineCoord;

                if (rangeContainer.classList.contains('calculator__range--credit')) {
                    updateFieldOnMove(creditInput, MIN_PRICE, MAX_PRICE, pinPosition);
                }

                if (rangeContainer.classList.contains('calculator__range--initial-payment')) {
                    updateFieldOnMove(initialPaymentInput, MIN_PERCENT, MAX_PERCENT, pinPosition);
                }

                if (rangeContainer.classList.contains('calculator__range--term')) {
                    updateFieldOnMove(termInput, MIN_TERM, MAX_TERM, pinPosition);
                }  
            }

            function handleMousedown() {
                rangeContainer.removeEventListener('mousemove', handleMousemove);
                document.removeEventListener('mouseup', handleMousedown);
            }
        });
    })
})();






