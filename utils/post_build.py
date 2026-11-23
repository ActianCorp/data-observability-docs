#!/usr/bin/env python3
"""
Post-build step for the Zensical site (replaces the MkDocs hooks
``hooks/copy_md_sources.py`` and ``hooks/section_index.py``, because Zensical
does not run MkDocs hooks yet).

Run after ``zensical build``::

    python3 utils/post_build.py [--docs-dir docs] [--site-dir site] [--dry-run]

Steps (all idempotent, safe to re-run):
  1. Copy every source ``.md`` file from docs/ into site/ at the same relative
     path, so raw Markdown is available at predictable public URLs (used by
     in-app docs browsers and for copy-pasting page content into LLMs).
  2. Write an ``index.html`` redirect into each top-level navigation section
     directory that lacks one, pointing at the section's first page, so the bare
     directory URL opens content instead of a directory listing. The sections
     and their order are read from the built navigation (site/index.html).
  3. Remove navigation/metadata config files (``.nav.yml``, ``.meta.yml``) that
     Zensical copies into the output as static files.

Only the Python standard library is used.
"""
import argparse
import os
import posixpath
import shutil
import sys
from collections import Counter
from html.parser import HTMLParser

CONFIG_FILES = {".nav.yml", ".meta.yml"}


# ---------------------------------------------------------------------------
# Step 1: copy Markdown sources
# ---------------------------------------------------------------------------

def copy_md_sources(docs_dir, site_dir, dry_run=False):
    count = 0
    for root, _dirs, files in os.walk(docs_dir):
        for filename in files:
            if not filename.endswith(".md"):
                continue
            src = os.path.join(root, filename)
            dst = os.path.join(site_dir, os.path.relpath(src, docs_dir))
            targets = [dst]
            if filename == "README.md":
                # Zensical's llms.txt links folder index pages as index.md.
                targets.append(os.path.join(os.path.dirname(dst), "index.md"))
            count += 1
            if dry_run:
                continue
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            for target in targets:
                shutil.copy2(src, target)
    return count


# ---------------------------------------------------------------------------
# Step 2: section index redirects
# ---------------------------------------------------------------------------

class _NavParser(HTMLParser):
    """Collect, per top-level nav section, the page hrefs in nav order.

    Works on the primary navigation markup (Material-style classes) of the
    built home page: ``<nav class="md-nav md-nav--primary">`` containing nested
    ``<li class="md-nav__item ...">`` elements.
    """

    def __init__(self):
        super().__init__()
        self.in_primary = False
        self.nav_depth = 0      # nesting depth of <nav> inside the primary nav
        self.li_stack = []      # one entry per open <li>: section index or None
        self.sections = []      # list of lists of hrefs (top-level sections only)
        self.top_pages = []     # hrefs of top-level entries that are plain pages

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        classes = (a.get("class") or "").split()
        if tag == "nav":
            if not self.in_primary and "md-nav--primary" in classes:
                self.in_primary = True
                self.nav_depth = 1
            elif self.in_primary:
                self.nav_depth += 1
            return
        if not self.in_primary:
            return
        if tag == "li":
            if len(self.li_stack) == 0 and "md-nav__item--nested" in classes:
                self.sections.append([])
                self.li_stack.append(len(self.sections) - 1)
            else:
                self.li_stack.append(None)
        elif tag == "a":
            href = a.get("href")
            if href and self.li_stack and self.li_stack[0] is not None:
                self.sections[self.li_stack[0]].append(href)
            elif href and len(self.li_stack) == 1:
                self.top_pages.append(href)

    def handle_endtag(self, tag):
        if not self.in_primary:
            return
        if tag == "nav":
            self.nav_depth -= 1
            if self.nav_depth == 0:
                self.in_primary = False
        elif tag == "li" and self.li_stack:
            self.li_stack.pop()


