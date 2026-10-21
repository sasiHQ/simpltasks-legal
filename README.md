# SimplTasks Legal Center

Standalone privacy policy site for SimplTasks, published to satisfy the Google Play and
Apple App Store legal-page requirements.

Owner of record: **Strategy Advisory Solutions Inc** - 5200 Yonge Street, Toronto, Ontario
M2N 5P6, Canada. Governing law: Ontario.

## Current status (21 Oct 2026)

| Item | State |
|---|---|
| Live now (interim) | `https://simpl-tasks.com/legal/` - nginx serving `/usr/share/nginx/legal/` on the app host |
| Redirect | `https://simpl-tasks.com/privacy-policy` -> `301` -> `/legal/` |
| Final home (SOW 5B) | GitHub Pages project site `sasihq.github.io/simpltasks-legal`, custom domain `legal.simpl-tasks.com` |
| Outstanding | `CNAME legal -> sasihq.github.io` in the GoDaddy DNS account (client action); enabling Pages needs repo admin |

The interim nginx delivery satisfies both stores today, but it is **not** the SOW-compliant
end state: 5B.1 requires the legal site to be independent of the main application so the
pages stay reachable while the app server is maintained. Move to GitHub Pages once DNS lands.

## Pages

| Page | Local file | Live URL |
|---|---|---|
| Privacy Policy | `index.html` | `https://simpl-tasks.com/legal/` |
| Terms of Service | `terms.html` | `https://simpl-tasks.com/legal/terms` |
| Data Deletion Request | `data-deletion.html` | `https://simpl-tasks.com/legal/data-deletion` |

Canonical URLs, `og:url` and `sitemap.xml` all target `https://legal.simpl-tasks.com/...`.
That is deliberate - they become correct the moment the subdomain exists, so do not rewrite
them to the interim path.

## Legal content - keep these consistent

| Field | Value |
|---|---|
| Legal entity | Strategy Advisory Solutions Inc |
| Address | 5200 Yonge Street, Toronto, Ontario M2N 5P6, Canada |
| Governing law / venue | Province of Ontario and the federal laws of Canada applicable in Ontario; courts of Ontario, sitting in Toronto |
| Privacy regimes cited | PIPEDA (Canada), GDPR / UK GDPR, CCPA / CPRA |
| Apple Team ID | 5UD3L6N2B5 |

The entity name appears in **six** places across `index.html` and `terms.html`; the address in
three. Change them together, and bump `Last updated` in all three pages plus the three
`lastmod` values in `sitemap.xml`.

Never reintroduce `1209 Orange Street, Wilmington, Delaware` or a Delaware governing-law
clause: that street address is a registered-agent mass-registration address, and Delaware law
does not match the entity verified on the Apple Developer account.

## Tech stack

- **Pure HTML/CSS/JS** - no frameworks, no build step, no dependencies
- **Zero JavaScript tracking** - no analytics, no cookies, no external scripts
- **Self-hosted Inter** - 48 KB variable WOFF2 served from this origin (`css/fonts/`), preloaded from each page; no Google Fonts, no CDN, so no visitor IP leaves to a third party
- **Dark mode** - automatic via `prefers-color-scheme`, manual override via localStorage
- **CSS-only animated data-flow** - dashed rails and the breathing node ring are pure CSS (`repeating-linear-gradient` plus `@keyframes`); no SVG, no JS. Both animations stop under `prefers-reduced-motion: reduce`
- **Print-friendly** CSS, responsive desktop sidebar / mobile chip TOC

## Deployment

### GitHub Pages (target for 5B)

1. Settings -> Pages -> Source: `main` branch, root folder
2. DNS: add `CNAME` record `legal` -> `sasihq.github.io` (the `CNAME` file here already holds the domain)
3. GitHub issues the TLS certificate once the record resolves

`legal.simpl-tasks.com` sits under an HSTS `includeSubDomains` policy, so the name must never
be reachable over plain HTTP. Land DNS and the certificate together; never test over `http://`.

### Interim nginx delivery (current)

Files staged at `/usr/share/nginx/legal/`, root-owned, mode 0644, served by the existing
server block in `/etc/nginx/nginx.conf`:

```nginx
location ^~ /legal/ {
    root /usr/share/nginx;
    index index.html;
    try_files $uri $uri/ $uri.html =404;
}
location = /legal          { return 301 /legal/; }
location = /privacy-policy { return 301 /legal/; }
```

- Apply: `sudo nginx -t && sudo systemctl reload nginx` - reload, never restart
- Rollback: `sudo cp -a /etc/nginx/nginx.conf.bak-<timestamp> /etc/nginx/nginx.conf && sudo nginx -t && sudo systemctl reload nginx`
- **Verify content, not status codes.** The app's SPA fallback (`try_files $uri /index.html`)
  answers `200` for unknown paths, so a `200` proves nothing. Assert the body contains
  `Privacy Policy` and does *not* contain `flutter_bootstrap`.

### Netlify (alternative)

1. Drag this folder onto [app.netlify.com](https://app.netlify.com)
2. Configure custom domain `legal.simpl-tasks.com`
3. Netlify provisions Let's Encrypt SSL

## File structure

```
legal-site/
|-- index.html          # Privacy Policy (landing page)
|-- terms.html          # Terms of Service
|-- data-deletion.html  # Data Deletion Request
|-- css/style.css
|-- js/main.js
|-- assets/             # favicon.svg, favicon.png, logo.svg, logo.png
|-- CNAME               # legal.simpl-tasks.com (GitHub Pages)
|-- robots.txt
|-- sitemap.xml
`-- README.md
```

## Store compliance

### Google Play

- [x] Privacy policy publicly accessible - `https://simpl-tasks.com/legal/`
- [x] Data collection and third-party service disclosure
- [x] Data deletion mechanism
- [x] HTTPS

### Apple App Store

- [x] Privacy policy link (Guideline 5.1.1)
- [x] Nutrition labels and third-party service disclosure
- [x] Account deletion (Guideline 5.1.1(v)) - `/legal/data-deletion`
- [x] ATT framework declaration
- [x] HTTPS

## Maintenance

- Bump `Last updated` in all three HTML pages and all three `lastmod` values in `sitemap.xml`
- Interim hosting is plain nginx; the final GitHub Pages setup needs no server maintenance
- Test locally by opening any HTML file - all asset paths are relative

## Contact

For policy questions: support@thestrategysolution.com
