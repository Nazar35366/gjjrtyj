document.querySelectorAll('.js-flip').forEach(btn => {
            btn.onclick = () => btn.closest('.tour-card').classList.add('is-flipped');
        });
        document.querySelectorAll('.js-unflip').forEach(btn => {
            btn.onclick = () => btn.closest('.tour-card').classList.remove('is-flipped');
        });

        const burger = document.getElementById('burger');
        const menu = document.getElementById('menu');
        burger.onclick = () => {
            menu.classList.toggle('active');
            burger.classList.toggle('active');
};