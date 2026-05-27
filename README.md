# Actian AI Analyst — Documentation Portal

> Built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) · Light/dark theme · Hosted on GitHub Pages

**Repository:** https://github.com/wobby-ai/actian-ai-analyst-docs  
**Branch:** `main`  
**Live site:** https://docs.actian.com/ai-analyst/

---

## About This Repository

This repository contains the MkDocs-based documentation portal for **Actian AI Analyst** — a natural language analytics tool that lets you ask questions about your data and get instant, accurate answers.

---

## What's Included

| Feature | Description |
|---|---|
| **MkDocs Material 9.7+** | Modern Material Design theme with light/dark toggle |
| **Navigation** | Tabs, sections, breadcrumbs, instant loading, custom sidebar |
| **Search** | Enhanced search with highlighting, suggestions, and sharing |
| **Diagrams** | Mermaid diagram support |
| **API docs** | Swagger UI tag plugin for OpenAPI specs |
| **Versioning** | Multi-version support via `mike` |
| **SEO** | Auto-generated meta descriptions, robots.txt, sitemap |
| **Code blocks** | Copy button, syntax highlighting, annotations |
| **Custom 404** | Branded 404 page |
| **Edit on GitHub** | Per-page edit button linking to the `main` branch on GitHub |

---

## Project Structure

```
ai-analyst-docs/
├── mkdocs.yml                  # Main MkDocs configuration
├── requirements.txt            # Python dependencies
├── makefile                    # Shortcuts for common tasks
├── docs/                       # All documentation content
│   ├── index.md                # Homepage (landing page)
│   ├── .pages                  # Top-level navigation order
│   ├── robots.txt              # Search engine directives
│   ├── assets/                 # Logos, homepage images, site-wide CSS
│   ├── stylesheets/            # Component CSS (nav, DX styles, extra)
│   ├── javascripts/            # Custom JS (nav, search, mermaid)
│   ├── quick-start/            # Getting started guides
│   ├── account/                # Account & 2FA settings
│   ├── agent/                  # Creating and working with agents
│   ├── ai-analysts/            # AI Analyst creation and monitoring
│   ├── connections/            # Data source connections and catalog
│   ├── semantic-layer/         # Semantic layer, metrics, SemQL
│   ├── steward-ai-agent/       # Steward AI agent docs
│   ├── settings/               # Billing, members, integrations, etc.
│   ├── governance/             # Audit logs, data handling, security
│   └── public-api/             # API reference and keys
├── theme_overrides/            # Custom theme templates
│   ├── main.html               # Base template (header, scripts)
│   ├── home.html               # Landing page template
│   ├── home-blocks.html        # Landing page hero & content blocks
│   ├── 404.html                # Custom 404 page
│   ├── assets/stylesheets/     # Landing page & theme CSS
│   └── partials/               # Partial templates
├── hooks/                      # MkDocs build hooks
│   └── custom_lexers.py        # Custom syntax highlighters
└── site/                       # Built output (auto-generated, do not edit)
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ActianCorp/ai-analyst-docs.git
cd ai-analyst-docs
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

This installs:

| Package | Purpose |
|---|---|
| `mkdocs-material` | Material Design theme |
| `mike` | Documentation versioning |
| `mkdocs-awesome-pages-plugin` | Custom navigation ordering |
| `mkdocs-git-revision-date-localized-plugin` | "Last updated" dates on pages |
| `mkdocs-minify-plugin` | HTML minification for production |
| `mkdocs-swagger-ui-tag` | Swagger/OpenAPI rendering |
| `mkdocs-meta-descriptions-plugin` | Auto SEO meta descriptions |

---

## Running Locally

### Option A: mkdocs serve (recommended for authoring)

```bash
mkdocs serve -a localhost:8000
```

Opens a live-reload development server at **http://localhost:8000**. Changes to any file under `docs/` are reflected instantly.

### Option B: Dirty reload (faster for large sites)

```bash
mkdocs serve --dirtyreload
```

Only rebuilds changed pages — faster during active writing.

---


## Building the Site

```bash
mkdocs build --clean
```

This ensures a clean build by removing any old files from the `site/` directory before generating the static site.

To preview the built output locally:

```bash
python -m http.server 8080 --directory site
```

Then open **http://127.0.0.1:8080**.
---

## Checking for Broken Links

MkDocs does not provide a built-in `mkdocs check` command. To check for broken links, you can:

- **Manual check:** Run `mkdocs serve` and click through your site in the browser.
- **Automated check:** Use a plugin like [`mkdocs-link-check`](https://github.com/daGrevis/mkdocs-link-check) or an external tool such as [`lychee`](https://github.com/lycheeverse/lychee) to scan for broken links.

**Example with mkdocs-link-check:**

1. Install the plugin:
   ```bash
   pip install mkdocs-link-check
   ```
2. Add to your `mkdocs.yml` plugins section:
   ```yaml
   plugins:
     - link-check
   ```
3. Run:
   ```bash
   mkdocs link-check
   ```

**Note:** The `site/` directory is auto-generated and should not be edited manually.

---

## Adding Documentation

### Step 1: Create a section folder and Markdown files

```
docs/
├── my_section/
│   ├── index.md            # Section landing page
│   ├── my-guide.md         # A guide page
│   └── images/             # Section-specific images
```

### Step 2: Write your content

Each page can include optional front matter:

```markdown
---
title: My Page Title
description: A brief description for search engines.
---

