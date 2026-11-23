# Actian Data Observability — Documentation Portal

> Built with [Zensical](https://zensical.org/) (Material for MkDocs look and feel, `mkdocs.yml` configuration) · Light/dark theme · Deployed to GitHub Pages and production via Jenkins

**Repository:** https://github.com/ActianCorp/data-observability-docs
**Branches:** `main` (GitHub Pages) · `release/data-observability-1.0.doc` (production)
**GitHub Pages:** https://actiancorp.github.io/data-observability-docs/
**Production site:** https://docs.actian.com/actian-data-observability/

---

## About This Repository

This repository contains the MkDocs-based documentation portal for **Actian Data Observability** — a data quality analysis and monitoring platform that helps data teams proactively understand, detect, and resolve data quality issues without writing code, SQL, or rules.

---

## What's Included

| Feature | Description |
|---|---|
| **Zensical** | Static site generator that reads `mkdocs.yml`; classic Material theme variant, default sidebar navigation, indigo palette |
| **Auto-generated navigation** | The `awesome-nav` plugin builds the nav from the `docs/` folder structure and per-folder `.nav.yml` files — new `.md` files appear automatically |
| **Search** | Enhanced search with highlighting, sharing, and suggestions |
| **Diagrams** | Mermaid diagram support |
| **Image lightbox** | `glightbox` plugin for zoomable images |
| **"Last updated" dates** | `git-revision-date-localized` plugin |
| **SEO** | Auto-generated meta descriptions (`meta-descriptions` plugin) |
| **Page feedback** | "Was this page helpful?" thumbs up/down widget on every page |
| **View as Markdown** | Every page links to its own raw `.md` source (copied into `site/` by [`utils/post_build.py`](utils/post_build.py)) |
| **Code blocks** | Copy button, syntax highlighting, annotations |
| **Custom 404** | Branded 404 page |
| **LLM-friendly output** | `llms.txt` and `llms-full.txt` are generated at the site root by the `llmstxt` plugin |
| **Minified HTML** | `minify` plugin |

---

## Project Structure

```
data-observability-docs/
├── mkdocs.yml                  # Main MkDocs configuration
├── requirements.txt            # Python dependencies
├── makefile                    # Shortcuts for common tasks
├── Jenkinsfile                 # Production build/deploy pipeline (IIS via aws-docserver)
├── .github/workflows/deploy.yml  # GitHub Pages build/deploy pipeline
├── docs/                       # All documentation content
│   ├── index.md                # Homepage
│   ├── .nav.yml                # Top-level navigation order
│   ├── web.config              # IIS MIME type for .md (needed for "View as Markdown" in prod)
│   ├── assets/                 # Logos, images, site-wide CSS
│   ├── stylesheets/             # Component CSS (nav, DX styles, extra, toast)
│   ├── javascripts/             # Custom JS (search enhancements, mermaid init, misc)
│   ├── getting-started/        # Connecting data, monitoring, alerts, onboarding
│   ├── deployment-models/      # SaaS / VPC deployment docs
│   ├── data-quality-rules/     # Rule authoring and expressions
│   ├── upload-data/            # Upload API and data source guides
│   ├── admin-apis/             # Admin API reference
│   ├── source-apis/            # Source API reference
│   ├── api-reference/          # Public API reference
│   ├── api-misc/               # Misc API integrations
│   └── telmai-releases/        # Release notes
├── theme_overrides/            # Custom theme templates
│   ├── main.html                # Base template (header, "View as Markdown", prev/next nav)
│   ├── home.html / home-blocks.html  # Landing page template (currently unused — index.md renders via main.html)
│   ├── 404.html                 # Custom 404 page
│   ├── api-reference.html       # Redoc-based API reference viewer template
│   └── partials/                # Partial templates (footer, comments)
├── hooks/                      # MkDocs build hooks (not run by Zensical)
│   └── custom_lexers.py         # Custom syntax highlighters (inactive until Zensical supports hooks)
└── site/                       # Built output (auto-generated, do not edit)
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ActianCorp/data-observability-docs.git
cd data-observability-docs
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

This requires **Python 3.11 or newer** and installs:

| Package | Purpose |
|---|---|
| `zensical` | Static site generator. Search, awesome-nav, tags, glightbox, git-revision-date-localized, meta-descriptions, minify and llmstxt are built in. |
| `mkdocs-material` | Only supplies the emoji helpers referenced in `mkdocs.yml` |

Zensical does not run MkDocs plugins or hooks. `mike`, `mkdocs-swagger-ui-tag` and `plantuml-markdown` were dropped because nothing in `docs/` uses them.

---

## Running Locally

```bash
zensical serve -a localhost:8000
```

Opens a live-reload development server at **http://localhost:8000**. Changes to any file under `docs/` are reflected instantly.

---

## Building the Site

```bash
zensical build --clean
python3 utils/post_build.py
```

`--clean` clears Zensical's cache. `utils/post_build.py` copies the raw `.md` sources into `site/` and writes redirect `index.html` files for navigation sections (the work the old MkDocs hooks did); run it after every build.

To preview the built output locally:

```bash
python -m http.server 8080 --directory site
```

Then open **http://127.0.0.1:8080**.

**Note:** The `site/` directory is auto-generated and should not be edited manually.

---

## Adding Documentation

### Step 1: Create a section folder and Markdown files

```
docs/
├── my-section/
│   ├── my-section.md       # Section landing page
│   └── my-guide.md         # A guide page
```

### Step 2: Control navigation order

Navigation is generated automatically from the folder structure. To control order/titles for a folder, add a `.nav.yml` file:

```yaml
# docs/my-section/.nav.yml
nav:
  - my-section.md
  - my-guide.md
  - ...
```

The trailing `...` is a catch-all so new pages not explicitly listed still appear in the nav.

### Step 3: Preview and commit

```bash
zensical serve -a localhost:8000   # Preview at http://localhost:8000
git add .
git commit -m "docs: add my-section"
git push origin main
```

---

## Deployment

This repo deploys to **two** places, from **two different branches**:

| Target | Branch | Pipeline | Trigger |
|---|---|---|---|
| GitHub Pages | `main` | `.github/workflows/deploy.yml` | Push to `main` |
| Production (`docs.actian.com`) | `release/data-observability-1.0.doc` | `Jenkinsfile` (builds, then deploys via the `aws-docserver` agent to IIS) | Jenkins job run (manual/webhook) |

Changes destined for production must land on `release/data-observability-1.0.doc`, not just `main` — merge or PR your changes into that branch once verified on `main`/GitHub Pages.

`docs/web.config` registers the `.md` MIME type with IIS so raw Markdown links (used by "View as Markdown") don't 404 in production — GitHub Pages doesn't need this, but IIS does.

---

## Customizing the Theme

### Styles

| File | What it controls |
|---|---|
| `docs/assets/stylesheets/style.css` | Header, tabs, search bar, general overrides |
| `docs/stylesheets/dx_style.css` | Table styling, footer prev/next nav |
| `docs/stylesheets/extra.css` | Main theme: colors, header, sidebar/TOC, typography, code blocks, feedback, "View as Markdown", Support pill |
| `docs/stylesheets/toast-override.css` | Copy-to-clipboard toast styling |

### Logos and images

- **Site logo:** `docs/assets/images/actian-logo.svg`
- **Favicon:** `docs/assets/favicon.png`

### Templates

| File | Purpose |
|---|---|
| `theme_overrides/main.html` | Header, "View as Markdown" link, prev/next footer nav |
| `theme_overrides/404.html` | Custom 404 error page |
| `theme_overrides/api-reference.html` | Redoc-based API reference viewer (not currently wired to any page) |

### Configuration (`mkdocs.yml`)

Key sections:

- **`site_name`** / **`site_url`** — Documentation title and production URL
- **`repo_url`** / **`repo_name`** — Drives the "Support" button in the header
- **`theme.palette`** — Light/dark mode configuration (indigo)
- **`theme.features`** — Navigation behavior toggles
- **`plugins`** — Search, navigation, image lightbox, revision dates, meta descriptions
- **`extra.analytics.feedback`** — Page feedback widget config
- **`extra_css` / `extra_javascript`** — Custom stylesheets and scripts
- **`hooks`** — MkDocs hooks; ignored by Zensical (see `utils/post_build.py`)

---

## Contributing

1. Clone the repository
2. Create a feature branch: `git checkout -b feature/my-update`
3. Make your changes in the `docs/` directory
4. Preview locally with `zensical serve -a localhost:8000`
5. Commit and push to GitHub
6. Open a Pull Request targeting `main`
7. Once verified, open a follow-up PR from `main` into `release/data-observability-1.0.doc` to ship to production

> **Note:** Only edit files in `docs/` unless you are intentionally modifying the theme, build config, or hooks.

---

## Useful Resources

- [Zensical Documentation](https://zensical.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Material Reference](https://squidfunk.github.io/mkdocs-material/reference/)
- [Awesome Nav Plugin](https://lukasgeiter.github.io/mkdocs-awesome-nav/)
- [Actian Data Observability](https://docs.actian.com/actian-data-observability/)