def _normalise(href):
    """Return a site-relative page path for an href, or None if not a page."""
    if "://" in href or href.startswith(("#", "mailto:")):
        return None
    href = href.split("#", 1)[0].split("?", 1)[0]
    path = posixpath.normpath(href)  # collapses ./ ; hrefs are relative to site root
    if not path.endswith(".html") or path.startswith(".."):
        return None
    return path


def _common_ancestor(dirs):
    parts_list = [d.split("/") for d in dirs if d]
    if not parts_list:
        return ""
    common = parts_list[0]
    for parts in parts_list[1:]:
        new_common = []
        for x, y in zip(common, parts):
            if x != y:
                break
            new_common.append(x)
        common = new_common
    return "/".join(common)


def section_redirects(site_dir):
    """Map section directory -> first page path (both relative to site/)."""
    home = os.path.join(site_dir, "index.html")
    if not os.path.exists(home):
        raise SystemExit(f"error: {home} not found; run `zensical build` first")
    parser = _NavParser()
    with open(home, encoding="utf-8") as fh:
        parser.feed(fh.read())

    redirects = {}
    for hrefs in parser.sections:
        dests = [p for p in map(_normalise, hrefs) if p]
        if not dests:
            continue
        page_dirs = [posixpath.dirname(d) for d in dests]
        section_dir = _common_ancestor(page_dirs)
        if not section_dir:
            # Cross-directory section: use the top-level dir with the most pages.
            tops = [d.split("/")[0] for d in page_dirs if d]
            section_dir = Counter(tops).most_common(1)[0][0] if tops else ""
        if section_dir:
            redirects[section_dir] = dests[0]

    # A top-level page that lives in a sub-folder (e.g. a section flattened to a
    # single entry) keeps its old folder URL working via a redirect too.
    for href in parser.top_pages:
        page = _normalise(href)
        if page and posixpath.dirname(page):
            redirects.setdefault(posixpath.dirname(page), page)
    return redirects


def write_section_redirects(site_dir, dry_run=False):
    written = []
    for section_dir, first_page in section_redirects(site_dir).items():
        index_path = os.path.join(site_dir, *section_dir.split("/"), "index.html")
        if os.path.exists(index_path):
            continue  # Section already has an index page.
        rel = posixpath.relpath(first_page, section_dir)
        html = (
            "<!doctype html>\n<html>\n<head>\n"
            f'<meta http-equiv="refresh" content="0; url={rel}">\n'
            f'<link rel="canonical" href="{rel}"/>\n'
            f'<script>window.location.replace("{rel}");</script>\n'
            "</head>\n<body><p>Redirecting...</p></body>\n</html>\n"
        )
        written.append(index_path)
        if dry_run:
            continue
        os.makedirs(os.path.dirname(index_path), exist_ok=True)
        with open(index_path, "w", encoding="utf-8") as fh:
            fh.write(html)
    return written


# ---------------------------------------------------------------------------
# Step 3: remove config files from the output
# ---------------------------------------------------------------------------

def remove_config_files(site_dir, dry_run=False):
    removed = []
    for root, _dirs, files in os.walk(site_dir):
        for filename in files:
            if filename in CONFIG_FILES:
                path = os.path.join(root, filename)
                removed.append(path)
                if not dry_run:
                    os.remove(path)
    return removed


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--site-dir", default="site")
    ap.add_argument("--dry-run", action="store_true", help="report only; change nothing")
    args = ap.parse_args(argv)

    if not os.path.isdir(args.site_dir):
        print(f"error: site dir '{args.site_dir}' not found; run `zensical build` first",
              file=sys.stderr)
        return 1

    n = copy_md_sources(args.docs_dir, args.site_dir, args.dry_run)
    redirects = write_section_redirects(args.site_dir, args.dry_run)
    removed = remove_config_files(args.site_dir, args.dry_run)
    prefix = "[dry-run] would: " if args.dry_run else ""
    print(f"{prefix}copied {n} markdown sources")
    print(f"{prefix}wrote {len(redirects)} section redirects: "
          + ", ".join(os.path.relpath(p, args.site_dir) for p in redirects))
    print(f"{prefix}removed {len(removed)} config files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
