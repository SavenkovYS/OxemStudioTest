(function() {
    const loadingBtn = document.querySelector('.slide__button--loading');
    const loadingBtnText = loadingBtn.querySelector('.slide__button-text');
    const loadingIcon = loadingBtn.querySelector('.slide__loading-icon');

    const LOADING_TIME = 2000;

    let loading = false;

    loadingBtn.addEventListener('click', () => {
        loading = true;
        showButtonContent()
        const timerId = setTimeout(() => {
            loading = false;
            showButtonContent()
        }, LOADING_TIME);     
    });

    function showButtonContent() {
        if (loading) {
            loadingBtnText.textContent = '';
            loadingIcon.style.display = 'inline';
        } else {
            loadingBtnText.textContent = 'Кнопка с загрузкой';
            loadingIcon.style.display = 'none';
        }
    }
})();

