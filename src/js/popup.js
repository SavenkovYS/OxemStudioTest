(function() {
    const openBtn = document.querySelectorAll('.button-apply');
    const popup = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const closeBtn = popup.querySelector('.modal__close');
    const calculatorForm = document.querySelector('.calculator__form');

    function openPopup() {
        overlay.classList.remove('overlay--closed');
        popup.classList.remove('modal--closed');

        closeBtn.addEventListener('click', () => {
            closePopup();
        })
    }

    function closePopup() {
        overlay.classList.add('overlay--closed');
        popup.classList.add('modal--closed');
    }

    openBtn.forEach(btn => {{
        btn.addEventListener('click', evt => {
            openPopup();
        })
    }})

    calculatorForm.addEventListener('submit', evt => {
        evt.preventDefault();
        fetch('somePhpScenerio.php', {
            method: 'POST',
            body: new FormData(calculatorForm)
        })
            .then (response => console.log(response))
            .catch(error => console.error(error))
        
        openPopup();
    });
})();

