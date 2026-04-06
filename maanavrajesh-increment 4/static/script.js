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

// Set the 'active' class on the navigation link that matches the current page URL.
function ActiveNav() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav_bar a');

    // Iterate over each link
    navLinks.forEach(link => {
        // Check if the link's href matches the current window location
        if (window.location.href === link.href || 
            window.location.pathname.includes(link.getAttribute('href'))) {
            // Add the 'active' class to highlight the current page
            link.classList.add("active");
        }
    });
}

// Execute the function to set the active navigation link on page load
ActiveNav();

// jQuery Read More / Read Less Toggle
$(document).ready(function(){
    // When the "Read More" button is clicked
    $("#readMore").click(function(){
        $("#longIntro").show();  // Show the long introduction text
        $("#readLess").show();   // Show the "Read Less" button
        $("#readMore").hide();   // Hide the "Read More" button  
    });

    // When the "Read Less" button is clicked
    $("#readLess").click(function(){ 
        $("#longIntro").hide(); // Hide the long introduction text
        $("#readLess").hide();  // Hide the "Read Less" button itself
        $("#readMore").show();  // Show the "Read More" button  
    });
});

// Buy Tickets Page Functions
function showPurchaseForm(date) {
    document.getElementById('purchaseForm').style.display = 'block';
    document.getElementById('selectedDate').value = date;
    // Scroll to form
    document.getElementById('purchaseForm').scrollIntoView({ behavior: 'smooth' });
}

function submitPurchase() {
    alert('Redirecting to payment system.');
}
