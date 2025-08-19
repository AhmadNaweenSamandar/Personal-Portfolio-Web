document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');

        // prevent body scrolling when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Sticky navbar on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Floating bitmoji animation
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(el => {
        el.style.animation = `floating ${3 + Math.random() * 3}s ease-in-out infinite`;
    });

    // Initialize recaptcha
    if (typeof grecaptcha !== 'undefined') {
        recaptchaLoaded = true;
    }
});


// For Google invisible reCAPTCHA integration on email/phone reveal:

let infoToReveal = null;
let recaptchaLoaded = false;

// Initialize reCAPTCHA
function onRecaptchaLoad() {
    recaptchaLoaded = true;
}

function revealInfo(type) {
    infoToReveal = type;
    
    if (recaptchaLoaded) {
        grecaptcha.execute();
    } else {
        // Fallback if reCAPTCHA fails to load
        setTimeout(() => {
            if (!recaptchaLoaded) {
                directRevealInfo(type);
            }
        }, 1000);
        alert('Verifying... Please wait a moment.');
    }
}

function recaptchaSolved() {
    if (infoToReveal) {
        directRevealInfo(infoToReveal);
        infoToReveal = null;
    }
}

function directRevealInfo(type) {
    const email = "asama017@email.com"; // Replace with your real email
    const phone = "+1-613-462-2107"; // Replace with your real phone
    
    if (type === "email") {
        document.getElementById("email-protected").textContent = email;
        document.querySelector('button[onclick="revealInfo(\'email\')"]').disabled = true;
    } else if (type === "phone") {
        document.getElementById("phone-protected").textContent = phone;
        document.querySelector('button[onclick="revealInfo(\'phone\')"]').disabled = true;
    }
    
    // Change button text and style after reveal
    const buttons = document.querySelectorAll(`button[onclick="revealInfo('${type}')"]`);
    buttons.forEach(btn => {
        btn.innerHTML = `<i class="fas fa-check"></i> Revealed`;
        btn.style.backgroundColor = '#4CAF50'; // Green color
    });
}
