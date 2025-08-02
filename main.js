// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Send email using EmailJS
        emailjs.send(
            'service_4fu9f6r', // Replace with your EmailJS service ID
            'template_pemdu6h', // Replace with your EmailJS template ID
            {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'ayushmanpress23@gmail.com', // Your email address
            }
        ).then(
            function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            },
            function(error) {
                console.log('FAILED...', error);
                alert('Oops! Something went wrong. Please try again later.');
            }
        ).finally(() => {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
}

// Scroll-based animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .product-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Mobile menu toggle (if needed in the future)
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        const menuButton = document.createElement('button');
        menuButton.classList.add('mobile-menu-button');
        menuButton.innerHTML = '☰';
        
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        
        nav.insertBefore(menuButton, navLinks);
    }
};

// Only create mobile menu for smaller screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add scroll-based header styling
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
}
