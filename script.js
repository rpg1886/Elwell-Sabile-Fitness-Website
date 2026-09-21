const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const programCards = document.querySelectorAll('.program-card');
const choosePlanLinks = document.querySelectorAll('.choose-plan');
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
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    programCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

choosePlanLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const program = trialForm.querySelector('select[name="program"]');
    const planMap = {
      'Day Pass': 'Build Strong',
      'Monthly Unlimited': 'Engine Room',
      'Personal Coaching': 'One on One'
    };
    program.value = planMap[link.dataset.plan] || '';
  });
});

trialForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(trialForm);
  const name = formData.get('name');
  const accessKey = formData.get('access_key') || '';

  const showConfirmation = () => {
    formMessage.textContent = `Thanks, ${name}. We will be in touch to plan your first session.`;
    trialForm.reset();
  };

  // Web3Forms access key has not been configured yet, so keep the local confirmation only.
  if (!accessKey || accessKey.startsWith('YOUR_')) {
    showConfirmation();
    return;
  }

  formMessage.textContent = 'Sending...';
  fetch(trialForm.action, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showConfirmation();
      } else {
        formMessage.textContent = 'Something went wrong. Please message us on Messenger instead.';
      }
    })
    .catch(() => {
      formMessage.textContent = 'Something went wrong. Please message us on Messenger instead.';
    });
});
