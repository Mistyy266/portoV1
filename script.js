// Navbar toggle (mobile)
const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

// Update year footer
document.getElementById("year").textContent = new Date().getFullYear();

// Typing effect (type + delete, infinite)
const typingEl = document.getElementById("typingText");

const phrases = ["seorang Web Developer (Junior)", "suka bermain game", "hobi vibe coding"];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 90;
const deleteSpeed = 55;
const pauseAfterType = 900;
const pauseAfterDelete = 250;

function typeLoop() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
        // typing
        charIndex++;
        typingEl.textContent = current.substring(0, charIndex);

        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeLoop, pauseAfterType);
            return;
        }

        setTimeout(typeLoop, typeSpeed);
    } else {
        // deleting
        charIndex--;
        typingEl.textContent = current.substring(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // infinite loop
            setTimeout(typeLoop, pauseAfterDelete);
            return;
        }

        setTimeout(typeLoop, deleteSpeed);
    }
}

typeLoop();

function setMenu(open) {
    if (open) {
        nav.classList.add("open");
        toggleBtn.setAttribute("aria-expanded", "true");
    } else {
        nav.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
    }
}

toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    setMenu(!isOpen);
});

// Close menu when clicking a link (mobile)
navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

// Active link on scroll (IntersectionObserver)
const sections = ["about", "projects", "contact"].map((id) => document.getElementById(id));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((a) => a.classList.remove("active"));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add("active");
        });
    },
    {
        root: null,
        threshold: 0.55,
    },
);

sections.forEach((sec) => observer.observe(sec));

// Contact form (demo only)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");

    statusEl.textContent = `Makasih, ${name}! Pesan kamu sudah tercatat (demo).`;
    form.reset();
});
