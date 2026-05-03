document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payForm');
    const nameInput = document.querySelector('#name');
    const cardInput = document.querySelector('#card-number');
    const dateInput = document.querySelector('#expiry');
    const cvvInput = document.querySelector('#cvv');

    function setSuccess(input) {
        input.classList.add('input-success');
        input.classList.remove('input-error');
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (errorSpan) errorSpan.style.display = 'none';
    }

    function setError(input, msg) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (errorSpan) {
            errorSpan.textContent = msg;
            errorSpan.style.display = 'block';
        }
    }

    nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        if (/^[A-Z]+\s[A-Z]+$/.test(nameInput.value)) {
            setSuccess(nameInput);
        } else {
            nameInput.classList.remove('input-success');
        }
    });

    IMask(cardInput, { mask: '0000 0000 0000 0000' });
    IMask(dateInput, {
        mask: 'MM/YY',
        blocks: {
            MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
            YY: { mask: IMask.MaskedRange, from: 24, to: 35 }
        }
    });
    IMask(cvvInput, { mask: '000' });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (!/^[A-Z]+\s[A-Z]+$/.test(nameInput.value)) {
            setError(nameInput, "Введіть NAME SURNAME (латиниця)");
            isValid = false;
        } else { setSuccess(nameInput); }

        if (cardInput.value.replace(/\s/g, '').length < 16) {
            setError(cardInput, "Має бути 16 цифр");
            isValid = false;
        } else { setSuccess(cardInput); }

        if (dateInput.value.length < 5) {
            setError(dateInput, "Формат MM/YY");
            isValid = false;
        } else { setSuccess(dateInput); }

        if (cvvInput.value.length < 3) {
            setError(cvvInput, "3 цифри");
            isValid = false;
        } else { setSuccess(cvvInput); }

        if (isValid) {
            alert("🎉 Оплата успішна!");
            form.reset();
            document.querySelectorAll('.payment-form__input').forEach(el => el.classList.remove('input-success'));
        }
    });
});