"""
MkDocs hook: after each build, create index.html redirects for section
directories that lack one, pointing to the section's first page.

This ensures clicking a navigation tab (which links to a bare directory) opens
the first content page rather than a browser directory listing.

Uses config['nav'] (the raw YAML nav structure) rather than the processed nav
object, because MkDocs Material converts top-level Sections into Links when
navigation.tabs is active.
"""
import os
import posixpath
from collections import Counter

_redirects = {}  # section_dir (relative to site) -> first_page_path (relative to site)


def on_nav(nav, config, files):
    """Collect section-root → first-page mappings from the raw nav config."""
    _redirects.clear()
    raw_nav = config.get("nav") or []

    for item in raw_nav:
        if not isinstance(item, dict):
            continue
        for title, content in item.items():
            if not isinstance(content, list):
                continue  # Direct page entry (e.g. Home: index.md), skip.

            # Find first .md source path in this section's subtree.
            first_src = _find_first_file(content)
            if not first_src:
                continue

            # Resolve to a File object to get the output dest_path.
            file_obj = files.get_file_from_path(first_src)
            if not file_obj:
                continue
            first_dest = file_obj.dest_path.replace("\\", "/")

            # Collect all dest_paths for this section to find the common root.
            all_srcs = []
            _collect_files(content, all_srcs)
            all_dests = []
            for src in all_srcs:
                fo = files.get_file_from_path(src)
                if fo:
                    all_dests.append(fo.dest_path.replace("\\", "/"))

            page_dirs = [posixpath.dirname(d) for d in all_dests]
            section_dir = _common_ancestor(page_dirs)
            if not section_dir:
                # Fallback for cross-directory sections (e.g. AI Analysts which
                # spans agent/ and ai-analysts/): use the top-level directory
                # that contains the most pages as the section root.
                tops = [d.split("/")[0] for d in page_dirs if d]
                if tops:
                    section_dir = Counter(tops).most_common(1)[0][0]
                if not section_dir:
                    section_dir = posixpath.dirname(first_dest)

            if section_dir:
                _redirects[section_dir] = first_dest


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

def _find_first_file(content):
    """Return the first .md source path found in a nav subtree."""
    for item in content:
        if isinstance(item, str) and item.endswith(".md"):
            return item
        if isinstance(item, dict):
            for val in item.values():
                if isinstance(val, str) and val.endswith(".md"):
                    return val
                if isinstance(val, list):
                    result = _find_first_file(val)
                    if result:
                        return result
    return None


def _collect_files(content, result):
    """Collect all .md source paths from a nav subtree."""
    for item in content:
        if isinstance(item, str) and item.endswith(".md"):
            result.append(item)
        elif isinstance(item, dict):
            for val in item.values():
                if isinstance(val, str) and val.endswith(".md"):
                    result.append(val)
                elif isinstance(val, list):
                    _collect_files(val, result)


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
