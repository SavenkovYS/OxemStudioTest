const openBtn = document.querySelectorAll('.button-apply');
const popup = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = popup.querySelector('.modal__close');

openBtn.forEach(btn => {{
    btn.addEventListener('click', handleClick)

    function handleClick(evt) {
        evt.preventDefault();
        overlay.classList.remove('overlay--closed');
        popup.classList.remove('modal--closed');

        closeBtn.addEventListener('click', () => {
            overlay.classList.add('overlay--closed');
            popup.classList.add('modal--closed');
        })
    }
}})