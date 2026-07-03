# tackled-website

Marketing site for [Tackled](https://tackledapp.com) — a tiny, fast, ADHD-focused
daily to-do app for macOS. Plain HTML/CSS/JS, no build step, no framework, no
dependencies. Deployed via GitHub Pages.

```
index.html      marketing home page
privacy.html    privacy policy
support.html    support / FAQ
styles.css      design system (tokens lifted from the app itself)
script.js       hero momentum-meter demo animation
favicon.svg     site icon
CNAME           custom domain for GitHub Pages (tackledapp.com)
```

## Local preview

No build step — just serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

Push to `main`. GitHub Pages is configured to serve from the repo root on
that branch — commits show up live within a minute or two.

## Custom domain (tackledapp.com)

The `CNAME` file in this repo tells GitHub Pages which domain to serve.
At the domain registrar/DNS provider for tackledapp.com, set:

- **Apex (`tackledapp.com`)** — four `A` records pointing at:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  (optionally `AAAA` records too: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
  `2606:50c0:8002::153`, `2606:50c0:8003::153`)
- **`www.tackledapp.com`** — a `CNAME` record pointing at `lewis-fidlers.github.io`

Then in the repo's GitHub Settings → Pages, enter `tackledapp.com` as the
custom domain and enable **Enforce HTTPS** once DNS has propagated (can take
up to 24h).

## TODO

- [ ] Point the "Download for Mac" buttons (index.html, privacy.html,
      support.html) at the real download URL once Tackled ships — currently `#`.
