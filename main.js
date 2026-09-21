(function () {
  'use strict';

  // ─── кастомный курсор ───────────────────────────────────────
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let fx = 0, fy = 0, mx = 0, my = 0;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    (function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateFollower);
    })();

    document.querySelectorAll('a, button, [data-tilt], .tab-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform   += ' scale(1.5)';
      });
    });
  }

  // ─── вкладки ────────────────────────────────────────────────
  const tabBtns     = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
      tabContents.forEach(c => {
        c.classList.remove('tab-content--active');
        c.style.display = 'none';
      });

      btn.classList.add('tab-btn--active');
      const content = document.getElementById('tab-' + target);
      if (content) {
        content.style.display = 'block';
        content.classList.add('tab-content--active');

        // переанимировать карточки в новой вкладке
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(
            content.querySelectorAll('.card, .portfolio-item'),
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' }
          );
        }
      }
    });
  });

  // инит: скрыть все кроме первого
  tabContents.forEach((c, i) => {
    c.style.display = i === 0 ? 'block' : 'none';
  });

  // ─── мобильный бургер ────────────────────────────────────────
  const burger    = document.getElementById('burger');
  const navLinks  = document.querySelector('.nav__links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.cssText = open
        ? ''
        : 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(8,8,8,0.97);padding:1.5rem 2rem;gap:1.5rem;border-bottom:1px solid rgba(255,255,255,0.07);z-index:99;backdrop-filter:blur(20px)';

      const spans = burger.querySelectorAll('span');
      if (!open) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    // закрыть при клике на ссылку
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.style.cssText = '';
        burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ─── плавный скролл по якорям ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─── форма контакта ─────────────────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Отправлено';
      btn.style.background = '#00ff88';
      btn.style.color = '#000';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ─── активная ссылка в nav при скролле ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__link');

  function onScroll() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--text)'
        : '';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

})();
