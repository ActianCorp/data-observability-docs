"""
MkDocs hook: generate sidebar structure data for custom comprehensive nav.

Writes docs/javascripts/comprehensive-nav-structure.js from config['nav'] so the
custom sidebar always stays in sync with mkdocs.yml structure changes.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


OUT_REL_PATH = Path("javascripts/comprehensive-nav-structure.js")


def on_pre_build(config: dict[str, Any], **kwargs) -> None:
    docs_dir = Path(config["docs_dir"])
    out_path = docs_dir / OUT_REL_PATH

    nav_config = config.get("nav") or []
    sections = _build_sections(nav_config)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_js = (
        "(function () {\n"
        "  window.CN_SECTIONS = "
        + json.dumps(sections, indent=2)
        + ";\n"
        "})();\n"
    )
    out_path.write_text(out_js, encoding="utf-8")

    return None


def _build_sections(nav_items: list[Any]) -> list[dict[str, Any]]:
    sections: list[dict[str, Any]] = []

    for item in nav_items:
        if isinstance(item, dict):
            for label, content in item.items():
                if isinstance(content, str):
                    href = _md_to_html(content)
                    sections.append(
                        {
                            "key": _section_key_from_href(href),
                            "label": str(label),
                            "href": href,
                            "pages": [],
                        }
                    )
                elif isinstance(content, list):
                    pages = _build_pages(content)
                    href = _first_href_from_pages(pages) or "index.html"
                    sections.append(
                        {
                            "key": _section_key_from_href(href),
                            "label": str(label),
                            "href": href,
                            "pages": pages,
                        }
                    )
    return sections


def _build_pages(items: list[Any]) -> list[dict[str, Any]]:
    pages: list[dict[str, Any]] = []
    for item in items:
        if isinstance(item, dict):
            for label, content in item.items():
                if isinstance(content, str):
                    pages.append({"name": str(label), "href": _md_to_html(content)})
                elif isinstance(content, list):
                    child_pages = _build_pages(content)
                    href = _first_href_from_pages(child_pages) or "index.html"
                    pages.append(
                        {
                            "name": str(label),
                            "href": href,
                            "pages": child_pages,
                        }
                    )
        elif isinstance(item, str):
            stem = Path(item).stem.replace("-", " ").replace("_", " ").title()
            pages.append({"name": stem, "href": _md_to_html(item)})
    return pages


def _first_href_from_pages(pages: list[dict[str, Any]]) -> str | None:
    for page in pages:
        href = page.get("href")
        if href:
            return str(href)
    return None


def _md_to_html(path: str) -> str:
    clean = path.strip().replace("\\", "/")
    return re.sub(r"\.md$", ".html", clean)


def _section_key_from_href(href: str) -> str:
    normalized = href.strip().lstrip("/")
    if normalized in {"index.html", ""}:
        return ""
    first = normalized.split("/", 1)[0]
    return re.sub(r"\.html$", "", first)
