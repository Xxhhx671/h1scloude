(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ─── hero entrance ───────────────────────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
    .to('#hero-title',   { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to('#hero-subtitle',{ opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('#hero-tags',    { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('#hero-cta',     { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('#hero-scroll',  { opacity: 1, duration: 0.6 }, '-=0.2');

  // letter stagger on h1
  gsap.set('#hero-title', { perspective: 400 });
  const titleChars = document.querySelectorAll('#hero-title .hero__title-line');
  if (titleChars.length) {
    gsap.from(titleChars, {
      opacity: 0, rotateX: -90, transformOrigin: '50% 50% -30px',
      stagger: 0.06, duration: 1, ease: 'back.out(1.5)', delay: 0.5
    });
  }

  // ─── nav scroll ──────────────────────────────────────────────
  ScrollTrigger.create({
    start: 'top -60',
    onEnter:     () => document.getElementById('nav').classList.add('scrolled'),
    onLeaveBack: () => document.getElementById('nav').classList.remove('scrolled')
  });

  // ─── stats counter ───────────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-item__num');

  ScrollTrigger.create({
    trigger: '.stats',
    start: 'top 85%',
    once: true,
    onEnter() {
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        gsap.to({ val: 0 }, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].val); }
        });
      });
    }
  });

  // ─── card scroll reveals ─────────────────────────────────────
  function revealCards(selector) {
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return;
    gsap.from(cards, {
      scrollTrigger: { trigger: selector, start: 'top 85%', once: true },
      opacity: 0, y: 40, stagger: 0.08, duration: 0.7, ease: 'power3.out'
    });
  }
  revealCards('#tab-it .card');
  revealCards('#tab-cs2 .card');
  revealCards('.portfolio-item');

  // ─── section headers ─────────────────────────────────────────
  document.querySelectorAll('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      opacity: 0, y: 24, duration: 0.8, ease: 'power3.out'
    });
  });

  // ─── contact section ─────────────────────────────────────────
  gsap.from('.contact__link-item', {
    scrollTrigger: { trigger: '.contact__info', start: 'top 85%', once: true },
    opacity: 0, x: -30, stagger: 0.1, duration: 0.7, ease: 'power3.out'
  });
  gsap.from('.contact__form .form-group', {
    scrollTrigger: { trigger: '.contact__form', start: 'top 85%', once: true },
    opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power3.out'
  });

  // ─── card tilt effect (3D) ───────────────────────────────────
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = ((e.clientY - cy) / (rect.height / 2)) * -6;
      const ry   = ((e.clientX - cx) / (rect.width  / 2)) *  6;

      gsap.to(card, {
        rotateX: rx, rotateY: ry,
        duration: 0.4, ease: 'power2.out',
        transformPerspective: 800
      });

      // track mouse pos for radial gradient
      const px = ((e.clientX - rect.left) / rect.width)  * 100;
      const py = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', px + '%');
      card.style.setProperty('--my', py + '%');
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0,
        duration: 0.6, ease: 'elastic.out(1, 0.6)',
        transformPerspective: 800
      });
    });
  });

  // ─── hero bg grid parallax ───────────────────────────────────
  gsap.to('.hero__bg-grid', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    y: 80, ease: 'none'
  });

  // ─── footer reveal ───────────────────────────────────────────
  gsap.from('.footer__inner > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 95%', once: true },
    opacity: 0, y: 16, stagger: 0.1, duration: 0.6, ease: 'power2.out'
  });

})();
