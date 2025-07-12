// Main JavaScript file for Barbershop

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Auto-hide alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        if (alert.classList.contains('alert-success')) {
            setTimeout(() => {
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 300);
            }, 5000);
        }
    });

    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = `+7 (${value}`;
                } else if (value.length <= 4) {
                    value = `+7 (${value.slice(1)}`;
                } else if (value.length <= 7) {
                    value = `+7 (${value.slice(1, 4)}) ${value.slice(4)}`;
                } else if (value.length <= 9) {
                    value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7)}`;
                } else {
                    value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
                }
            }
            e.target.value = value;
        });
    });

    // Date input minimum date (today)
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});

// Utility functions
function showLoading(element) {
    const originalText = element.innerHTML;
    element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Загрузка...';
    element.disabled = true;
    return originalText;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Search functionality for orders
function filterOrders(searchTerm, statusFilter) {
    const orders = document.querySelectorAll('.order-card');
    orders.forEach(order => {
        const clientName = order.querySelector('.card-title').textContent.toLowerCase();
        const statusBadge = order.querySelector('.badge');
        let orderStatus = '';
        
        if (statusBadge) {
            const badgeText = statusBadge.textContent.toLowerCase();
            if (badgeText.includes('новая')) orderStatus = 'new';
            else if (badgeText.includes('подтверждена')) orderStatus = 'confirmed';
            else if (badgeText.includes('выполнена')) orderStatus = 'completed';
        }
        
        const matchesSearch = !searchTerm || clientName.includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || orderStatus === statusFilter;
        
        if (matchesSearch && matchesStatus) {
            order.style.display = 'block';
        } else {
            order.style.display = 'none';
        }
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .hero-section');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', animateOnScroll);
