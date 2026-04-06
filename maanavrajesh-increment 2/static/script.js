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