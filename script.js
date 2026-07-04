document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lenis Smooth Scrolling Setup ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate GSAP ScrollTrigger with Lenis
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        lenis.on('scroll', ScrollTrigger.update);
        
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        
        gsap.ticker.lagSmoothing(0, 0);

        // --- 2. GSAP Animations ---
        
        // Setup initial states for elements
        gsap.set('.reveal-up', { y: 50, autoAlpha: 0 });
        gsap.set('.reveal-left', { x: -50, autoAlpha: 0 });
        gsap.set('.reveal-right', { x: 50, autoAlpha: 0 });
        gsap.set('.reveal-scale', { scale: 0.8, autoAlpha: 0 });
        gsap.set('.reveal-fade', { autoAlpha: 0 });

        // Batch animations for better performance
        ScrollTrigger.batch('.reveal-up', {
            onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }),
            once: true
        });

        ScrollTrigger.batch('.reveal-left', {
            onEnter: batch => gsap.to(batch, { x: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }),
            once: true
        });

        ScrollTrigger.batch('.reveal-right', {
            onEnter: batch => gsap.to(batch, { x: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }),
            once: true
        });

        ScrollTrigger.batch('.reveal-scale', {
            onEnter: batch => gsap.to(batch, { scale: 1, autoAlpha: 1, stagger: 0.15, duration: 1, ease: "back.out(1.5)" }),
            once: true
        });

        ScrollTrigger.batch('.reveal-fade', {
            onEnter: batch => gsap.to(batch, { autoAlpha: 1, stagger: 0.15, duration: 1, ease: "power2.out" }),
            once: true
        });
        
        // Parallax effects for blobs
        gsap.to('.blob-1', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
        
        gsap.to('.blob-2', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });
    }

    // --- 3. Custom Cursor & Magnetic Buttons ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // Check if device has pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        let glowX = mouseX;
        let glowY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follow animation
        const renderCursor = () => {
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;

            if (cursorDot) {
                cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            }
            if (cursorGlow) {
                cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
            }

            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover states
        const interactables = document.querySelectorAll('a, button, input, textarea, .copy-click, .nav-link, .magnetic');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        // Magnetic effect
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
        
        // Tilt effect on cards
        const tiltElements = document.querySelectorAll('.tilt-effect');
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                gsap.to(el, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    ease: "power1.out",
                    duration: 0.3
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    rotateX: 0,
                    rotateY: 0,
                    ease: "power3.out",
                    duration: 0.5
                });
            });
        });
    } else {
        if(cursorDot) cursorDot.style.display = 'none';
        if(cursorGlow) cursorGlow.style.display = 'none';
    }

    // --- 4. Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const roles = ["Full Stack Web Developer", "Web Developer", "Backend Developer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000); // Initial delay
    }

    // --- 5. Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0 && typeof ScrollTrigger !== 'undefined') {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // --- 6. Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter logic
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        gsap.to(card, { autoAlpha: 1, scale: 1, display: 'flex', duration: 0.4 });
                    } else {
                        gsap.to(card, { autoAlpha: 0, scale: 0.8, display: 'none', duration: 0.4 });
                    }
                });
                
                // Refresh ScrollTrigger since layout changed
                setTimeout(() => ScrollTrigger.refresh(), 450);
            });
        });
    }

    // --- 7. Button Ripple Effect ---
    const rippleButtons = document.querySelectorAll('.ripple');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripple = document.createElement('span');
            ripple.classList.add('ripple-span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // --- 8. Navigation & Scroll ---
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        // Navbar Scrolled State
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if(scrollProgress) scrollProgress.style.width = `${progress}%`;

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active Nav Link based on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

    // Smooth scroll for nav links (Lenis handles the smooth, we just need to update URL/State)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                lenis.scrollTo(target, { offset: -80 });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    mobileToggle.click();
                }
            }
        });
    });

    // --- 9. Mobile Menu ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // --- 10. Copy to Clipboard ---
    const copyElements = document.querySelectorAll('.copy-click');
    copyElements.forEach(el => {
        el.addEventListener('click', () => {
            const textToCopy = el.getAttribute('data-copy');
            const tooltip = el.querySelector('.copy-tooltip');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = tooltip.innerText;
                tooltip.innerText = 'Copied!';
                tooltip.style.color = 'var(--accent-color)';
                
                setTimeout(() => {
                    tooltip.innerText = originalText;
                    tooltip.style.color = '';
                }, 2000);
            });
        });
    });

    // --- 11. Contact Form & WhatsApp ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && message) {
                const whatsappMsg = `Hi Razik! My name is ${name}. Email: ${email}. Message: ${message}`;
                const whatsappUrl = `https://wa.me/97455110479?text=${encodeURIComponent(whatsappMsg)}`;
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
            }
        });
    }

    // --- 12. Set Current Year in Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});