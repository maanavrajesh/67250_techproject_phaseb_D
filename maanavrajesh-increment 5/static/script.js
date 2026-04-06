function greeting(h) {
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;

    if (h < 5 || h >= 20) {
        greetingEl.innerHTML = 'Good night';
    } else if (h < 12) {
        greetingEl.innerHTML = 'Good morning';
    } else if (h < 18) {
        greetingEl.innerHTML = 'Good afternoon';
    } else {
        greetingEl.innerHTML = 'Good evening';
    }
}

function addYear() {
    const copyYearEl = document.getElementById('copyYear');
    if (!copyYearEl) return;
    copyYearEl.innerHTML = new Date().getFullYear();
}

const now = new Date();
const hour = now.getHours();
if (document.getElementById('greeting')) {
    greeting(hour);
}


function ActiveNav() {
    const navLinks = document.querySelectorAll('.nav_bar a');

    navLinks.forEach(link => {
        
        if (window.location.href === link.href || 
            window.location.pathname.includes(link.getAttribute('href'))) {
            
            link.classList.add("active");
        }
    });
}


ActiveNav();

function toggleMobileNav(button) {
    const header = button.parentElement.parentElement;
    const nav = header.querySelector('.nav_bar');

    if (nav) {
        nav.classList.toggle('responsive');
    }
}

function showPurchaseForm(date) {
    window.location.href = 'checkout.html?date=' + encodeURIComponent(date);
}

function loadSelectedDate() {
    const selectedDate = document.getElementById('selectedDate');
    if (!selectedDate) return;

    const params = new URLSearchParams(window.location.search);
    const date = params.get('date');

    if (date) {
        selectedDate.value = date;
    }
}

function loadMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof L === 'undefined') return;

    const map = L.map('map').setView([40.4433, -79.9436], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([40.4433, -79.9436]).addTo(map)
        .bindPopup('MonoMuse location')
        .openPopup();
}

function submitPurchase() {
    alert('Redirecting to payment system.');
}

document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtn = document.getElementById('readMore');
    const readLessBtn = document.getElementById('readLess');
    const longIntro = document.getElementById('longIntro');

    if (readMoreBtn && readLessBtn && longIntro) {
        readMoreBtn.addEventListener('click', function () {
            longIntro.style.display = 'block';
            readLessBtn.style.display = 'inline-block';
            readMoreBtn.style.display = 'none';
        });

        readLessBtn.addEventListener('click', function () {
            longIntro.style.display = 'none';
            readLessBtn.style.display = 'none';
            readMoreBtn.style.display = 'inline-block';
        });
    }

    loadMap();
});
