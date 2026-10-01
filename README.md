# The Campus Kitchen at Northwestern University: website

The public website for CKNU. It's a single page with these sections: who we are, how it works, get involved (volunteer, shift leads, exec board), support us, and contact. There's also a **Team login** button that links to the CKNU food tracker shift leads use.

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
script.js      the phone menu and the copyright year
assets/        logos, favicon and phone home-screen icon
```

- **Changing words:** edit `index.html` on GitHub (open the file, tap the ✏️ pencil, then **Commit changes**). The site updates in about a minute.
- **Contact details** appear in three places in `index.html`: the Get involved links, the Say hi section, and the footer.
- **Team login link:** if the food tracker moves (for example to GitHub Pages), search `index.html` for `bucolic-brigadeiros-cb611c.netlify.app` and replace both copies.
- **Adding photos:** put them in `assets/` and add `<img src="assets/your-photo.jpg" alt="what's in the photo">` where you want them. Keep photos under about 500 KB so the site stays fast on phones.

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
  | `--rose` | `#CB7C80` | "Share" step |
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
