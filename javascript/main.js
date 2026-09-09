const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('.section')];

function setActive(id) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

const observer = new IntersectionObserver(
  entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  },
  {
    rootMargin: '-20% 0px -60% 0px',
    threshold: [0.05, 0.2, 0.5]
  }
);

sections.forEach(section => observer.observe(section));

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(target.id);
  });
});
