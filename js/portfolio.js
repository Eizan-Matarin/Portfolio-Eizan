document.addEventListener('DOMContentLoaded', () => {
  // Inicializa AOS si está disponible
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.body.classList.remove('nav-open');
        }
      }
    });
  });

  // Fade-in con IntersectionObserver
  const faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && faders.length) {
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });

    faders.forEach(fader => appearOnScroll.observe(fader));
  }

  // Accesibilidad: enfocar el contenido principal al navegar con anclas
  window.addEventListener('hashchange', () => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus();
      }
    }
  });
});