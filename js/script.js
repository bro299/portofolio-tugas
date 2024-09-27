// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active nav item and header shrink on scroll
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Shrink header on scroll down, expand on scroll up
    if (scrollTop > lastScrollTop) {
        header.style.padding = '10px 0';
    } else {
        header.style.padding = '15px 0';
    }
    lastScrollTop = scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('show');
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const barBottom = bar.getBoundingClientRect().bottom;
        if (barTop >= 0 && barBottom <= window.innerHeight) {
            bar.style.width = bar.parentElement.nextElementSibling.textContent;
        }
    });
}

// Typewriter effect for home section
const typeWriter = (element, text, speed) => {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

const homeTitle = document.querySelector('#home h1');
const homeSubtitle = document.querySelector('#home p');

// Smooth reveal animation for sections
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

// Initialize animations on load
window.addEventListener('load', () => {
    typeWriter(homeTitle, 'Muhammad Nauval Haidar', 100);
    setTimeout(() => {
        typeWriter(homeSubtitle, 'Web Developer | Networking Enthusiast', 50);
    }, 2500);

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    animateSkillBars();
});

// Refresh animations on scroll
window.addEventListener('scroll', () => {
    animateSkillBars();
});

// Add this new code for video selection
const videoSelect = document.getElementById('video-select');
const backgroundVideo = document.getElementById('background-video');

videoSelect.addEventListener('change', (event) => {
    const selectedVideo = event.target.value;
    backgroundVideo.src = selectedVideo;
    backgroundVideo.load();
    backgroundVideo.play();
});