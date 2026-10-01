# The Campus Kitchen at Northwestern University: website

The public website for CKNU. It's a single page with these sections: who we are, how it works, our impact, photos, get involved (volunteer, shift leads, exec board), support us, and contact. There's also a **Team login** button that links to the CKNU food tracker shift leads use.

- **Live site:** https://cknu.org (also www.cknu.org), once GitHub Pages and the DNS are set up (see below)
- **Hosting:** GitHub Pages. It's free, with no deploy limits, and updates about a minute after each change to `main`.

## Turning on GitHub Pages (one time)

1. In this repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then tap **Save**.
3. After a minute or two, the site is live. The Pages settings page shows the link once it's ready.

## The cknu.org domain

The domain is registered with **Squarespace** (Domains → cknu.org → DNS). The `CNAME` file in this repo tells GitHub Pages to serve the site at `cknu.org`; don't delete it.

**DNS records in Squarespace (custom records):**

| Type | Host | Data |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `dylankiellstone-ops.github.io` |
| TXT | `_github-pages-challenge-dylankiellstone-ops` | The verification code from GitHub → Settings → Pages → Verified domains |

The Squarespace Defaults preset (the A records pointing at Squarespace) must be removed, or cknu.org keeps showing Squarespace.

After the DNS is set, go to **Settings → Pages**: **Custom domain** should show `cknu.org` with a green tick. Then turn on **Enforce HTTPS** (it can take up to an hour or so to become available).

## Editing the site

Everything is plain HTML and CSS, with no build step:

```
index.html     all the page text and sections
styles.css     colours, fonts and layout
script.js      the phone menu, the photo pop-up and the copyright year
assets/        logos, favicon and phone home-screen icon
assets/gallery/  photos for the Photos section
```

- **Changing words:** edit `index.html` on GitHub (open the file, tap the ✏️ pencil, then **Commit changes**). The site updates in about a minute.
- **Contact details** appear in three places in `index.html`: the Get involved links, the Say hi section, and the footer.
- **Our impact numbers:** the history is written into the `#impact` section of `index.html` and the `HISTORY` numbers at the top of the impact code in `script.js`. They come from CKNU's recovery spreadsheets in the campuskitchen@ Google Drive (CKNU Recovery Tracker 2023-2024, 2024-2025 and 2025-2026), fall 2023 to spring 2026:
  - **Pounds rescued:** every logged item's weight added up: 3,397 lbs (2023–24), 2,799 lbs (2024–25), 3,942 lbs (2025–26), 10,139 lbs in all.
  - **Meals prepped:** 7,014, of which 1,946 were counted and 5,068 are estimated.
    - Counted, from the Meal Count tabs: 1,355 (fall 2025) and 591 (winter 2026).
    - Estimated for the quarters nobody counted meals (fall 2023 to spring 2025, and spring 2026): the counted quarters made 1,946 meals from 2,813 lbs of recovered food, about 0.69 meals per pound. The uncounted quarters recovered 7,326 lbs, which works out to about 5,068 meals. (No one logged which food went into which meals, so this uses all the food recovered.)
  - **Campus dining partners:** places food was recovered from: Athletics, Allen Center, Elder, Global Hub, Hillel, Norris Catering, Norris Retail, Sargent, Allison and Plex.
  - **Community fridges:** the five Evanston Community Fridges.
  - From fall 2026 on, logging happens in the CKNU food tracker, and the page adds its live totals (its `public_impact` function, which only shares totals) on top of the history and shows this year's bar. If the tracker can't be reached, the history still shows.
  - **Rounding:** the two headline numbers are rounded to the nearest 500 with a "+" (10,139 lbs shows as "10,000+", 7,014 meals as "7,000+"). The yearly bars show exact pounds. The opening paragraph at the top of the page also says "over 10,000 pounds of food and over 7,000 meals"; update it by hand as the totals grow.
  - **At the end of each school year,** add that year's tracker total to `HISTORY` and as a new bar in `index.html`, or leave it live; just don't do both, or it counts twice.
- **Team login link:** if the food tracker moves (for example to GitHub Pages), search `index.html` for `bucolic-brigadeiros-cb611c.netlify.app` and replace both copies.
- **Adding a photo to the Photos section:** upload it to `assets/gallery/` (on GitHub: open the folder, then **Add file → Upload files**). Then in `index.html`, find the `<div class="gallery">` block, copy one whole `<figure>…</figure>`, and change the `src` to `assets/gallery/your-photo.jpg`, the `alt` to what's in the photo, and the caption. Keep photos under about 500 KB so the site stays fast on phones. Tapping a photo opens it bigger; that works automatically for new ones.
- **Current gallery photos** are linked from the CKNU Mailchimp image library. If those ever stop showing, upload copies to `assets/gallery/` and point the `src` there.

## Brand rules (from the CKNU Brand Guidelines)

The site follows these, so keep them when editing:

- **Logo:** never stretch or distort it. Only recolour it to all black or all white. The logo files in `assets/` came straight from the brand guide; the lockup's off-white background was cleaned to pure white.
- **Backgrounds:** plain white (`#ffffff`), never off-white, because not all of the logos are transparent PNGs.
- **Fonts:** all-caps sans serif for headings (Oswald). Plain, readable sans serif for body text (Arial / Calibri). No serif fonts.
- **Colours:**

  | Name in `styles.css` | Hex | Used for |
  |---|---|---|
  | `--purple` | `#3A1A5B` | Main brand colour: headings, buttons, logo |
  | `--sage` | `#8DB9A5` | "Recover" step |
  | `--periwinkle` | `#8186D9` | Volunteer card, focus outlines |
  | `--rose` | `#CB7C80` | "Deliver" step |
  | `--gold` | `#E8C687` | "Prep" step |
  | `--teal` | `#214D5B` | Labels, button hover |
  | `--slate` | `#67828E` | Available |
  | `--green` | `#86AC7B` | Shift lead card |
  | `--forest` | `#264027` | Available |

- **Tone:** informal, personal, and always positive and encouraging.
- **Wording:**
  - The full name is "The Campus Kitchen at Northwestern University": always "The", everything capitalised except "at".
  - The short names are "CKNU" or "Campus Kitchen". Never "NUCK", "The Campus Kitchen" on its own, or "Campus Kitchens".
  - "shift leads" is always lower case.
  - It's the "Campus Kitchen Executive Board", or just "exec board".

## Contact

- Email: campuskitchen@u.northwestern.edu
- Instagram and Twitter / X: [@NUCampusKitchen](https://www.instagram.com/NUCampusKitchen)
