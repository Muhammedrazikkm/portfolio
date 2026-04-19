// Loading Screen
window.addEventListener('load', function() {
const loading = document.getElementById('loading');
setTimeout(() => {
loading.classList.add('hidden');
}, 2000);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
  const currentScrollPosition = window.scrollY;
  
  const scrollPercentage = (currentScrollPosition / totalScrollHeight) * 100;
  scrollProgressBar.style.width = scrollPercentage + '%';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});

// Scroll Animation
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
});
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
observer.observe(section);
});

// Contact Form Validation and WhatsApp Redirect
document.getElementById('contactForm').addEventListener('submit', function(e) {
e.preventDefault();

const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();

let isValid = true;

// Reset previous errors
document.querySelectorAll('.form-group').forEach(group => {
group.classList.remove('error');
group.querySelector('.error-message').style.display = 'none';
});

// Validate name
if (!name) {
showError('name', 'Please enter your name');
isValid = false;
}

// Validate email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email) {
showError('email', 'Please enter your email');
isValid = false;
} else if (!emailRegex.test(email)) {
showError('email', 'Please enter a valid email');
isValid = false;
}

// Validate message
if (!message) {
showError('message', 'Please enter a message');
isValid = false;
}

if (isValid) {
// Create WhatsApp message
const whatsappMessage = `Hi Razik! My name is ${name}. Email: ${email}. Message: ${message}`;
const whatsappUrl = `https://wa.me/97455110479?text=${encodeURIComponent(whatsappMessage)}`;

// Open WhatsApp
window.open(whatsappUrl, '_blank');

// Reset form
this.reset();
}
});

function showError(fieldName, errorMessage) {
const field = document.getElementById(fieldName);
const formGroup = field.closest('.form-group');
const errorElement = formGroup.querySelector('.error-message');

formGroup.classList.add('error');
errorElement.textContent = errorMessage;
errorElement.style.display = 'block';
}

  const jobTitle = document.getElementById("job-title");
  const titles = ["Web Developer", "Backend Developer"];
  let index = 0;

  setInterval(() => {
    // Fade out
    jobTitle.classList.add("fade-out");

    setTimeout(() => {
      // Change text and fade in
      index = (index + 1) % titles.length;
      jobTitle.textContent = titles[index];
      jobTitle.classList.remove("fade-out");
      jobTitle.classList.add("fade-in");

      // Clean up
      setTimeout(() => {
        jobTitle.classList.remove("fade-in");
      }, 500);
    }, 500);
  }, 4000); // Every 4 seconds



// Navbar background on scroll
// window.addEventListener('scroll', function() {
// const nav = document.querySelector('nav');
// if (window.scrollY > 100) {
//  nav.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
// } else {
//    nav.style.background = 'transparent'; 
// }
// });

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = mobileMenu.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Set dynamic copyright year
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Back to Top Button Visibility and Scroll
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Interactive Developer Terminal Logic
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.getElementById('terminalBody');

const commands = {
  help: "Available commands:<br>&nbsp;&nbsp;<span class='highlight'>whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Brief info about me<br>&nbsp;&nbsp;<span class='highlight'>skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- My technical stack<br>&nbsp;&nbsp;<span class='highlight'>experience</span>&nbsp;&nbsp;&nbsp;- Work history<br>&nbsp;&nbsp;<span class='highlight'>projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Latest works<br>&nbsp;&nbsp;<span class='highlight'>education</span>&nbsp;&nbsp;&nbsp;&nbsp;- Academic background<br>&nbsp;&nbsp;<span class='highlight'>certificates</span>&nbsp;- Certifications<br>&nbsp;&nbsp;<span class='highlight'>contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- How to reach me<br>&nbsp;&nbsp;<span class='highlight'>clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal window",
  whoami: "I am Muhammed Razik K M, a Web Developer specializing in React, Node.js, and Backend server management.",
  skills: "Frontend: HTML, CSS, JavaScript, React, Bootstrap<br>Backend: Node.js, Express.js<br>Databases: MySQL, MongoDB<br>Tools: Git, SSH, Linux Servers",
  experience: "1. Web Developer @ FinGlider (Jan '25 — Present)<br>2. Web Developer Intern @ FinGlider (May '24 — Dec '24)",
  projects: "1. GliderGlobal Academy (LMS)<br>2. GoDigex (eCommerce WhatsApp Bot)<br>3. Kairali Restaurant System<br>4. Supermarket Management System",
  education: "1. B Tech in IT @ College of Engineering Thalassery (2018-2022)<br>2. HSE in Biology Science @ Kkm Ghss Orkkatteri (2016-2018)",
  certificates: "1. Foundations: Data, Data, Everywhere (Google)<br>2. AI For All – AI Appreciate (CBSE/Intel)<br>3. AI For All – AI Aware (CBSE/Intel)<br>4. Python Django/Angular Full Stack (NCTT)<br>5. Python For Beginners (Udemy)",
  contact: "Email: muhdrazikkm@gmail.com<br>LinkedIn: linkedin.com/in/muhammed-razik-b5b266245/<br>GitHub: github.com/Muhammedrazikkm",
  clear: "" // Handled specifically in code
};

if (terminalInput) {
  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const command = this.value.trim().toLowerCase();
      
      if (command) {
        // Echo input
        const promptHTML = '<span class="terminal-prompt"><span class="user">razik@ubuntu</span>:<span class="path">~</span>$</span>';
        terminalOutput.innerHTML += `<p class="terminal-text">${promptHTML} ${this.value}</p>`;
        
        // Process command
        if (command === 'clear') {
          terminalOutput.innerHTML = '';
        } else if (commands[command]) {
          terminalOutput.innerHTML += `<p class="terminal-text">${commands[command]}</p>`;
        } else {
          terminalOutput.innerHTML += `<p class="terminal-text">Command not found: ${command}. Type <span class="highlight">help</span> for a list of commands.</p>`;
        }
      }
      
      this.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Keep focus on input when clicking terminal body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });
}

// Custom Cursor Trail Logic
const cursorTrail = document.getElementById('cursorTrail');

// Only enable custom cursor on non-touch devices (desktops)
if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
  });

  // Enlarge cursor when hovering over clickable elements
  const interactables = document.querySelectorAll('a, button, input, textarea, .terminal-button, .menu-toggle');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorTrail.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorTrail.classList.remove('hover'));
  });
} else {
  if(cursorTrail) cursorTrail.style.display = 'none'; // Hide on mobile
}

// Click to Copy Functionality
function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const tooltip = element.querySelector('.copy-tooltip');
    const originalText = tooltip.textContent;
    
    tooltip.textContent = 'Copied!';
    tooltip.classList.add('copied');
    
    setTimeout(() => {
      tooltip.textContent = originalText;
      tooltip.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}