document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('year-span');
    yearSpan.textContent = currentYear;
});

console.log("Thanks for checking out my website");
