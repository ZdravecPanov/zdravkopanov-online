# Zdravko Panov — DevOps Portfolio

A modern DevOps portfolio with case study pages, designed as a fast static site for GitHub Pages or any static host.

## What’s Included
- `index.html` — main portfolio page
- `styles.css` — shared styling for the landing page and case studies
- `app.js` — nav behavior and CV modal
- `case-studies/` — structured project stories with outcomes and diagrams
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Local Preview
Use any static file server. Example:

```bash
cd /home/zdrav/projects/zdravkopanov-online
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Customize Content
Quick edits you’ll likely want:
- Replace metrics and outcomes in `index.html` and `case-studies/*.html`.
- Update contact details in `index.html`.
- Swap or add new case study pages under `case-studies/`.
- Replace `Zdravko_Panov_CV.pdf` with your latest CV.

## Deploy
### GitHub Pages
1. Push to `main`.
2. In GitHub: Settings → Pages → Source → GitHub Actions.
3. The workflow will publish the site automatically.

### Any static host
Upload the repository contents and serve `index.html` as the entry file.

## Suggested Content Checklist
- 3–5 case studies with clear results and architecture diagrams.
- Metrics for provisioning speed, deployment frequency, or MTTR.
- Links to repos, demos, or writeups.
- Updated CV and certifications.

## Roadmap Ideas
- Add a dedicated “Work Experience” timeline.
- Include a diagram library or screenshots for each project.
- Add a lightweight CI job for HTML validation and link checks.

## License
Personal portfolio. Feel free to fork and adapt.
