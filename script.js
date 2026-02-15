window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "none";
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
    });
});

const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.2 },
);

faders.forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    const progress = document.getElementById("progressBar");

    header.classList.toggle("scrolled", window.scrollY > 50);

    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    progress.style.width = `${(scroll / height) * 100}%`;
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        const offset = 100;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    });
});
document.querySelector(".logo").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
    if (window.pageYOffset === 0) {
        header.classList.remove("hide");
    } else if (!header.matches(":hover")) {
        header.classList.add("hide");
    }
});

document.addEventListener("mousemove", function (e) {
    if (e.clientY < 80) {
        header.classList.remove("hide");
    }
});

header.addEventListener("mouseleave", function () {
    if (window.pageYOffset !== 0) {
        header.classList.add("hide");
    }
});

document.querySelectorAll(".luxury-hover").forEach((hover) => {
    const category = hover.dataset.category;
    const overlay = document.getElementById(`${category}-overlay`);

    hover.addEventListener("click", function (e) {
        closeAllOverlays();
        openOverlay(overlay);
    });

    const closeBtn = overlay.querySelector(".close-overlay");
    closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeOverlay(overlay);
    });
});

function closeOverlay(overlay) {
    overlay.classList.remove("overlay");
    overlay.classList.add("hidden");
}

function openOverlay(overlay) {
    overlay.classList.add("overlay");
    overlay.classList.remove("hidden");
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeAllOverlays();
    }
});

function closeAllOverlays() {
    document.querySelectorAll(".overlay").forEach((overlay) => {
        closeOverlay(overlay);
    });
}
