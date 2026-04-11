const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll('a[href]').forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("#")) {
    return;
  }

  const normalizedHref = href.split("#")[0];

  if (normalizedHref === `./${currentPage}` || (currentPage === "" && normalizedHref === "./index.html")) {
    link.classList.add("is-active");
  }
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Fermer" : "Menu";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    });
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const delay = entry.target.getAttribute("data-delay") || "0";
        entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    formStatus.textContent = "Message envoye avec succes.";
  });
}

const popup = document.querySelector("[data-announcement-popup]");
const popupBackdrop = document.querySelector("[data-announcement-backdrop]");
const popupOpeners = document.querySelectorAll("[data-open-announcement]");
const popupClosers = document.querySelectorAll("[data-close-announcement]");
const popupStorageKey = "collywood-announcement-dismissed";

const openPopup = () => {
  if (!popup || !popupBackdrop) {
    return;
  }

  popup.hidden = false;
  popupBackdrop.hidden = false;
  document.body.classList.add("has-popup-open");
};

const closePopup = () => {
  if (!popup || !popupBackdrop) {
    return;
  }

  popup.hidden = true;
  popupBackdrop.hidden = true;
  document.body.classList.remove("has-popup-open");
  sessionStorage.setItem(popupStorageKey, "true");
};

popupOpeners.forEach((button) => {
  button.addEventListener("click", openPopup);
});

popupClosers.forEach((button) => {
  button.addEventListener("click", closePopup);
});

if (popupBackdrop) {
  popupBackdrop.addEventListener("click", closePopup);
}

if (popup && popupBackdrop && !sessionStorage.getItem(popupStorageKey)) {
  window.setTimeout(openPopup, 450);
}
