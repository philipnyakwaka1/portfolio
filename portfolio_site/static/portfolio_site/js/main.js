document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const projectGrid = document.querySelector('.project-grid');
    const cards = projectGrid.querySelectorAll('.project-card');
    const scrollThreshold = 50;
    
    // --- Project Card Load More Variables ---
    let visibleCards = 6;
    const cardsPerLoad = 2; 
    const totalHiddenCards = cards.length - visibleCards;

    // --- About Me "Read More" Variables ---
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreAboutContent = document.getElementById('more-about-content');

    // --- Testimonial Carousel Variables ---
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let testimonialCards = []; 
    let currentSlide = 0;
    let cardWidth = 0; 


    // --- Header Scroll Effect ---
    function updateHeaderBackground() {
        if (window.scrollY > scrollThreshold) {
            header.style.backgroundColor = 'var(--color-dark)';
            header.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)'; 
            header.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.3)';
        }
    }

    window.addEventListener('scroll', updateHeaderBackground);
    updateHeaderBackground(); 


    // --- Mobile Navigation Toggle ---
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            navToggle.innerHTML = '&times;'; 
        } else {
            navToggle.innerHTML = '&#9776;'; 
        }
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '&#9776;';
            }
        });
    });

    // --- About Me "Read More" Logic ---
    if (readMoreBtn && moreAboutContent) {
        // Accessibility attributes
        readMoreBtn.setAttribute('aria-expanded', 'false');
        readMoreBtn.setAttribute('aria-controls', 'more-about-content');

        // Ensure starting state
        moreAboutContent.style.maxHeight = '0px';

        function expandContent() {
            moreAboutContent.classList.add('expanded');
            // Set to scrollHeight to reveal full content
            moreAboutContent.style.maxHeight = moreAboutContent.scrollHeight + 'px';
            readMoreBtn.setAttribute('aria-expanded', 'true');
            readMoreBtn.innerHTML = 'Read less about me <i class="fas fa-arrow-up"></i>';
        }

        function collapseContent() {
            moreAboutContent.classList.remove('expanded');
            moreAboutContent.style.maxHeight = '0px';
            readMoreBtn.setAttribute('aria-expanded', 'false');
            readMoreBtn.innerHTML = 'Read more about me <i class="fas fa-arrow-right"></i>';
        }

        readMoreBtn.addEventListener('click', function() {
            const isExpanded = moreAboutContent.classList.contains('expanded');
            if (isExpanded) {
                collapseContent();
            } else {
                expandContent();
            }
        });

        // Keep height in sync if content wraps differently on resize
        window.addEventListener('resize', () => {
            if (moreAboutContent.classList.contains('expanded')) {
                moreAboutContent.style.maxHeight = moreAboutContent.scrollHeight + 'px';
            }
        });
    }


    // --- Project Card Load More Logic ---
    if (cards.length > visibleCards) {
        for (let i = visibleCards; i < cards.length; i++) {
            cards[i].classList.remove('visible');
            cards[i].classList.add('hidden');
        }
        loadMoreBtn.textContent = `See More Projects (${totalHiddenCards})`;
    } else {
        loadMoreBtn.style.display = 'none'; 
    }

    loadMoreBtn.addEventListener('click', () => {
        const currentlyHidden = projectGrid.querySelectorAll('.project-card.hidden');
        
        for (let i = 0; i < cardsPerLoad; i++) {
            if (currentlyHidden[i]) {
                currentlyHidden[i].classList.remove('hidden');
                currentlyHidden[i].classList.add('visible');
            }
        }

        visibleCards += cardsPerLoad;
        const remainingCards = cards.length - visibleCards;

        if (remainingCards <= 0) {
            loadMoreBtn.textContent = 'All Projects Loaded';
            loadMoreBtn.disabled = true;
        } else {
            loadMoreBtn.textContent = `See More Projects (${remainingCards})`;
        }
    });

    // --- Testimonial Carousel Logic ---
    function initializeCarousel() {
        testimonialCards = Array.from(carousel.children);
        if (testimonialCards.length === 0) return;

        createDots();
        updateCarousel();

        window.addEventListener('resize', () => {
            cardWidth = testimonialCards[0].offsetWidth + (testimonialCards[0].nextElementSibling ? parseFloat(getComputedStyle(carousel).gap) : 0);
            updateCarousel();
        });
        
        cardWidth = testimonialCards[0].offsetWidth + (testimonialCards[0].nextElementSibling ? parseFloat(getComputedStyle(carousel).gap) : 0);
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function updateCarousel() {
        if (!testimonialCards.length) return;

        const carouselWidth = carousel.clientWidth;
        const gap = parseFloat(getComputedStyle(carousel).gap);
        const cardApproxWidth = testimonialCards[0].offsetWidth;
        const cardsPerView = Math.floor((carouselWidth + gap) / (cardApproxWidth + gap));
        
        const maxSlide = testimonialCards.length - cardsPerView;

        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= maxSlide;

        if (currentSlide > maxSlide) {
            currentSlide = maxSlide > 0 ? maxSlide : 0;
        }

        const scrollPosition = currentSlide * (cardApproxWidth + gap);
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateDots();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const carouselWidth = carousel.clientWidth;
        const gap = parseFloat(getComputedStyle(carousel).gap);
        const cardApproxWidth = testimonialCards[0].offsetWidth;
        const cardsPerView = Math.floor((carouselWidth + gap) / (cardApproxWidth + gap));
        const maxSlide = testimonialCards.length - cardsPerView;

        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });

    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const newCurrentSlide = Math.round(scrollLeft / (cardWidth || 1)); 
        if (newCurrentSlide !== currentSlide) {
            currentSlide = newCurrentSlide;
            updateDots();
        }
    }, { passive: true });

    initializeCarousel(); 


    // --- Contact Form Submission Logic (Frontend only) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());

            formStatus.classList.remove('success', 'error');
            formStatus.style.opacity = '1';
            formStatus.textContent = 'Sending message...';

            try {
                // *** IMPORTANT: REPLACE THIS PLACEHOLDER WITH A REAL BACKEND ENDPOINT ***
                // E.g., a serverless function, Netlify Forms, or Formspree URL.
                
                // Simulating a successful backend response after a delay
                await new Promise(resolve => setTimeout(resolve, 1500)); 
                formStatus.classList.add('success');
                formStatus.textContent = 'Message sent successfully! I will get back to you shortly.';
                this.reset(); 

            } catch (error) {
                console.error('Form submission error:', error);
                formStatus.classList.add('error');
                formStatus.textContent = 'An unexpected error occurred. Please try again later.';
            } finally {
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                }, 5000);
            }
        });
    }
});