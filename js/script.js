document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switch --- //
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    function updateThemeIcon() {
        if (body.classList.contains('dark-mode')) {
            themeSwitch.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon
        } else {
            themeSwitch.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon
        }
    }

    // Set initial theme to dark
    body.classList.add('dark-mode');
    updateThemeIcon();

    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateThemeIcon();
    });

    // --- Smooth Scroll --- //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = href === "#" ? document.body : document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Header Scroll Behavior --- //
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            // Scrolling Down
            header.classList.add('header--hidden');
        } else {
            // Scrolling Up
            header.classList.remove('header--hidden');
        }
        lastScrollY = window.scrollY;
    });

    // --- Skill Item Accordion --- //
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close other open items
            skillItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
        // Allow keyboard navigation
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                item.click();
            }
        });
    });

    // --- Section Fade-in Animation --- //
    const fadeInElements = document.querySelectorAll('.section');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // --- Hamburger Menu --- //
    const navToggle = document.querySelector('.nav-toggle');
    const globalNav = document.querySelector('.global-nav');

    navToggle.addEventListener('click', () => {
        globalNav.classList.toggle('is-active');
        navToggle.classList.toggle('is-active');
        document.body.classList.toggle('no-scroll'); // Add/remove no-scroll class
    });

    // --- To Top Button --- //
    const toTopBtn = document.getElementById('to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.add('is-visible');
        } else {
            toTopBtn.classList.remove('is-visible');
        }
    });

    toTopBtn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});