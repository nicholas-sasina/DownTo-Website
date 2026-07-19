const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const homePageLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href="index.html"]'));
const homeLinkTargets = Array.from(document.querySelectorAll('.brand[href="index.html"], .nav-links a[href="index.html"]'));

function isHomePage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    return currentPath === 'index.html' || currentPath === '';
}

function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPath === 'index.html' || currentPath === '';

    if (!isHomePage || !navLinks) {
        return;
    }

    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const scrollPosition = window.scrollY + 140;
    let activeId = '';

    sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
            activeId = section.id;
        }
    });

    homePageLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        const targetId = href.replace('#', '');

        link.removeAttribute('aria-current');

        if (href === 'index.html' && !activeId) {
            link.setAttribute('aria-current', 'page');
        } else if (targetId && activeId === targetId) {
            link.setAttribute('aria-current', 'page');
        } else if (href === 'index.html' && activeId === 'main') {
            link.setAttribute('aria-current', 'page');
        }
    });
}

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            navLinks.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

homeLinkTargets.forEach((link) => {
    link.addEventListener('click', (event) => {
        if (!isHomePage()) {
            return;
        }

        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    revealTargets.forEach((target) => observer.observe(target));
} else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
});

let activeStatus;
let statusTimer;
let statusCleanupTimer;

document.querySelectorAll('[aria-disabled="true"][aria-describedby]').forEach((button) => {
    const status = document.getElementById(button.getAttribute('aria-describedby'));

    if (status) {
        button.addEventListener('click', () => {
            window.clearTimeout(statusTimer);
            window.clearTimeout(statusCleanupTimer);

            if (activeStatus && activeStatus !== status) {
                const previousStatus = activeStatus;
                previousStatus.classList.add('no-transition');
                previousStatus.classList.remove('is-visible');
                window.requestAnimationFrame(() => {
                    previousStatus.classList.remove('no-transition');
                });
            }

            status.classList.add('is-visible');
            activeStatus = status;

            statusTimer = window.setTimeout(() => {
                status.classList.remove('is-visible');

                statusCleanupTimer = window.setTimeout(() => {
                    if (activeStatus === status) {
                        activeStatus = undefined;
                    }
                }, 160);
            }, 1500);
        });
    }
});

window.addEventListener('scroll', setActiveNavLink, { passive: true });
window.addEventListener('load', setActiveNavLink);
