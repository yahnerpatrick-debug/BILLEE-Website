# BILL-EE Website

A plain HTML/CSS/JS site (no build step, no frameworks). Free to host on Vercel.

## Files

| File | What it does |
|---|---|
| `index.html` | All page content and text |
| `styles.css` | Colors, fonts, layout |
| `site-config.js` | **Easiest place to edit:** video/photo file names, links, sign-up form |
| `script.js` | Makes the page work (you rarely need to touch this) |
| `assets/` | Your images and videos go here |
| `assets/team/` | Team Moment photos |

## Add your media (before or after deploying)

Save these into `assets/` with these exact names (or change the names in `site-config.js`):

- `logo.png` — BILL-EE logo
- `hero-bg.jpg` — Mars desert background on the home section
- `rover.mp4` — the rotating rover video (`rover-poster.jpg` is an optional still frame)
- `team-bg.jpg` (or `team-bg.mp4`) — moving background behind Team Moment
- `team/photo-1.jpg` ... `team/photo-7.jpg` — Team Moment photos
- `urc-habitat.jpg` — photo next to URC Competition
- `bronco-space-logo.png`, `cpp-logo.png` — footer logos

Tip: keep the rover video under ~20 MB (GitHub's browser upload limit is 25 MB per file). Compress with HandBrake or https://www.freeconvert.com if needed.

## Put it on GitHub

1. Create a free account at github.com.
2. Click **+** (top right) > **New repository**. Name it `billee-site`, keep it Public (or Private), click **Create repository**.
3. On the new repo page click **uploading an existing file**.
4. Unzip this project, open the folder, select everything inside (index.html, styles.css, script.js, site-config.js, assets, README.md) and drag it into the browser window.
5. Click **Commit changes**.

## Put it on Vercel (free)

1. Go to vercel.com and click **Sign Up > Continue with GitHub**.
2. Click **Add New... > Project** and pick `billee-site` under Import Git Repository.
3. Leave all settings as they are. Framework Preset: **Other**. No build command, no output directory.
4. Click **Deploy**. In about 30 seconds you get a link like `billee-site.vercel.app`.
5. From now on, every time you change a file on GitHub, Vercel redeploys automatically.

Custom domain (optional): Vercel project > **Settings > Domains** > add your domain and follow the DNS instructions.

## Edit the site

### Quick edits in the browser (no install)
On GitHub, open a file, click the pencil icon, edit, click **Commit changes**. Vercel updates in about a minute. To add images/videos: open the `assets` folder > **Add file > Upload files**.

### Edit on your computer (recommended for bigger changes)
1. Install VS Code (code.visualstudio.com) and Git (git-scm.com).
2. In a terminal: `git clone https://github.com/YOUR-USERNAME/billee-site.git`
3. Open the folder in VS Code. Install the **Live Server** extension, right-click `index.html` > **Open with Live Server** to preview as you edit.
4. When happy: `git add .` then `git commit -m "describe change"` then `git push`. Vercel redeploys.

### Common changes
- **Swap the rover video:** replace `assets/rover.mp4` (same name) or change `roverVideo` in `site-config.js`.
- **Change Team Moment photos:** replace the files in `assets/team/`, or edit the `teamPhotos` list in `site-config.js`. Add a line to add a photo, delete a line to remove one.
- **Moving background:** in `site-config.js`, `teamBackground.type` is `"image"` (slowly pans/zooms) or `"video"` (loops). Change `darken` (0 to 1) to make it darker/lighter.
- **Change text:** edit `index.html`.
- **Change colors:** top of `styles.css` (`--red`, `--gold`).
- **Add a new section:** copy a `<section class="space-section">` block in `index.html`, change the `id` and content, and add a link to it in the `<nav>`.
- **Add a new page:** create `team.html` (copy `index.html` as a start) and link to it with `<a href="team.html">`.

### Make the email sign-up work (free)
1. Create a free account at formspree.io, make a new form, copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
2. Paste it into `signupEndpoint` in `site-config.js`.

### Test locally without installing anything extra
In the project folder run `python3 -m http.server 8000` and open http://localhost:8000.
