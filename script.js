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
  pounds: 10139, // logged in the recovery spreadsheets, fall 2023 to spring 2026
  // 1,946 counted (fall 2025 and winter 2026), plus about 5,068 estimated for the quarters
  // that weren't counted, at the counted quarters' rate: 1,946 meals from 2,813 lbs of
  // food, about 0.69 meals per pound. Meals from fall 2026 on come from the tracker.
  meals: 7014,
  biggestYear: 3942, // 2025-26, for scaling the bars
};
// 2026-27 food recovered but not logged in the tracker, added by hand:
// 3 x (17 + 15 + 10 + 12 + 12 + 14 + 7 + 30) = 351 lbs, the first week of fall 2026.
const THIS_YEAR_EXTRA_POUNDS = 351;
const IMPACT_URL = "https://otsgpdlhjulixxqejkzk.supabase.co/rest/v1/rpc/public_impact";
// The tracker's publishable key. It's designed to be public.
const IMPACT_KEY = "sb_publishable_kUaii2SF5CKZDlovSbuNng_-UVfHbQS";

function formatCount(value) {
  return Math.round(value).toLocaleString("en-US");
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
    const pounds = (Number(live.pounds_rescued) || 0) + THIS_YEAR_EXTRA_POUNDS;
    const meals = Number(live.meals_made) || 0;
    document.getElementById("impact-pounds").textContent = formatCount(HISTORY.pounds + pounds);
    document.getElementById("impact-meals").textContent = formatCount(HISTORY.meals + meals);

    // This school year's bar: the tracker's pounds plus the food added by hand.
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
  } catch {
    // Offline or the tracker is down: the history in index.html stays as it is.
  }
}
addLiveImpact();
