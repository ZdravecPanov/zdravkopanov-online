const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navLinks');

const setActiveLink = () => {
  let activeIdx = 0;
  sections.forEach((section, index) => {
    if (window.scrollY + 160 >= section.offsetTop) {
      activeIdx = index;
    }
  });
  navLinks.forEach((link, index) => {
    link.classList.toggle('active', index === activeIdx);
  });
};

const toggleMenu = () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
};

if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

const cvBtn = document.getElementById('cvBtn');
const cvModal = document.getElementById('cvModal');
const closeCV = document.getElementById('closeCV');

if (cvBtn && cvModal && closeCV) {
  cvBtn.addEventListener('click', () => {
    cvModal.style.display = 'flex';
  });

  closeCV.addEventListener('click', () => {
    cvModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === cvModal) {
      cvModal.style.display = 'none';
    }
  });
}
