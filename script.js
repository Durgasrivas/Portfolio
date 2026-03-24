/* ==========================================
   PORTFOLIO — Namani Durga Srivas
   JavaScript: Animations & Interactivity
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========== PRELOADER ==========
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      const elapsedTime = performance.now();
      const delay = Math.max(0, 2000 - elapsedTime);
      
      setTimeout(() => {
        preloader.classList.add('loaded');
        // Optional: remove it from DOM after transition
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, delay);
    }
  });

  // ========== PARTICLES ==========
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 30;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 6) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    particle.style.opacity = 0.1 + Math.random() * 0.4;
    particlesContainer.appendChild(particle);
  }

  // ========== TYPING EFFECT ==========
  const typedElement = document.getElementById('typedText');
  const titles = [
    'Full-Stack Developer',
    'Java Developer',
    'Web Designer',
    'Problem Solver',
    'Tech Enthusiast'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ========== NAVBAR SCROLL ==========
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== ACTIVE NAV LINK ==========
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ========== MOBILE NAV TOGGLE ==========
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========== COUNTER ANIMATION ==========
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const duration = 1500;
        const increment = target / (duration / 30);

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          el.textContent = Math.floor(current) + '+';
        }, 30);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Construct mailto link
    const mailtoLink = `mailto:srivasnetha.147@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    // Show success feedback
    const btn = contactForm.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Opening Email Client...';
    btn.style.background = 'linear-gradient(135deg, #00d4aa, #009977)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });

  // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========== IMAGE MODAL (LIGHTBOX) ==========
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const previewBtns = document.querySelectorAll('.cert-card .btn-preview');

  if (imageModal && modalImg && modalClose) {
    previewBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const wrapper = this.closest('.cert-img-wrapper');
        const img = wrapper.querySelector('img');
        if (img) {
          modalImg.src = img.src;
          imageModal.classList.add('show');
          document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
      });
    });

    const closeModal = () => {
      imageModal.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(() => { modalImg.src = ''; }, 300); // Clear after transition
    };

    modalClose.addEventListener('click', closeModal);

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        closeModal();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // ========== RESUME MODAL ==========
  const btnViewResume = document.getElementById('btnViewResume');
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalClose = document.getElementById('resumeModalClose');

  if (btnViewResume && resumeModal && resumeModalClose) {
    btnViewResume.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    const closeResumeModal = () => {
      resumeModal.classList.remove('show');
      document.body.style.overflow = '';
    };

    resumeModalClose.addEventListener('click', closeResumeModal);

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('show')) {
        closeResumeModal();
      }
    });
  }

});
