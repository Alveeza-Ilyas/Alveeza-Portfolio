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

})();

