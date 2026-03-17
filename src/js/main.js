import { Application } from "@splinetool/runtime";
// // Initialize 3D canvas if available and not on mobile

// const canvas = document.getElementById("canvas3d");
// const app = new Application(canvas);
// app.load("https://prod.spline.design/pW2zyj3hL0Hs-BUk/scene.splinecode");

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

// Mobile Burger Menu functionality
function initBurgerMenu() {
  const burgerButtons = document.querySelectorAll(".burger-menu-btn");
  const mobileNav = document.getElementById("mobileNav");

  burgerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (mobileNav) {
        mobileNav.classList.toggle("active");
      }
    });
  });

  // Close mobile menu when clicking on a link
  if (mobileNav) {
    const navLinks = mobileNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileNav && mobileNav.classList.contains("active")) {
      if (
        !e.target.closest(".burger-menu-btn") &&
        !e.target.closest(".mobile-nav")
      ) {
        mobileNav.classList.remove("active");
      }
    }
  });
}

// Initialize burger menu when DOM is ready
document.addEventListener("DOMContentLoaded", initBurgerMenu);

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

// Search bar functionality
const searchBarWrapper = document.getElementById("searchBarWrapper");
const searchIconBtn = document.getElementById("searchIconBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if (searchBarWrapper && searchIconBtn && searchInput && searchBtn) {
  // Toggle expanded/collapsed on icon click
  searchIconBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchBarWrapper.classList.remove("collapsed");
    searchBarWrapper.classList.add("expanded");
    searchInput.focus();
  });

  // Collapse search bar
  function collapseSearch() {
    searchBarWrapper.classList.add("collapsed");
    searchBarWrapper.classList.remove("expanded");
    searchInput.value = "";
  }

  // Define search mappings
  const searchMappings = {
    witch: "salle-witch.html",
    sorcière: "salle-witch.html",
    pirate: "salle-pirate.html",
    forest: "salle-forest.html",
    forêt: "salle-forest.html",
    accueil: "index.html",
    home: "index.html",
    tarifs: "tarifs.html",
    pricing: "tarifs.html",
    reservation: "reservation.html",
    réservation: "reservation.html",
    book: "reservation.html",
    compte: "mon-compte.html",
    account: "mon-compte.html",
    profil: "mon-compte.html",
    profile: "mon-compte.html",
  };

  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) return;

    // Check for exact or partial matches
    const matchedPage = searchMappings[searchTerm];

    if (matchedPage) {
      // Create transition overlay and navigate
      const overlay = document.querySelector(".transition-overlay");
      if (overlay) {
        overlay.classList.remove("opening");
        overlay.classList.add("closing");
      }

      setTimeout(() => {
        window.location.href = matchedPage;
      }, 450);
    } else {
      // Show "no results" feedback
      const searchBar = searchInput.parentElement;
      searchBar.style.borderColor = "#e10000";
      searchInput.placeholder = "Aucun résultat...";

      // Reset after 2 seconds
      setTimeout(() => {
        searchBar.style.borderColor = "";
        searchInput.placeholder = "Rechercher...";
      }, 2000);
    }
  }

  // Search on button click
  searchBtn.addEventListener("click", performSearch);

  // Search on Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Close search bar when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchBarWrapper.contains(e.target)) {
      if (searchBarWrapper.classList.contains("expanded")) {
        collapseSearch();
      }
    }
  });
}

// Burger menu functionality
const burgerBtn = document.getElementById("burgerBtn");
const headerNav = document.getElementById("headerNav");

if (burgerBtn && headerNav) {
  burgerBtn.addEventListener("click", () => {
    headerNav.classList.toggle("active");
  });

  // Close menu when clicking on a link
  headerNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      headerNav.classList.remove("active");
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!burgerBtn.contains(e.target) && !headerNav.contains(e.target)) {
      headerNav.classList.remove("active");
    }
  });
}

// Game overlay functionality
const gameOverlay = document.getElementById("gameOverlay");
const gameStartBtn = document.getElementById("gameStartBtn");

if (gameOverlay && gameStartBtn) {
  gameStartBtn.addEventListener("click", () => {
    gameOverlay.classList.add("fade-out");
    setTimeout(() => {
      gameOverlay.style.display = "none";
    }, 500);
  });
}

// Prevent scroll on iframe
const iframeContainer = document.querySelector(".iframe-container");

if (iframeContainer) {
  // Block body scroll when mouse enters iframe
  iframeContainer.addEventListener("mouseenter", () => {
    document.body.style.overflow = "hidden";
  });

  // Restore body scroll when mouse leaves iframe
  iframeContainer.addEventListener("mouseleave", () => {
    document.body.style.overflow = "";
  });
}

// Subtle magnetic attraction effect for discount counter with localStorage persistence
const discountElement = document.querySelector(".rabais-constent");
const discountPercentageSpan = document.getElementById("discountPercentage");

// Initialize discount from localStorage
function initializeDiscount() {
  const savedDiscount = localStorage.getItem("lockEscapeDiscount");
  const discount = savedDiscount ? parseInt(savedDiscount) : 0;

  if (discountPercentageSpan) {
    discountPercentageSpan.textContent = discount;
  }

  return discount;
}

// Update discount and save to localStorage
function updateDiscount(newValue) {
  localStorage.setItem("lockEscapeDiscount", newValue);
  if (discountPercentageSpan) {
    discountPercentageSpan.textContent = newValue;
  }
}

// Global function for Spline events to increment discount
window.incrementDiscount = function (amount = 2) {
  const currentDiscount = parseInt(
    localStorage.getItem("lockEscapeDiscount") || 0,
  );
  const newDiscount = Math.min(currentDiscount + amount, 100);
  updateDiscount(newDiscount);
};

// Initialize discount on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeDiscount();

  // Listen for localStorage changes from other tabs/windows
  window.addEventListener("storage", (e) => {
    if (e.key === "lockEscapeDiscount") {
      initializeDiscount();
    }
  });
});

// Magnetic attraction effect
if (discountElement) {
  let mouseX = 0;
  let mouseY = 0;
  let offsetX = 0;
  let offsetY = 0;

  const attractionRadius = 200; // Distance from which element feels attraction
  const attractionStrength = 0.08; // Very subtle (8% of distance)

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Get element's center position
    const rect = discountElement.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    // Calculate distance from mouse to element
    const distX = mouseX - elementCenterX;
    const distY = mouseY - elementCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Only apply attraction if mouse is within the attraction radius
    if (distance < attractionRadius) {
      // Calculate very subtle offset (attraction strength is low)
      offsetX = distX * attractionStrength;
      offsetY = distY * attractionStrength;
    } else {
      // Smoothly return to original position
      offsetX *= 0.85;
      offsetY *= 0.85;
    }

    // Apply the subtle transform
    discountElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  // Reset on mouse leave
  document.addEventListener("mouseleave", () => {
    offsetX = 0;
    offsetY = 0;
    discountElement.style.transform = "translate(0px, 0px)";
  });
}
