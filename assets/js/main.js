
// Handle scroll reveal animations (In and Out)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else if (entry.boundingClientRect.top > 0) {
            // Only remove if it's below the viewport to prevent flickering when scrolling fast
            entry.target.classList.remove("active");
        }
    });
}, { 
    threshold: 0.05
});

document.addEventListener("DOMContentLoaded", () => {
    // Reveal everything with the .reveal class
    document.querySelectorAll(".reveal").forEach((el) => {
        revealObserver.observe(el);
    });

    // Initialize Typing Effect
    const roles = [
        "MERN Stack Developer",
        "AI Enthusiast",
        "Full Stack Developer",
        "IoT Systems Developer",
        "MCA Graduate"
    ];

    startTypingLoop("hero-role", roles);
});

async function startTypingLoop(elementId, roles) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let roleIndex = 0;
    while (true) {
        let currentRole = roles[roleIndex];
        
        // Type the role
        await typeText(element, currentRole);
        await new Promise(r => setTimeout(r, 2000)); // Pause at end
        
        // Erase the role
        await eraseText(element);
        await new Promise(r => setTimeout(r, 500)); // Pause after erase
        
        roleIndex = (roleIndex + 1) % roles.length;
    }
}

function typeText(element, text) {
    return new Promise((resolve) => {
        element.innerHTML = "";
        element.classList.add("is-typing");
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

function eraseText(element) {
    return new Promise((resolve) => {
        const text = element.innerHTML;
        let i = text.length;
        const interval = setInterval(() => {
            if (i > 0) {
                element.innerHTML = text.substring(0, i - 1);
                i--;
            } else {
                element.classList.remove("is-typing");
                clearInterval(interval);
                resolve();
            }
        }, 500 / text.length); // Speed up erase relative to word length
    });
}


// Flip card toggle handler (backup for inline onclick)
function toggleFlip(card) {
    card.classList.toggle("flipped");
}

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-open");
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
    });
});

// Active Link Highlighting using IntersectionObserver
const navLinksItems = document.querySelectorAll(".nav-link");
const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Adjust these values to tune when a link becomes active
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinksItems.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Only observe sections that have a corresponding link in the navbar
const trackedSectionIds = Array.from(navLinksItems).map(link => link.getAttribute("href").substring(1));
trackedSectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
});




// AJAX Contact Form Submission
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("form-success");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => {
            // Show Success Message
            contactForm.style.display = "none";
            successMessage.style.display = "block";

            // Automatically reset and show form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                successMessage.style.display = "none";
                contactForm.style.display = "flex";
            }, 5000);
        })
        .catch((error) => {
            console.error("Form submission error:", error);
            alert("Oops! There was an issue sending your message. Please try again.");
        });
    });
}


