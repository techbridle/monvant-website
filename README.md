# Monvant — Static Site

Ready-to-deploy static build.

## Files
- `index.html` — main website
- `s-class.html` — Mercedes-Benz S-Class vehicle page
- `v-class.html` — Mercedes V-Class AMG Line vehicle page
- `range-rover.html` — Range Rover Autobiography vehicle page
- `public/fleet/` — vehicle imagery

## Deploy to GitHub Pages

**Option A — New repo (simplest):**
1. Create a new repo on GitHub (e.g. `monvant-live`)
2. Upload the **contents** of this folder (not the folder itself) to the repo root
3. Repo → Settings → Pages → Source: `main` branch, folder `/ (root)` → Save
4. Site goes live at `https://<username>.github.io/monvant-live/` within a minute

**Option B — Replace your existing Vite repo:**
1. In `techbridle/monvant-website`, create a branch called `gh-pages`
2. Delete everything on that branch, upload this folder's contents
3. Settings → Pages → Source: `gh-pages` branch, folder `/ (root)`

**Custom domain (e.g. monvant.vip):**
- Add a file called `CNAME` at the root containing just: `monvant.vip`
- Point your domain's DNS A records at GitHub Pages IPs, or a CNAME to `<username>.github.io`

## Notes
- The site is built as a single-file React app per page (React + Babel via CDN). No build step required.
- Phone: +44 7874 450 385 · WhatsApp uses the same number.
- Email: info@monvant.vip
