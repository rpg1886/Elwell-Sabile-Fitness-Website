const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const programCards = document.querySelectorAll('.program-card');
const trialForm = document.querySelector('#trial-form');
const formMessage = document.querySelector('.form-message');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    programCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

trialForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(trialForm).get('name');
  formMessage.textContent = `Thanks, ${name}. We will be in touch to plan your first session.`;
  trialForm.reset();
});
