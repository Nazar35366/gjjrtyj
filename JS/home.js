document.addEventListener('DOMContentLoaded', () => {
    const tours = [
        { 
            name: "Романтична Венеція", 
            img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=60&w=500" 
        },
        { 
            name: "Мальовничі Карпати", 
            img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=60&w=500" 
        },
        { 
            name: "Сонячний Єгипет", 
            img: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&q=60&w=500" 
        }
    ];

    const gallery = document.getElementById('dynamic-gallery');
    
    if (gallery) {
        gallery.innerHTML = ''; 
        tours.forEach(tour => {
            const card = document.createElement('div');
            card.className = 'feature-card';
            card.innerHTML = `
                <img src="${tour.img}" 
                     alt="${tour.name}" 
                     loading="lazy"
                     style="width:100%; border-radius:10px; height:220px; object-fit:cover; background-color: #eee;">
                <h3 style="margin-top:15px; font-weight: 700;">${tour.name}</h3>
            `;
            gallery.appendChild(card);
        });
    }

    const container = document.getElementById('comments-container');
    let comments = JSON.parse(localStorage.getItem('siteComments')) || [
        { user: "Назар", text: "Венеція була моєю мрією! Дякую за організацію." }
    ];

    const render = () => {
        if (!container) return;
        container.innerHTML = '';
        comments.forEach(c => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            div.innerHTML = `<strong>${c.user}</strong>: <p style="display:inline;">${c.text}</p>`;
            container.appendChild(div);
        });
    };

    const form = document.getElementById('commentForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const user = localStorage.getItem('loggedUser');
            const text = document.getElementById('commentText').value;
            if (user && text) {
                comments.push({ user, text });
                localStorage.setItem('siteComments', JSON.stringify(comments));
                render();
                form.reset();
            }
        };
    }
    render();

    const scrollBtn = document.getElementById('scrollToTop');

window.onscroll = () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
});