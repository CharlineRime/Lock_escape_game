import { Application } from "@splinetool/runtime";

// Black fade transition overlay
function createTransitionOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "transition-overlay opening";
  document.body.appendChild(overlay);
  return overlay;
}

const overlay = createTransitionOverlay();

// Fade in when page loads (with delay to avoid flash)
window.addEventListener("load", () => {
  setTimeout(() => {
    overlay.classList.remove("closing");
    overlay.classList.add("opening");
  }, 300);
});

// Intercept all navigation links
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.href && !link.target) {
    const href = link.getAttribute("href");

    // Only animate for internal navigation
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      e.preventDefault();

      overlay.classList.remove("opening");
      overlay.classList.add("closing");

      setTimeout(() => {
        window.location.href = href;
      }, 450);
    }
  }
});

// Initialize 3D canvas if available
const canvas = document.getElementById("canvas3d");
if (canvas) {
  const app = new Application(canvas);
  app.load("https://prod.spline.design/LzT3AAfpbXaD9aKM/scene.splinecode");
}

// Burger menu functionality
const burgerBtn = document.getElementById("burgerBtn");
const headerNav = document.getElementById("headerNav");

if (burgerBtn && headerNav) {
  burgerBtn.addEventListener("click", () => {
    headerNav.classList.toggle("active");
  });

  // Close menu when a link is clicked
  const navLinks = headerNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerNav.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".burger-menu-btn") &&
      !e.target.closest(".header-nav")
    ) {
      headerNav.classList.remove("active");
    }
  });
}

// Player counter functionality
const counterElement = document.getElementById("counter");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");

let playerCount = 3;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 8;

function updateDisplay() {
  if (counterElement) {
    counterElement.textContent = playerCount;
  }
}

if (incrementBtn) {
  incrementBtn.addEventListener("click", () => {
    if (playerCount < MAX_PLAYERS) {
      playerCount++;
      updateDisplay();
    }
  });
}

if (decrementBtn) {
  decrementBtn.addEventListener("click", () => {
    if (playerCount > MIN_PLAYERS) {
      playerCount--;
      updateDisplay();
    }
  });
}

// Reservation card click persistence
const reservationClickable = document.querySelector(".reservation-clickable");
if (reservationClickable) {
  const cards = reservationClickable.querySelectorAll(".reservation-card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      // Remove active class from all cards
      cards.forEach((c) => c.classList.remove("active"));
      // Add active class to clicked card
      card.classList.add("active");
    });
  });
}

// Calendar date selection persistence
const calendarDates = document.querySelectorAll(".calendar .dates button");
if (calendarDates.length > 0) {
  calendarDates.forEach((dateBtn) => {
    dateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Remove selected class from all date buttons
      calendarDates.forEach((btn) => btn.classList.remove("selected"));
      // Add selected class to clicked date
      dateBtn.classList.add("selected");
    });
  });
}
