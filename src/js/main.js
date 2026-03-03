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

// Initialize 3D canvas if available and not on mobile
const canvas = document.getElementById("canvas3d");
if (canvas && window.innerWidth > 768) {
  const app = new Application(canvas);
  app.load("https://prod.spline.design/pW2zyj3hL0Hs-BUk/scene.splinecode");

  // Prevent scroll on canvas - capture phase
  document.addEventListener(
    "wheel",
    (e) => {
      if (canvas.contains(e.target) || e.target === canvas) {
        e.preventDefault();
      }
    },
    { capture: true, passive: false },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (canvas.contains(e.target) || e.target === canvas) {
        e.preventDefault();
      }
    },
    { capture: true, passive: false },
  );
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

// Time slot selection with completed slots disabled
const timeSlots = document.querySelectorAll(".time-slot");
if (timeSlots.length > 0) {
  timeSlots.forEach((timeSlot) => {
    // Disable completed time slots
    if (timeSlot.classList.contains("completed")) {
      timeSlot.disabled = true;
      timeSlot.setAttribute("disabled", "");
      timeSlot.style.cursor = "not-allowed";
      timeSlot.style.opacity = "0.5";
    } else {
      // Add click handler for available slots
      timeSlot.addEventListener("click", (e) => {
        e.preventDefault();
        // Remove selected class from all time slots
        timeSlots.forEach((slot) => slot.classList.remove("selected"));
        // Add selected class to clicked slot
        timeSlot.classList.add("selected");
      });
    }
  });
}
// Room link selection with salle-focus-card class
const roomLinks = document.querySelectorAll(".room-link");
if (roomLinks.length > 0) {
  roomLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove salle-focus-card class from all reservation-cards
      const allReservationCards =
        document.querySelectorAll(".reservation-card");
      allReservationCards.forEach((card) => {
        card.classList.remove("salle-focus-card");
      });

      // Add salle-focus-card class to the clicked room's card
      const roomCard = link.querySelector(".reservation-card");
      if (roomCard) {
        roomCard.classList.add("salle-focus-card");
      }
    });
  });
}
