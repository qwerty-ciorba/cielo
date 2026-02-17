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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        const offset = 100;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;

        isAutoScrolling = true;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });

        setTimeout(() => {
            isAutoScrolling = false;
        }, 700);
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
const wishlistDropdown = document.getElementById("wishlistDropdown") || null;

let lastScroll = 0;
let isAutoScrolling = false;

window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove("hide");
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScroll = currentScroll;
});

document.addEventListener("mousemove", function (e) {
    if (e.clientY < 50) {
        header.classList.remove("hide");
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

function openOverlay(overlay) {
    overlay.classList.remove("hidden");
    overlay.classList.add("overlay");

    setTimeout(() => {
        overlay.classList.add("active");
    }, 10);
}

function closeOverlay(overlay) {
    overlay.classList.remove("active");

    setTimeout(() => {
        overlay.classList.add("hidden");
        overlay.classList.remove("overlay");
    }, 400);
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
