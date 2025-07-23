// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change hamburger icon to X when menu is open
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Counter animation for cricket stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/[^\d.]/g, ''));
        
        if (numericTarget) {
            let current = 0;
            const increment = numericTarget / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    if (target.includes('+')) {
                        counter.textContent = Math.floor(current) + '+';
                    } else if (target.includes('.')) {
                        counter.textContent = current.toFixed(1);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }
            }, 50);
        }
    });
};

// Trigger counter animation when cricket section is visible
const cricketSection = document.querySelector('#cricket');
const cricketObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            cricketObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (cricketSection) {
    cricketObserver.observe(cricketSection);
}

// Button click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Get In Touch button
    const getInTouchBtns = document.querySelectorAll('.btn-primary');
    getInTouchBtns.forEach(btn => {
        if (btn.textContent.includes('Get In Touch') || btn.textContent.includes('Send Email')) {
            btn.addEventListener('click', () => {
                window.location.href = 'mailto:alex.johnson@email.com?subject=Hello Alex&body=Hi Alex, I would like to connect with you.';
            });
        }
    });
    
    // Call Now button
    const callBtns = document.querySelectorAll('.btn');
    callBtns.forEach(btn => {
        if (btn.textContent.includes('Call Now')) {
            btn.addEventListener('click', () => {
                window.location.href = 'tel:+919876543210';
            });
        }
    });
    
    // View Cricket Stats button
    const cricketStatsBtns = document.querySelectorAll('.btn');
    cricketStatsBtns.forEach(btn => {
        if (btn.textContent.includes('View Cricket Stats')) {
            btn.addEventListener('click', () => {
                document.querySelector('#cricket').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
    
    // View Map button
    const mapBtns = document.querySelectorAll('.btn');
    mapBtns.forEach(btn => {
        if (btn.textContent.includes('View Map')) {
            btn.addEventListener('click', () => {
                window.open('https://maps.google.com/?q=Mumbai,Maharashtra,India', '_blank');
            });
        }
    });
});

// Social links functionality
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.textContent.toLowerCase();
            
            switch(platform) {
                case 'linkedin':
                    window.open('https://linkedin.com/in/alexjohnson', '_blank');
                    break;
                case 'github':
                    window.open('https://github.com/alexjohnson', '_blank');
                    break;
                case 'twitter':
                    window.open('https://twitter.com/alexjohnson', '_blank');
                    break;
            }
        });
    });
});

// Typing effect for hero title (optional enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const profileImg = document.querySelector('.profile-img');
    
    if (heroSection && profileImg) {
        const rate = scrolled * -0.5;
        profileImg.style.transform = `translateY(${rate}px)`;
    }
});

// Form validation (if contact form is added later)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Add CSS class for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #ea580c !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('🏏 Welcome to Alex Johnson\'s Portfolio! 🏏');
console.log('Built with HTML, CSS, and JavaScript');
console.log('Feel free to explore the code and get in touch!');