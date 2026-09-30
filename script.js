/* ============================================================
   Hotel Golden Hills — Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── -1. Cinematic Smooth Scrolling (Lenis) ──
  // Checks if Lenis is loaded via CDN
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2, // Snappier duration, less 'laggy' feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
  // ── Element References ──
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  // ── 0. Set Video Playback Speed ──
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.playbackRate = 0.75;
  }

  const heroSlide1 = document.getElementById('hero-slide-1');
  const heroSlide2 = document.getElementById('hero-slide-2');
  const heroScroll = document.getElementById('hero-scroll');
  const btnBookOpen = document.getElementById('btn-book-open');
  const mobileBookBtn = document.getElementById('mobile-book-btn');
  const bookingOverlay = document.getElementById('booking-overlay');
  const bookingPopup = document.getElementById('booking-popup');
  const bookingClose = document.getElementById('booking-close');
  const roomsCarousel = document.getElementById('rooms-carousel');
  const roomsPrev = document.getElementById('rooms-prev');
  const roomsNext = document.getElementById('rooms-next');
  const roomsDots = document.getElementById('rooms-dots');

  // ── 1. Sticky Header & Side Nav ──
  const sideNav = document.getElementById('side-nav');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    // Trigger after scrolling past most of the hero section
    const triggerPoint = window.innerHeight * 0.7; 

    if (scrollY > triggerPoint) {
      header.classList.add('scrolled');
      if (sideNav) sideNav.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      if (sideNav) sideNav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // initial check

  // ── 2. Mobile Menu ──
  function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // ── 3. Hero Video / Image Fallback ──
  let heroUsingVideo = true;
  let heroSlideIndex = 0;
  let heroInterval;

  function startHeroImageSlideshow() {
    heroUsingVideo = false;
    if (heroVideo) heroVideo.style.display = 'none';
    heroSlide1.classList.add('active');

    heroInterval = setInterval(() => {
      heroSlideIndex = heroSlideIndex === 0 ? 1 : 0;
      heroSlide1.classList.toggle('active', heroSlideIndex === 0);
      heroSlide2.classList.toggle('active', heroSlideIndex === 1);
    }, 8000);
  }

  if (heroVideo) {
    heroVideo.addEventListener('error', startHeroImageSlideshow);

    // If video doesn't start playing within 3 seconds, fallback
    setTimeout(() => {
      if (heroVideo.readyState < 2 && heroUsingVideo) {
        startHeroImageSlideshow();
      }
    }, 3000);

    // Hide fallback slides if video is playing
    heroVideo.addEventListener('playing', () => {
      if (heroUsingVideo) {
        heroSlide1.style.display = 'none';
        heroSlide2.style.display = 'none';
      }
    });
  } else {
    startHeroImageSlideshow();
  }

  // ── 4. Hero Scroll Indicator ──
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const welcome = document.getElementById('welcome');
      if (welcome) {
        welcome.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ── 5. Booking Popup ──
  function openBooking() {
    bookingOverlay.classList.add('active');
    bookingPopup.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');

    if (checkin && !checkin.value) {
      checkin.value = formatDate(today);
    }
    if (checkout && !checkout.value) {
      checkout.value = formatDate(tomorrow);
    }
  }

  function closeBooking() {
    bookingOverlay.classList.remove('active');
    bookingPopup.classList.remove('active');
    document.body.style.overflow = '';
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  if (btnBookOpen) btnBookOpen.addEventListener('click', (e) => { e.preventDefault(); openBooking(); });
  if (mobileBookBtn) mobileBookBtn.addEventListener('click', (e) => { e.preventDefault(); openBooking(); if (mobileNav.classList.contains('open')) toggleMobileMenu(); });
  if (bookingClose) bookingClose.addEventListener('click', closeBooking);
  if (bookingOverlay) bookingOverlay.addEventListener('click', closeBooking);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingPopup.classList.contains('active')) closeBooking();
      if (mobileNav.classList.contains('open')) toggleMobileMenu();
    }
  });

  // Booking form submit
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your reservation request! Our team will contact you shortly to confirm your booking.');
      closeBooking();
    });
  }

  // ── 6. Rooms Carousel ──
  let currentRoomIndex = 0;

  function getCardWidth() {
    const card = roomsCarousel.querySelector('.room-card');
    if (!card) return 0;
    const style = window.getComputedStyle(roomsCarousel);
    const gap = parseInt(style.gap) || 24;
    return card.offsetWidth + gap;
  }

  function scrollToRoom(index) {
    const cards = roomsCarousel.querySelectorAll('.room-card');
    const maxIndex = cards.length - 1;
    currentRoomIndex = Math.max(0, Math.min(index, maxIndex));

    roomsCarousel.scrollTo({
      left: currentRoomIndex * getCardWidth(),
      behavior: 'smooth'
    });

    updateDots();
  }

  function updateDots() {
    const dots = roomsDots.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentRoomIndex);
    });
  }

  if (roomsPrev) {
    roomsPrev.addEventListener('click', () => scrollToRoom(currentRoomIndex - 1));
  }

  if (roomsNext) {
    roomsNext.addEventListener('click', () => scrollToRoom(currentRoomIndex + 1));
  }

  if (roomsDots) {
    roomsDots.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) {
        const index = parseInt(dot.dataset.index);
        scrollToRoom(index);
      }
    });
  }

  // Update dots on manual scroll
  if (roomsCarousel) {
    let scrollTimeout;
    roomsCarousel.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cardWidth = getCardWidth();
        if (cardWidth > 0) {
          currentRoomIndex = Math.round(roomsCarousel.scrollLeft / cardWidth);
          updateDots();
        }
      }, 100);
    }, { passive: true });
  }


  // ── 8. Smooth Scroll for Nav Links ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── 9. Newsletter Form ──
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert('Thank you for subscribing! You will receive our latest updates and exclusive offers.');
        emailInput.value = '';
      }
    });
  }

  // ── 10. Parallax on Welcome Image ──
  const welcomeImage = document.querySelector('.welcome-image img');

  if (welcomeImage) {
    window.addEventListener('scroll', () => {
      const rect = welcomeImage.parentElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const translateY = (progress - 0.5) * -30;
        welcomeImage.style.transform = `translateY(${translateY}px) scale(1.05)`;
      }
    }, { passive: true });
  }

  // ── 11. Active nav link highlighting ──
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    const scrollY = window.scrollY + header.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Highlight top nav (if visible)
        document.querySelectorAll('.header-nav-left a, .header-nav-right a:not(.btn-book)').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = '#C5A880';
          }
        });

        // Highlight side nav
        document.querySelectorAll('.side-nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ── 12. Scroll Progress Bar ──
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.height = scrollPercent + '%';
    }, { passive: true });
  }

  // ── 13. Global Smooth Parallax (Window Cutout Effect) ──
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;

      parallaxElements.forEach((el) => {
        // We calculate position based on the parent container to know when it's in view
        // If it's an image, the parent is the cutout window. If it's text, it's the element itself.
        const container = el.tagName.toLowerCase() === 'img' ? el.parentElement : el;
        const rect = container.getBoundingClientRect();

        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const speed = parseFloat(el.getAttribute('data-parallax')) || -100;
          
          const moveY = (progress - 0.5) * speed;
          el.style.transform = `translateY(${moveY}px)`;
        }
      });
    }, { passive: true });
  }

});
