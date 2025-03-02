// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });
});

// Project Carousel
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.project-slider');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    let isAutoPlaying = true;
    let autoPlayTimer;
    const totalSlides = slides.length;

    // Clone first and last slides for infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);
    
    // Adjust initial position to show first real slide
    slider.style.transform = `translateX(-${100}%)`;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function transition(enable) {
        slider.style.transition = enable ? 'transform 0.5s ease-in-out' : 'none';
    }
    
    function moveSlides(direction) {
        transition(true);
        currentSlide += direction;
        slider.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;
    }
    
    function handleSlideEnd() {
        transition(false);
        if (currentSlide === -1) {
            currentSlide = totalSlides - 1;
            slider.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;
        } else if (currentSlide === totalSlides) {
            currentSlide = 0;
            slider.style.transform = `translateX(-${100}%)`;
        }
        updateDots();
    }
    
    function startAutoPlay() {
        if (!isAutoPlaying) return;
        autoPlayTimer = setInterval(() => {
            moveSlides(1);
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        moveSlides(-1);
        stopAutoPlay();
        isAutoPlaying = false;
    });
    
    nextBtn.addEventListener('click', () => {
        moveSlides(1);
        stopAutoPlay();
        isAutoPlaying = false;
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            transition(true);
            slider.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;
            updateDots();
            stopAutoPlay();
            isAutoPlaying = false;
        });
    });
    
    slider.addEventListener('transitionend', handleSlideEnd);
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', () => {
        if (isAutoPlaying) startAutoPlay();
    });
    
    // Start auto-play
    startAutoPlay();
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            
            // Show loading state
            submitBtn.classList.add('loading');
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Message sent successfully!';
                    contactForm.appendChild(successMessage);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    throw new Error('Failed to send message');
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.classList.remove('loading');
            }
        });
    }
});
