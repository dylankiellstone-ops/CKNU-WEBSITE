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

// Our impact: live totals from the CKNU food tracker. Only totals are public;
// the tracker's database keeps everything else private. If the numbers can't
// be loaded, the section just stays hidden.
const IMPACT_URL = "https://otsgpdlhjulixxqejkzk.supabase.co/rest/v1/rpc/public_impact";
// The tracker's publishable key. It's designed to be public.
const IMPACT_KEY = "sb_publishable_kUaii2SF5CKZDlovSbuNng_-UVfHbQS";

async function showImpact() {
  try {
    const response = await fetch(IMPACT_URL, {
      method: "POST",
      headers: { apikey: IMPACT_KEY, "Content-Type": "application/json" },
      body: "{}",
    });
    if (!response.ok) return;
    const totals = await response.json();
    let shown = 0;
    for (const stat of document.querySelectorAll("[data-stat]")) {
      const value = Number(totals[stat.dataset.stat]) || 0;
      stat.querySelector(".stat-number").textContent = value.toLocaleString("en-US");
      stat.hidden = value <= 0;
      if (value > 0) shown += 1;
    }
    if (totals.since) {
      const since = new Date(totals.since + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
      document.getElementById("impact-note").textContent = `Live from our kitchen log, since ${since}.`;
    }
    document.getElementById("impact").hidden = shown === 0;
  } catch {
    // Offline or the tracker is down: leave the section hidden.
  }
}
showImpact();

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
