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
class ProjectCarousel {
    constructor() {
        this.slider = document.querySelector('.project-slider');
        this.slides = document.querySelectorAll('.project-slide');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.currentSlide = 0;
        this.isTransitioning = false; // Prevent rapid clicking
        
        this.init();
    }

    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
                this.slides[0].classList.add('active');
            }
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        // Add button listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Add touch support
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        this.slider.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            if (this.touchStartX - this.touchEndX > 50) this.nextSlide();
            if (this.touchStartX - this.touchEndX < -50) this.prevSlide();
        });

        // Auto play with longer interval
        this.startAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 6000); // Longer interval (6 seconds)
        
        // Pause on hover
        this.slider.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        this.slider.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        if (this.isTransitioning) return; // Prevent rapid transitions
        this.isTransitioning = true;
        
        this.currentSlide = index;
        this.slider.style.transform = `translateX(-${index * 100}%)`;
        this.updateDots();
        this.updateSlides();

        // Reset transition lock after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800); // Match this with CSS transition duration
    }

    nextSlide() {
        if (!this.isTransitioning) {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(this.currentSlide);
        }
    }

    prevSlide() {
        if (!this.isTransitioning) {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(this.currentSlide);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.project-carousel')) {
        new ProjectCarousel();
    }
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
