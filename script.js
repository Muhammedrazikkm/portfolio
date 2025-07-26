// Loading Screen
window.addEventListener('load', function() {
const loading = document.getElementById('loading');
setTimeout(() => {
loading.classList.add('hidden');
}, 2000);
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
const whatsappUrl = `https://wa.me/9526167587?text=${encodeURIComponent(whatsappMessage)}`;

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