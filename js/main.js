// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Если на странице нет модального окна — просто выходим.
if (orderDialog) {
    const orderButtons = document.querySelectorAll('.product-card__button');
    const closeDialogButton = document.getElementById('close-order-dialog');
    const selectedProductInput = document.getElementById('selected-product');
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('success-message');

    // Открытие модалки по кнопкам «Заказать»
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (selectedProductInput) {
                selectedProductInput.value = button.dataset.product || '';
            }
            orderDialog.showModal();
        });
    });

    // Закрытие по кнопке
    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            orderDialog.close();
        });
    }

    // Закрытие по клику на backdrop
    orderDialog.addEventListener('click', (e) => {
        if (e.target === orderDialog) orderDialog.close();
    });

    // Обработка отправки формы
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formElements = Array.from(orderForm.elements);

            formElements.forEach((el) => {
                if (el.willValidate) el.removeAttribute('aria-invalid');
            });

            if (!orderForm.checkValidity()) {
                formElements.forEach((el) => {
                    if (el.willValidate && !el.checkValidity()) {
                        el.setAttribute('aria-invalid', 'true');
                    }
                });
                orderForm.reportValidity();
                return;
            }

            if (successMessage) successMessage.hidden = false;

            orderForm.reset();
            orderDialog.close();
        });
    }
}