# My Page Title

Content supports:
- **Admonitions** — `!!! note`, `!!! warning`, `!!! tip`
- **Code blocks** — syntax highlighting + copy button
- **Mermaid diagrams** — inside ```mermaid``` fenced blocks
- **Tabbed content** — `=== "Tab 1"` syntax
```

### Step 3: Control navigation order

Create a `.pages` file in your section folder:

```yaml
# docs/my_section/.pages
nav:
  - index.md
  - my-guide.md
```

### Step 4: Preview and commit

```bash
mkdocs serve -a localhost:8000   # Preview at http://localhost:8000
git add .
git commit -m "docs: add my_section"
git push origin main
```

---

## Customizing the Theme

### Colors and branding

| File | What it controls |
|---|---|
| `theme_overrides/assets/stylesheets/actian-landing.css` | Landing page, CSS variables, dark mode |
| `docs/assets/stylesheets/style.css` | Header, tabs, search bar, general overrides |
| `docs/stylesheets/dx_style.css` | Search enhancements, syntax highlighting |
| `docs/stylesheets/comprehensive-nav.css` | Custom sidebar navigation styles |

### Logos and images

- **Site logo:** `docs/assets/images/actian-logo.svg`
- **Favicon:** `docs/assets/favicon.png`
- **Landing page images:** `docs/assets/homepage-images/`
- **Content images:** `docs/assets/gitbook/`

### Templates

| File | Purpose |
|---|---|
| `theme_overrides/main.html` | Header, scripts |
| `theme_overrides/home.html` | Landing page layout |
| `theme_overrides/home-blocks.html` | Hero banner and content blocks |
| `theme_overrides/404.html` | Custom 404 error page |

### Configuration (`mkdocs.yml`)

Key sections:

- **`site_name`** — Documentation title
- **`site_url`** — Production URL
- **`repo_url`** — GitHub repo link (drives the repo icon in the header)
- **`edit_uri`** — Path used to build the "Edit on GitHub" links
- **`theme.palette`** — Light/dark mode configuration
- **`theme.features`** — Navigation behaviour toggles
- **`plugins`** — Search, versioning, minification, etc.
- **`extra_css` / `extra_javascript`** — Custom stylesheets and scripts

---

## Edit on GitHub

Every page on the documentation site has a **pencil (✏️) edit icon** in the top-right corner. Clicking it takes you directly to the corresponding `.md` source file on GitHub, so you can propose corrections without cloning the repo.

### How it works

1. **Click the edit icon** on any documentation page.  
   You are taken to the source `.md` file on GitHub (`main` branch).

2. **Edit the file** in GitHub's web editor:
   - Click the pencil icon in the file toolbar.
   - Make your changes to the Markdown content.

3. **Commit your changes:**
   - Scroll down to **Commit changes**.
   - Add a short description of your change.
   - Select **"Create a new branch and open a pull request"** if you do not have write access to `main`.
   - If you have write access, you can commit directly to `main`.

4. **Open a Pull Request** (if on a feature branch):
   - Target branch: `main`
   - Describe your change and assign a reviewer.

### Edit URL format

The edit button points to:

```
https://github.com/ActianCorp/ai-analyst-docs/edit/main/docs/{page-path}
```

---

## Versioning with Mike

```bash
# Deploy current docs as version "1.0" aliased as "latest"
mike deploy --push --update-aliases 1.0 latest

# List all deployed versions
mike list

# Set the default version redirect
mike set-default latest

# Serve versioned docs locally
mike serve
```

---

## Key Commands

| Command | Description |
|---|---|
| `mkdocs serve -a localhost:8000` | Start live-reload dev server |
| `mkdocs serve --dirtyreload` | Faster dev server (rebuilds only changed pages) |
| `mkdocs build` | Build the static site to `site/` |
| `mkdocs build --strict` | Build with strict mode (fail on warnings) |
| `mike deploy <version>` | Deploy a versioned build to gh-pages |
| `mike serve` | Serve versioned docs locally |

---

## Contributing

1. Fork or clone the repository
2. Create a feature branch: `git checkout -b feature/my-update`
3. Make your changes in the `docs/` directory
4. Preview locally with `mkdocs serve -a localhost:8000`
5. Commit and push to GitHub
6. Open a Pull Request targeting `main`

> **Note:** Only edit files in `docs/` unless you are intentionally modifying the theme, build config, or hooks.

---

## Useful Resources

- [MkDocs Documentation](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Material Reference](https://squidfunk.github.io/mkdocs-material/reference/)
- [Awesome Pages Plugin](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin)
- [mike — Versioning](https://github.com/jimporter/mike)
- [Actian AI Analyst](https://docs.actian.com/ai-analyst/)
