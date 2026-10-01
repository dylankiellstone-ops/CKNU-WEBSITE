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

// Our impact: history from CKNU's recovery spreadsheets, plus live totals from the
// CKNU food tracker (which took over logging in fall 2026). Only totals are public;
// the tracker's database keeps everything else private. If the live numbers can't be
// loaded, the page just shows the history already written in index.html.
const HISTORY = {
  pounds: 10139, // fall 2023 to spring 2026
  meals: 1946, // fall 2025 and winter 2026
  biggestYear: 3942, // 2025-26, for scaling the bars
};
const IMPACT_URL = "https://otsgpdlhjulixxqejkzk.supabase.co/rest/v1/rpc/public_impact";
// The tracker's publishable key. It's designed to be public.
const IMPACT_KEY = "sb_publishable_kUaii2SF5CKZDlovSbuNng_-UVfHbQS";

function formatCount(value) {
  return Math.round(value).toLocaleString("en-US");
}

// Headline numbers are rounded to the nearest 500, with a "+": 10,139 shows as "10,000+".
function formatHeadline(value) {
  const rounded = Math.max(500, Math.round(value / 500) * 500);
  return `${rounded.toLocaleString("en-US")}+`;
}

async function addLiveImpact() {
  try {
    const response = await fetch(IMPACT_URL, {
      method: "POST",
      headers: { apikey: IMPACT_KEY, "Content-Type": "application/json" },
      body: "{}",
    });
    if (!response.ok) return;
    const live = await response.json();
    const pounds = Number(live.pounds_rescued) || 0;
    const meals = Number(live.meals_made) || 0;
    document.getElementById("impact-pounds").textContent = formatHeadline(HISTORY.pounds + pounds);
    document.getElementById("impact-meals").textContent = formatHeadline(HISTORY.meals + meals);

    // This school year's bar, from the tracker.
    if (pounds > 0) {
      const thisYear = document.getElementById("impact-this-year");
      const biggest = Math.max(HISTORY.biggestYear, pounds);
      thisYear.querySelector(".year-value").textContent = formatCount(pounds);
      thisYear.querySelector(".year-bar span").style.setProperty("--share", `${(pounds / biggest) * 100}%`);
      // If this year overtakes the record, rescale the earlier bars to match.
      if (pounds > HISTORY.biggestYear) {
        for (const bar of document.querySelectorAll("#impact-years li:not(#impact-this-year)")) {
          const value = Number(bar.querySelector(".year-value").textContent.replace(/,/g, ""));
          bar.querySelector(".year-bar span").style.setProperty("--share", `${(value / biggest) * 100}%`);
        }
      }
      thisYear.hidden = false;
      document.getElementById("impact-note").textContent =
        "From our recovery logs since fall 2023, and live from our kitchen tracker this year. Meals counted since fall 2025, when we started tracking them.";
    }
  } catch {
    // Offline or the tracker is down: the history in index.html stays as it is.
  }
}
addLiveImpact();

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
