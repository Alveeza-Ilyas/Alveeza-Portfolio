/**
 * Alveeza Ilyas Portfolio — script.js
 * Handles navigation, scroll animations, and form validation.
 */

(function () {
  'use strict';

  /* ==========================================================
     DOM References
     ========================================================== */
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const yearEl = document.getElementById('year');

  /* ==========================================================
     Theme toggle — injected so the existing markup stays stable
     ========================================================== */
  const themeToggle = document.createElement('button');
  const themeStorageKey = 'alveeza-theme';
  themeToggle.type = 'button';
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-pressed', 'false');

  function setTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.innerHTML = isLight
      ? '<i class="fa-solid fa-moon" aria-hidden="true"></i><span>Dark</span>'
      : '<i class="fa-solid fa-sun" aria-hidden="true"></i><span>Light</span>';
  }

  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem(themeStorageKey) || 'dark';
  } catch (err) {
    /* Private browsing can block localStorage; dark mode remains the fallback. */
  }

  setTheme(savedTheme);
  themeToggle.addEventListener('click', function () {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch (err) {
      /* Theme still applies for the current page when storage is unavailable. */
    }
  });

  if (header) {
    header.querySelector('.nav').appendChild(themeToggle);
  }

  /* ==========================================================
     Footer — dynamic year
     ========================================================== */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================
     Sticky header shadow on scroll
     ========================================================== */
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ==========================================================
     Mobile hamburger menu
     ========================================================== */
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

    /* Prevent body scroll when menu is open */
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMenu);

  /* Close menu when a nav link is clicked */
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  /* ==========================================================
     Active nav link highlighting on scroll
     ========================================================== */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveLink() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink, { passive: true });
  highlightActiveLink();

  /* ==========================================================
     Intersection Observer — scroll reveal animations
     ========================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback for browsers without IntersectionObserver */
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ==========================================================
     Contact form — client-side validation
     ========================================================== */
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    /**
     * Validate a single field and update its error display.
     * @returns {boolean} Whether the field is valid.
     */
    function validateField(input, errorEl, rules) {
      const value = input.value.trim();
      let message = '';

      if (rules.required && !value) {
        message = 'This field is required.';
      } else if (rules.minLength && value.length < rules.minLength) {
        message = 'Must be at least ' + rules.minLength + ' characters.';
      } else if (rules.pattern && !rules.pattern.test(value)) {
        message = rules.patternMessage || 'Invalid format.';
      }

      errorEl.textContent = message;
      input.classList.toggle('error', message !== '');
      input.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');

      return message === '';
    }

    /* Real-time validation on blur */
    nameInput.addEventListener('blur', function () {
      validateField(nameInput, nameError, { required: true, minLength: 2 });
    });

    emailInput.addEventListener('blur', function () {
      validateField(emailInput, emailError, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: 'Please enter a valid email address.',
      });
    });

    messageInput.addEventListener('blur', function () {
      validateField(messageInput, messageError, { required: true, minLength: 1 });
    });

    /* Clear error styling on input */
    [nameInput, emailInput, messageInput].forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('error');
        const errorEl = document.getElementById(input.id + '-error');
        if (errorEl) errorEl.textContent = '';
      });
    });

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, { required: true, minLength: 2 });
      const isEmailValid = validateField(emailInput, emailError, {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: 'Please enter a valid email address.',
      });
      const isMessageValid = validateField(messageInput, messageError, { required: true, minLength: 1 });

      if (isNameValid && isEmailValid && isMessageValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

        try {
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
          }

          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: nameInput.value.trim(),
              email: emailInput.value.trim(),
              message: messageInput.value.trim(),
            }),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            formSuccess.hidden = false;
            formSuccess.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
            contactForm.reset();

            setTimeout(function () {
              formSuccess.hidden = true;
            }, 6000);
          } else {
            alert(data.error || 'Failed to send message. Please try again later.');
          }
        } catch (err) {
          console.error('Contact Form Submit Error:', err);
          alert('An error occurred while sending your message. Please try again.');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        }
      } else {
        /* Focus the first invalid field */
        const firstInvalid = contactForm.querySelector('.error');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  /* ==========================================================
     Smooth scroll for anchor links (enhanced)
     ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================
     1. Scroll Progress Bar
     ========================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress');
  function handleScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }
  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  /* ==========================================================
     2. Dynamic Role Typewriter in Hero
     ========================================================== */
  const typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    const roles = [
      'Web Development',
      'Machine Learning & AI',
      'UI/UX Design',
      'Full-Stack Engineering',
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;
    let typeDelay = 2000;

    function tickTypewriter() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typewriterEl.textContent = currentRole.substring(0, charIndex);
        typeDelay = 45;
      } else {
        charIndex++;
        typewriterEl.textContent = currentRole.substring(0, charIndex);
        typeDelay = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeDelay = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(tickTypewriter, typeDelay);
    }

    setTimeout(tickTypewriter, 2000);
  }

  /* ==========================================================
     3. Interactive Hero Canvas (Particle Constellation)
     ========================================================== */
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas && window.matchMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroCanvas.parentElement.offsetWidth);
    let height = (heroCanvas.height = heroCanvas.parentElement.offsetHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 24), 45);
    const mouse = { x: null, y: null, maxDist: 110 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 1.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            const force = (mouse.maxDist - dist) / mouse.maxDist;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        const isLight = document.documentElement.dataset.theme === 'light';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(37, 99, 235, 0.6)' : 'rgba(114, 230, 255, 0.65)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isHeroVisible = true;
    let animationFrameId = null;

    function animateParticles() {
      if (!isHeroVisible) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.dataset.theme === 'light';
      const maxConnectDist = 110;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * (isLight ? 0.12 : 0.2);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLight
              ? `rgba(37, 99, 235, ${alpha})`
              : `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    if ('IntersectionObserver' in window) {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              isHeroVisible = entry.isIntersecting;
              if (isHeroVisible && !animationFrameId) {
                animateParticles();
              } else if (!isHeroVisible && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
              }
            });
          },
          { threshold: 0.05 }
        );
        heroObserver.observe(heroSection);
      }
    } else {
      animateParticles();
    }

    heroCanvas.addEventListener('mousemove', function (e) {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroCanvas.addEventListener('mouseleave', function () {
      mouse.x = null;
      mouse.y = null;
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!heroCanvas.parentElement) return;
        width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
        height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
      }, 150);
    });
  }

  /* ==========================================================
     4. Interactive Project Category Filter Tabs
     ========================================================== */
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.projects__grid .project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        filterButtons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        projectCards.forEach(function (card) {
          const category = card.getAttribute('data-category') || '';
          const matches = filter === 'all' || category.split(' ').includes(filter);

          if (matches) {
            card.classList.remove('filter-collapse');
            requestAnimationFrame(function () {
              card.classList.remove('filter-hide');
            });
          } else {
            card.classList.add('filter-hide');
            setTimeout(function () {
              if (card.classList.contains('filter-hide')) {
                card.classList.add('filter-collapse');
              }
            }, 300);
          }
        });
      });
    });
  }

  /* ==========================================================
     5. 3D Tilt & Interactive Spotlight Glow on Project Cards
     ========================================================== */
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isFinePointer && projectCards.length) {
    projectCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ==========================================================
     6. Quick One-Click Email Copy & Toast Notification
     ========================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailValEl = document.getElementById('contact-email-val');
  const toastEl = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    if (!toastEl) return;
    const msgEl = document.getElementById('toast-msg');
    if (msgEl && msg) msgEl.textContent = msg;

    toastEl.classList.add('show');
    toastEl.setAttribute('aria-hidden', 'false');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
      toastEl.setAttribute('aria-hidden', 'true');
    }, 3500);
  }

  if (copyEmailBtn && emailValEl) {
    copyEmailBtn.addEventListener('click', async function () {
      const email = emailValEl.textContent.trim();
      let copied = false;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch (err) {
          copied = false;
        }
      }

      if (!copied) {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          copied = document.execCommand('copy');
        } catch (e) {
          copied = false;
        }
        document.body.removeChild(tempInput);
      }

      if (copied) {
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
        showToast('Email address copied to clipboard!');

        setTimeout(function () {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i>';
        }, 2500);
      } else {
        showToast('Could not copy email automatically.');
      }
    });
  }

})();

