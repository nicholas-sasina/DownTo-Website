# DownTo Website

Static marketing website for DownTo, built with plain HTML, CSS, and JavaScript for GitHub Pages.

## Files

- `index.html`: landing page
- `privacy.html`: privacy policy placeholder
- `terms.html`: terms of service placeholder
- `support.html`: support and contact page
- `styles.css`: shared responsive styling with light and dark mode
- `script.js`: mobile navigation, reveal animation, and footer year
- `assets/`: logo, optimized favicon files, and app tab artwork copied from the app asset catalog

## GitHub Pages

1. Commit and push the `website` directory.
2. In GitHub, open the repository settings.
3. Go to **Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Select the branch you want to publish.
6. Select `/website` as the publishing folder if your repository supports it.
7. If `/website` is not available, either rename this folder to `docs` and select `/docs`, publish from the repository root, or use a GitHub Actions Pages workflow that uploads `website`.

Before publishing, replace `support@example.com`, the placeholder App Store URL, and the starter legal text.
