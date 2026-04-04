
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
    const typingData = [
        { id: "hero-role", text: "MERN Stack | AI | IoT", speed: 100 }
    ];

    startTypingSequence(typingData);
});

async function startTypingSequence(data) {
    for (const item of data) {
        await typeWriter(item.id, item.text, item.speed);
    }
}

function typeWriter(elementId, text, speed) {
    return new Promise((resolve) => {
        const element = document.getElementById(elementId);
        if (!element) return resolve();
        
        element.innerHTML = "";
        element.classList.add("is-typing"); // Show cursor
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove("is-typing"); // Hide cursor after done
                resolve();
            }
        }
        type();
    });
}

// Flip card toggle handler (backup for inline onclick)
function toggleFlip(card) {
    card.classList.toggle("flipped");
}

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        hamburger.classList.toggle("toggle");
    });
}

