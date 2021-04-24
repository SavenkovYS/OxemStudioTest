(function() {
    const modalFields = document.querySelectorAll('.modal__form-item');

    const telInput = document.querySelector('#tel');

    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telInput);

    modalFields.forEach(field => {
        const modalInput = field.querySelector('.modal__input');
        const modalLabel = field.querySelector('.modal__label');
        const modalError = field.querySelector('.modal__error');

        function showMistake() {
            modalError.style.display = 'block';
            modalInput.setCustomValidity('Пожалуйста, введите корректные данные');
        }

        function hideMistake() {
            modalInput.classList.remove('modal__input--error');
            modalError.style.display = 'none';
        }

        modalInput.addEventListener('change', () => {
            if (modalInput.value) {
                modalLabel.classList.add('modal__label--not-empty');
            } else {
                modalLabel.classList.remove('modal__label--not-empty');
            }

            if (modalInput === telInput && modalInput.value.includes('_')) {
                modalInput.classList.add('modal__input--error');
                showMistake();
            } else {
                modalInput.setCustomValidity('');
                hideMistake();
            }
        });
    })
})();

