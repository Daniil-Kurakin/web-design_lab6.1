// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для всех ссылок с якорями
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Добавляем фокус на поле email, если это форма
                if (targetId === '#form') {
                    setTimeout(() => {
                        const emailField = document.querySelector('#email-field');
                        if (emailField) emailField.focus();
                    }, 1000);
                }
            }
        });
    });

    // Аккордеон для программы курса
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const btn = item.querySelector('.accordion-btn');
        
        btn.addEventListener('click', () => {
            // Закрываем все открытые элементы
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Открываем/закрываем текущий элемент
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Анимация счетчика статистики
    function animateCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const speed = 200; // Скорость анимации
        
        statNumbers.forEach(number => {
            const target = +number.getAttribute('data-count');
            const count = +number.innerText;
            const increment = target / speed;
            
            if (count < target) {
                number.innerText = Math.ceil(count + increment);
                setTimeout(animateCounter, 1);
            } else {
                number.innerText = target;
            }
        });
    }

    // Запускаем анимацию при прокрутке до блока статистики
    function checkCounterVisibility() {
        const statsSection = document.querySelector('.stats');
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            animateCounter();
            window.removeEventListener('scroll', checkCounterVisibility);
        }
    }
    
    window.addEventListener('scroll', checkCounterVisibility);

    // Обработка формы подписки
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Здесь можно добавить AJAX-запрос или другую логику отправки
                alert('Спасибо за подписку! Первый урок отправлен на вашу почту.');
                emailInput.value = '';
            } else {
                alert('Пожалуйста, введите корректный email адрес.');
            }
        });
    }
    
    // Функция валидации email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});