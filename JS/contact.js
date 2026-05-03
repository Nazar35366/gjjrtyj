document.getElementById('contact-form').onsubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    alert('Дякуємо, ' + name + '! Ваше повідомлення отримано.');
    
    this.reset(); 
};