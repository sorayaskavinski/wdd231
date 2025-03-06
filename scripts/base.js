document.getElementById('year').textContent = new Date().getFullYear();

const lastModifiedDate = new Date(document.lastModified);
document.getElementById('lastModified').textContent =
    `Last Updated: ${lastModifiedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })}`;

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    const isVisible = navMenu.classList.toggle('visible');
    hamburger.setAttribute('aria-expanded', isVisible.toString());
    hamburger.textContent = isVisible ? '✖' : '☰';
});
