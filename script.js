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
});

// --- Below your existing code ---
// For Google invisible reCAPTCHA integration on email/phone reveal:

let infoToReveal = null;

function revealInfo(type) {
    infoToReveal = type;
    if (typeof grecaptcha !== 'undefined') {
        grecaptcha.execute();
    } else {
        alert('reCAPTCHA not loaded. Please try again later.');
    }
}

function recaptchaSolved() {
    if (!infoToReveal) return;

    if (infoToReveal === "email") {
        document.getElementById("email-protected").textContent = "asama017@email.com"; // <-- real email
    } else if (infoToReveal === "phone") {
        document.getElementById("phone-protected").textContent = "+1-613-462-2107"; // <--  real phone number
    }

    // Disable the button after reveal
    const btn = document.querySelector(`button[onclick="revealInfo('${infoToReveal}')"]`);
    if (btn) btn.disabled = true;

    infoToReveal = null;
}
