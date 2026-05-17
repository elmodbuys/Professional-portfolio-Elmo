const barFill = document.getElementById('bar-fill');

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

const toggleBtn = document.getElementById('theme-toggle');

if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

const revealElements =  document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold:0.12
});

revealElements.forEach(el => observer.observe(el));

const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrolled/totalHeight) * 100;
    barFill.style.height = Math.min(progress, 95) + '%';
});

let basePrice = 0;

document.querySelectorAll('.pricing-card').forEach(link => {
    link.addEventListener('click', () => {
        basePrice = parseInt(link.dataset.price);
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.classList.remove('selected');
        })
        link.classList.add('selected');
        calculateTotal();
    })
})

function calculateTotal() {
   let total = basePrice;
   document.querySelectorAll('input[name="add-on"]:checked').forEach(function(addon) {
        total += parseInt(addon.dataset.price);
   })
   document.getElementById('total').textContent = 'Estimated total: R' + total;
}

document.querySelectorAll('input[name="add-on"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        calculateTotal();
    });
});

const billingToggle = document.getElementById('billing-toggle');
    billingToggle.addEventListener('change', () => {
        document.querySelectorAll('.care-left').forEach(plan => {
            const price = billingToggle.checked ? plan.dataset.annual : plan.dataset.monthly;
            plan.querySelector('.care-price').textContent = price;
        })
    });
