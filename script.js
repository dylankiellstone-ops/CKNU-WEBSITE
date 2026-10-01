// Mobile menu: open/close, and close after tapping a link.
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "Menu";
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

// Keep the copyright year current.
document.getElementById("year").textContent = new Date().getFullYear();

// Photo gallery: tap a photo to see it bigger.
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

document.querySelectorAll(".gallery-open").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = button.closest("figure").querySelector("figcaption")?.textContent || "";
    lightbox.showModal();
  });
});
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
// Clicking the dark area around the photo closes it too.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
