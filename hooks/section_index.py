"""
MkDocs hook: after each build, create index.html redirects for section
directories that lack one, pointing to the section's first page.

This ensures that visiting a navigation section's bare directory URL opens the
first content page rather than a browser directory listing.

Runs on `on_nav` (after the awesome-pages plugin has finalized the navigation)
and reads the *processed* Navigation object, so it works whether the nav is
defined explicitly in mkdocs.yml or generated automatically from the docs/
directory structure + `.pages` files.
"""
import os
import posixpath
from collections import Counter

from mkdocs.structure.nav import Section
from mkdocs.structure.pages import Page

_redirects = {}  # section_dir (relative to site) -> first_page_path (relative to site)


def on_nav(nav, config, files):
    """Collect section-root -> first-page mappings from the resolved nav."""
    _redirects.clear()

    for item in nav.items:
        if not isinstance(item, Section):
            continue  # Top-level page entries (e.g. Home) have no section dir.

        dests = []
        _collect_dests(item, dests)
        if not dests:
            continue

        first_dest = dests[0]
        page_dirs = [posixpath.dirname(d) for d in dests]
        section_dir = _common_ancestor(page_dirs)

        if not section_dir:
            # Fallback for cross-directory sections: use the top-level directory
            # that contains the most pages as the section root.
            tops = [d.split("/")[0] for d in page_dirs if d]
            if tops:
                section_dir = Counter(tops).most_common(1)[0][0]
            if not section_dir:
                section_dir = posixpath.dirname(first_dest)

        if section_dir:
            _redirects[section_dir] = first_dest

    # Returning None leaves the navigation unchanged for downstream handlers.
    return None


def on_post_build(config):
    """Write index.html redirect files into section dirs that lack one."""
    site_dir = config["site_dir"]
    for section_dir, first_page_path in _redirects.items():
        index_path = os.path.join(site_dir, *section_dir.split("/"), "index.html")
        if os.path.exists(index_path):
            continue  # Already has an index page (e.g. from README.md), skip.

        # Relative path from the section dir to the first page.
        first_page_rel = posixpath.relpath(first_page_path, section_dir)

        redirect_html = (
            "<!doctype html>\n"
            "<html>\n"
            "<head>\n"
            f'<meta http-equiv="refresh" content="0; url={first_page_rel}">\n'
            f'<link rel="canonical" href="{first_page_rel}"/>\n'
            f'<script>window.location.replace("{first_page_rel}");</script>\n'
            "</head>\n"
            "<body><p>Redirecting...</p></body>\n"
            "</html>\n"
        )
        os.makedirs(os.path.dirname(index_path), exist_ok=True)
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(redirect_html)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _collect_dests(section, result):
    """Collect all page output dest_paths in a section subtree, in nav order."""
    for child in section.children:
        if isinstance(child, Page):
            if child.file is not None:
                result.append(child.file.dest_path.replace("\\", "/"))
        elif isinstance(child, Section):
            _collect_dests(child, result)


def _common_ancestor(dirs):
    """Return the longest common directory prefix from a list of dir paths."""
    if not dirs:
        return ""
    parts_list = [d.split("/") for d in dirs if d]
    if not parts_list:
        return ""
    common = parts_list[0]
    for parts in parts_list[1:]:
        new_common = []
        for a, b in zip(common, parts):
            if a == b:
                new_common.append(a)
            else:
                break
        common = new_common
    return "/".join(common)
