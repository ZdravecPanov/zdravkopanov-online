# Zdravko Panov — DevOps Portfolio

A production-ready, single-page portfolio for a DevOps/System Administrator profile. Built as a fast, static site designed for GitHub Pages or any static host.

## Architecture
- Static single-page application served as plain HTML, CSS, and JavaScript.
- All content lives in `index.html` with no backend dependencies.
- Assets are referenced locally; external CDNs are used for fonts and icons.

## Stack
- HTML5 + CSS3 + Vanilla JavaScript
- Google Fonts (Inter)
- Font Awesome icons (CDN)
- GitHub Pages compatible hosting

## Deployment

### GitHub Pages
1. Push to `main` (or your default branch).
2. In GitHub: Settings → Pages → Deploy from branch → select branch and root.
3. If using a custom domain, keep the `CNAME` file updated.

### Any static host
- Upload the repository contents and serve `index.html` as the entry file.

## Local Development
Use any static file server. Example:

```bash
cd /home/zdrav/projects/zdravkopanov-online
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## HTML Validation
This repo includes a GitHub Actions workflow that validates HTML on every push and pull request.

## Suggested Folder Structure (Future)
If this grows beyond a single page, consider:

```
./
  src/
    index.html
    styles/
      main.css
    scripts/
      main.js
  public/
    assets/
      images/
      icons/
    CNAME
  .github/
    workflows/
  README.md
```

## Roadmap
- Add 1–2 detailed project case studies with diagrams and outcomes.
- Extract CSS/JS into dedicated files for easier maintenance.
- Add accessibility and performance audit checks.
- Expand CI with linting and link checks.

## Contributing
This is a personal portfolio. Issues and suggestions are welcome.
