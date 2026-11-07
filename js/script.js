document.documentElement.classList.add('js-enabled');

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
        const details = item.querySelector('.skill-details');
        const detailsId = details.id || `skill-details-${Array.from(skillItems).indexOf(item) + 1}`;
        details.id = detailsId;
        item.setAttribute('role', 'button');
        item.setAttribute('aria-controls', detailsId);
        item.setAttribute('aria-expanded', 'false');
        item.setAttribute('aria-label', `${item.querySelector('.skill-header p').textContent.trim()}の詳細`);
        details.setAttribute('aria-hidden', 'true');

        const setExpanded = expanded => {
            item.classList.toggle('active', expanded);
            item.setAttribute('aria-expanded', String(expanded));
            details.setAttribute('aria-hidden', String(!expanded));
        };

        item.addEventListener('click', () => {
            // Close other open items
            skillItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.skill-details').setAttribute('aria-hidden', 'true');
                }
            });
            // Toggle current item
            setExpanded(!item.classList.contains('active'));
        });
        // Allow keyboard navigation
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // --- Section Fade-in Animation --- //
    const fadeInElements = document.querySelectorAll('.section');
    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeInElements.forEach(element => fadeInObserver.observe(element));
    } else {
        fadeInElements.forEach(element => element.classList.add('is-visible'));
    }

    // --- Hamburger Menu --- //
    const navToggle = document.querySelector('.nav-toggle');
    const globalNav = document.querySelector('.global-nav');

    navToggle.addEventListener('click', () => {
        const isOpen = !globalNav.classList.contains('is-active');
        globalNav.classList.toggle('is-active', isOpen);
        navToggle.classList.toggle('is-active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('no-scroll', isOpen);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && globalNav.classList.contains('is-active')) {
            globalNav.classList.remove('is-active');
            navToggle.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            navToggle.focus();
        }
    });

    // --- Close Hamburger Menu on Link Click --- //
    const navLinks = document.querySelectorAll('.global-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            globalNav.classList.remove('is-active');
            navToggle.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        });
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
