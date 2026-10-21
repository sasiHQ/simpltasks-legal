# SimplTasks Legal Center

Standalone privacy policy website for SimplTasks, hosted independently from the main application server. Satisfies Google Play and Apple App Store legal page requirements.

## Pages

| Page | URL | Description |
|------|-----|-------------|
| **Privacy Policy** | `legal.simpl-tasks.com/` | Data collection, third-party services, user rights, CCPA/GDPR compliance |
| **Terms of Service** | `legal.simpl-tasks.com/terms` | Acceptable use, account terms, liability, governing law |
| **Data Deletion Request** | `legal.simpl-tasks.com/data-deletion` | Apple-required account deletion instructions |

## Tech Stack

- **Pure HTML/CSS/JS** — No frameworks, no build step, no dependencies
- **Zero JavaScript tracking** — No analytics, no cookies, no external scripts
- **System font stack** — No external font loading
- **Dark mode** — Automatic via `prefers-color-scheme`, manual override via localStorage
- **Print-friendly** — Optimized CSS for printing legal documents
- **Responsive** — Desktop sidebar + mobile chip-based TOC

## Deployment

Designed for **GitHub Pages** or **Netlify** (free static hosting):

### GitHub Pages

1. Create a repository (public)
2. Push all files from this folder to the repo
3. Enable GitHub Pages in Settings → Pages → Source: `main` branch, root folder
4. Configure DNS:
   - Add a CNAME record: `legal.simpl-tasks.com` → `<username>.github.io`
   - GitHub automatically provisions Let's Encrypt SSL

### Netlify

1. Drag this folder onto [app.netlify.com](https://app.netlify.com)
2. Configure custom domain: `legal.simpl-tasks.com`
3. Netlify automatically provisions Let's Encrypt SSL

## File Structure

```
legal-site/
├── index.html          # Privacy Policy (landing page)
├── terms.html          # Terms of Service
├── data-deletion.html  # Data Deletion Request
├── css/
│   └── style.css       # All styles (light/dark, responsive, print)
├── js/
│   └── main.js         # Scroll-spy, progress bar, back-to-top, dark mode
├── assets/
│   └── favicon.ico     # (add your favicon here)
├── CNAME               # Domain config for GitHub Pages
├── robots.txt          # Allow all, link sitemap
└── README.md           # This file
```

## Store Compliance

### Google Play ✅
- [x] Privacy policy link publicly accessible
- [x] Data collection disclosure
- [x] Third-party service disclosure
- [x] Data deletion mechanism
- [x] HTTPS (via GitHub Pages/Netlify)

### Apple App Store ✅
- [x] Privacy policy link publicly accessible (Guideline 5.1.1)
- [x] Data collection disclosure with nutrition labels
- [x] Third-party service disclosure
- [x] Account deletion mechanism (Guideline 5.1.1(v))
- [x] ATT framework declaration
- [x] HTTPS (via GitHub Pages/Netlify)
- [x] Privacy nutrition label data (CCPA categories table)

## Maintenance

- Update the "Last Updated" date in all three HTML files when policies change
- No server maintenance required — GitHub Pages / Netlify handle uptime, SSL, and CDN
- To test locally: open any HTML file directly in a browser (no server needed)

## Contact

For policy questions: support@thestrategysolution.com