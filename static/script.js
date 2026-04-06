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

// This opens and closes the mobile menu.
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
    const pickedDate = params.get('date');

    if (pickedDate) {
        selectedDate.value = pickedDate;
    }

    updateTotal();
}

// The explore page map only loads if the map div exists.
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

function updateTotal() {
    const quantity = document.getElementById('quantity');
    const totalCost = document.getElementById('totalCost');

    if (!quantity || !totalCost) return;

    const qty = Number(quantity.value);
    const total = qty > 0 ? qty * 18 : 0;
    totalCost.textContent = '$' + total;
}

// Simple form validation for the checkout page.
function showError(id, message) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
    });
}

function submitPurchase() {
    clearErrors();

    const name = document.getElementById('name');
    const visitDate = document.getElementById('selectedDate');
    const ticketType = document.getElementById('ticketType');
    const quantity = document.getElementById('quantity');
    const email = document.getElementById('email');
    const zipCode = document.getElementById('zipCode');
    const mailingList = document.getElementById('mailingList');

    let valid = true;

    if (!name.value.trim()) {
        showError('nameError', 'Please enter your name.');
        valid = false;
    }

    if (!visitDate.value) {
        showError('dateError', 'Please choose a visit date.');
        valid = false;
    }

    if (!ticketType.value) {
        showError('ticketTypeError', 'Please select a ticket type.');
        valid = false;
    }

    const qty = Number(quantity.value);
    if (!quantity.value || qty < 1 || qty > 10 || !Number.isInteger(qty)) {
        showError('quantityError', 'Please enter a whole number from 1 to 10.');
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('emailError', 'Please enter your email.');
        valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        showError('emailError', 'Please enter a valid email address.');
        valid = false;
    }

    const zipPattern = /^\d{5}$/;
    if (zipCode.value.trim() && !zipPattern.test(zipCode.value.trim())) {
        showError('zipCodeError', 'Zip code must be 5 digits.');
        valid = false;
    }

    if (!valid) return;

    const total = qty * 18;
    const params = new URLSearchParams({
        name: name.value.trim(),
        date: visitDate.value,
        type: ticketType.value,
        quantity: qty,
        total: '$' + total,
        mailingList: mailingList.checked ? 'Yes' : 'No'
    });

    window.location.href = 'confirmation.html?' + params.toString();
}

function loadConfirmation() {
    const confirmationMessage = document.getElementById('confirmationMessage');
    if (!confirmationMessage) return;

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || 'Guest';
    const visitDate = params.get('date') || '';
    const ticketType = params.get('type') || '';
    const quantity = params.get('quantity') || '';
    const total = params.get('total') || '';

    confirmationMessage.textContent = 'Thank you, ' + name + '. Your order has been confirmed.';
    document.getElementById('confirmDate').textContent = visitDate;
    document.getElementById('confirmType').textContent = ticketType;
    document.getElementById('confirmQuantity').textContent = quantity;
    document.getElementById('confirmTotal').textContent = total;
}

// This is a small DOM interaction for the explore page.
function loadFactButton() {
    const factButton = document.getElementById('factButton');
    const factText = document.getElementById('factText');

    if (!factButton || !factText) return;

    factButton.addEventListener('click', function () {
        factText.textContent = 'Museum fact: museums collect, protect, and share objects that tell stories about people and culture.';
    });
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
    updateTotal();
    loadFactButton();
});

// This is a simple jQuery accordion for the explore page.
$(document).ready(function () {
    $('#exploreAccordionBtn').click(function () {
        $('.accordion-panel').slideToggle();
    });
});
