(() => {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    const modal = document.getElementById('regModal');
    const regForm = document.getElementById('regForm');
    const linkToReg = document.getElementById('linkToReg');

    if (burger) {
        burger.onclick = () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        };
    }

    if (linkToReg) {
        linkToReg.onclick = (e) => {
            e.preventDefault();
            document.getElementById('authBtn').click();
        };
    }

    const updateUI = () => {
        const user = localStorage.getItem('loggedUser');
        const authZone = document.getElementById('auth-zone');
        if (user && authZone) {
            authZone.innerHTML = `
                <span class="header__link" style="color: #27ae60; font-weight: bold;">${user}</span>
                <a href="#" id="logoutBtn" class="header__link">Вихід</a>
            `;
            
            const commForm = document.getElementById('commentForm');
            const commLock = document.getElementById('comment-lock-msg');
            if (commForm) commForm.style.display = "block";
            if (commLock) commLock.style.display = "none";
            
            document.getElementById('logoutBtn').onclick = () => {
                localStorage.removeItem('loggedUser');
                location.reload();
            };
        }
    };

    const authBtn = document.getElementById('authBtn');
    if (authBtn) {
        authBtn.onclick = () => {
            document.getElementById('modalTitle').innerText = "Реєстрація";
            document.getElementById('nameField').style.display = "block";
            modal.style.display = "flex";
        };
    }

    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    if (regForm) {
        regForm.onsubmit = (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('uName');
            const emailInput = document.getElementById('uEmail');
            const passInput = document.getElementById('uPass');

            // Валідація[cite: 1]
            if (nameInput.value.trim().length < 2) {
                alert("Будь ласка, введіть коректне ім'я (мінімум 2 символи)");
                return;
            }

            if (!emailInput.value.includes('@')) {
                alert("Будь ласка, введіть дійсний Email");
                return;
            }

            if (passInput.value.length < 6) {
                alert("Пароль має бути не менше 6 символів");
                return;
            }

            const userName = nameInput.value;
            localStorage.setItem('loggedUser', userName);
            
            alert("Успішно зареєстровано!");
            modal.style.display = "none";
            location.reload(); 
        };
    }

    updateUI();
})();