"""
MkDocs hook: generate sidebar structure data for the custom comprehensive nav.

Runs on `on_nav` (after the awesome-pages plugin has finalized the navigation)
and writes docs/javascripts/comprehensive-nav-structure.js from the *processed*
Navigation object. This means the custom sidebar always stays in sync with the
navigation regardless of how it was produced -- whether from an explicit `nav`
in mkdocs.yml or auto-generated from the docs/ directory tree + `.pages` files.

Because it reads the resolved nav (not config['nav']), adding a new .md file
that awesome-pages picks up automatically also flows into the custom sidebar.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import mkdocs.utils
import mkdocs.utils.meta
from mkdocs.structure.nav import Link, Section
from mkdocs.structure.pages import Page


OUT_REL_PATH = Path("javascripts/comprehensive-nav-structure.js")


def on_nav(nav, config, files):
    docs_dir = Path(config["docs_dir"])
    out_path = docs_dir / OUT_REL_PATH

    sections = _build_sections(nav.items)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_js = (
        "(function () {\n"
        "  window.CN_SECTIONS = "
        + json.dumps(sections, indent=2)
        + ";\n"
        "})();\n"
    )
    out_path.write_text(out_js, encoding="utf-8")

    # Returning None leaves the navigation unchanged for downstream handlers.
    return None


def _build_sections(items: list[Any]) -> list[dict[str, Any]]:
    sections: list[dict[str, Any]] = []

    for item in items:
        if isinstance(item, Page):
            href = _page_href(item)
            sections.append(
                {
                    "key": _section_key_from_href(href),
                    "label": _item_title(item),
                    "href": href,
                    "pages": [],
                }
            )
        elif isinstance(item, Section):
            pages = _build_pages(item.children)
            href = _first_href_from_pages(pages) or "index.html"
            sections.append(
                {
                    "key": _section_key_from_href(href),
                    "label": _item_title(item),
                    "href": href,
                    "pages": pages,
                }
            )
        elif isinstance(item, Link):
            sections.append(
                {
                    "key": "",
                    "label": item.title or "",
                    "href": item.url or "",
                    "pages": [],
                }
            )
    return sections


def _build_pages(items: list[Any]) -> list[dict[str, Any]]:
    pages: list[dict[str, Any]] = []
    for item in items:
        if isinstance(item, Page):
            pages.append({"name": _item_title(item), "href": _page_href(item)})
        elif isinstance(item, Section):
            child_pages = _build_pages(item.children)
            href = _first_href_from_pages(child_pages) or "index.html"
            pages.append(
                {
                    "name": _item_title(item),
                    "href": href,
                    "pages": child_pages,
                }
            )
        elif isinstance(item, Link):
            pages.append({"name": item.title or "", "href": item.url or ""})
    return pages


def _first_href_from_pages(pages: list[dict[str, Any]]) -> str | None:
    for page in pages:
        href = page.get("href")
        if href:
            return str(href)
    return None


def _page_href(page: Page) -> str:
    # With use_directory_urls: false this is e.g. "section/page.html",
    # relative to the site root and without a leading slash -- exactly the
    # format the custom sidebar JS expects.
    return str(page.url).replace("\\", "/")


def _section_key_from_href(href: str) -> str:
    normalized = href.strip().lstrip("/")
    if normalized in {"index.html", ""}:
        return ""
    first = normalized.split("/", 1)[0]
    return re.sub(r"\.html$", "", first)


def _item_title(item: Any) -> str:
    """Resolve a nav label.

    Sections and explicitly-titled pages already carry their title at this
    point. Pages that were picked up automatically (e.g. via a `...` catch-all)
    may not have a title yet, so derive one from the H1 / front matter /
    filename -- mirroring how MkDocs and awesome-pages resolve page titles.
    """
    if isinstance(item, Section):
        return item.title or ""

    if item.title is not None:
        return item.title

    if isinstance(item, Page):
        return _derive_page_title(item)

    return str(item.title or "")


def _derive_page_title(page: Page) -> str:
    try:
        with open(page.file.abs_src_path, encoding="utf-8-sig", errors="strict") as f:
            source = f.read()
    except OSError:
        source = ""

    markdown, meta = mkdocs.utils.meta.get_data(source)

    if meta.get("title"):
        return str(meta["title"])

    title = mkdocs.utils.get_markdown_title(markdown)

    if title is None:
        if getattr(page, "is_homepage", False):
            title = "Home"
        else:
            name = page.file.name.replace("-", " ").replace("_", " ")
            title = name.capitalize() if name.lower() == name else name

    return title
