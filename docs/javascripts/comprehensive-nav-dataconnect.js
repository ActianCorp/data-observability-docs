(function () {

  var SECTIONS = Array.isArray(window.CN_SECTIONS) ? window.CN_SECTIONS : [];

  if (!SECTIONS.length) {
    console.warn('CN_SECTIONS is empty; check mkdocs nav generation.');
  }
  // ── Helpers ───────────────────────────────────────────────────────────────

  function getSiteRoot() {
    var tab = document.querySelector('.md-tabs__link');
    if (tab && tab.href) {
      return tab.href.substring(0, tab.href.lastIndexOf('/') + 1);
    }
    return window.location.origin + '/';
  }

  function getSiteRootPath() {
    var tab = document.querySelector('.md-tabs__link');
    if (tab && tab.href) {
      var url  = new URL(tab.href);
      var path = url.pathname;
      var idx  = path.indexOf('/', 1);
      return idx !== -1 ? path.substring(0, idx + 1) : '/';
    }
    return '/';
  }

  function normHref(href) {
    return href
      .replace(/\/index\.html$/, '')
      .replace(/\.html$/, '')
      .replace(/\/$/, '');
  }

  // ── Active-state helpers ──────────────────────────────────────────────────

  function isHomePage(currentPath) {
    var root = getSiteRootPath();
    return (
      currentPath === root ||
      currentPath === root + 'index.html' ||
      currentPath === root.replace(/\/$/, '')
    );
  }

  function isSectionActive(currentPath, sectionKey) {
    if (!sectionKey) return isHomePage(currentPath);

    var pathSegs = currentPath.split('/').filter(Boolean).map(function(s) {
      return s.replace(/\.html$/, '');
    });
    var keySegs  = sectionKey.split('/').filter(Boolean);

    outer:
    for (var s = 0; s <= pathSegs.length - keySegs.length; s++) {
      for (var i = 0; i < keySegs.length; i++) {
        if (pathSegs[s + i] !== keySegs[i]) continue outer;
      }
      return true;
    }
    return false;
  }

  function isPageActive(currentPath, href) {
    var norm = normHref(href);
    if (!norm) return false;

    var pathSegs = currentPath.split('/').filter(Boolean);
    var hrefSegs = norm.split('/').filter(Boolean);
    if (hrefSegs.length === 0) return false;

    outer:
    for (var s = 0; s <= pathSegs.length - hrefSegs.length; s++) {
      for (var i = 0; i < hrefSegs.length; i++) {
        var hs = hrefSegs[i].replace(/\.html$/, '');
        var ps = pathSegs[s + i].replace(/\.html$/, '');
        if (ps !== hs) continue outer;
      }
      return true;
    }
    return false;
  }

  function subtreeHasActive(pages, currentPath) {
    for (var i = 0; i < pages.length; i++) {
      if (isPageActive(currentPath, pages[i].href)) return true;
      if (pages[i].pages && subtreeHasActive(pages[i].pages, currentPath)) return true;
    }
    return false;
  }

  function applyReferenceGuard(anchor, href) {
    // No special handling needed for DataConnect docs
  }

  // ── Tab active-state ──────────────────────────────────────────────────────

  function getTabLabelText(tabLink) {
    var text = '';
    tabLink.childNodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
    });
    text = text.trim();
    return text || (tabLink.textContent || '').trim();
  }

  function fixTabLinks() {
    var base        = getSiteRoot();
    var currentPath = window.location.pathname;

    // Find the single most-specific active section (longest key wins)
    var activeSectionKey = null;
    SECTIONS.forEach(function (section) {
      if (isSectionActive(currentPath, section.key)) {
        if (activeSectionKey === null || section.key.length > activeSectionKey.length) {
          activeSectionKey = section.key;
        }
      }
    });
    // Fallback: if a section's page tree contains the current page, prefer it
    SECTIONS.forEach(function (section) {
      if (section.pages && section.pages.length > 0 && section.key !== activeSectionKey) {
        if (subtreeHasActive(section.pages, currentPath)) {
          activeSectionKey = section.key;
        }
      }
    });

    document.querySelectorAll('.md-tabs__item').forEach(function (tabItem) {
      var tabLink = tabItem.querySelector('.md-tabs__link');
      if (!tabLink) return;

      var labelText = getTabLabelText(tabLink);
      var section   = null;
      for (var i = 0; i < SECTIONS.length; i++) {
        if (SECTIONS[i].label === labelText) { section = SECTIONS[i]; break; }
      }

      if (section) {
        tabLink.href = base + section.href;
        applyReferenceGuard(tabLink, section.href);
      }

      var isActive = section ? (section.key === activeSectionKey) : false;

      if (isActive) {
        tabItem.classList.add('md-tabs__item--active');
        tabLink.classList.add('md-tabs__link--active');
      } else {
        tabItem.classList.remove('md-tabs__item--active');
        tabLink.classList.remove('md-tabs__link--active');
      }
    });
  }

  // ── Sidebar builder ───────────────────────────────────────────────────────

  function buildPageList(pages, base, currentPath, depth) {
    var ul = document.createElement('ul');
    ul.className = 'cn-sublist cn-sublist--depth-' + depth;

    pages.forEach(function (page) {
      var li = document.createElement('li');
      li.className = 'cn-subitem';

      var hasChildren = page.pages && page.pages.length > 0;
      var pageActive  = isPageActive(currentPath, page.href);

      if (hasChildren) {
        var row = document.createElement('div');
        row.className = 'cn-subheader';

        var a = document.createElement('a');
        a.href        = base + page.href;
        a.className   = 'cn-sublink cn-sublink--parent' + (pageActive ? ' cn-sublink--active' : '');
        a.textContent = page.name;
        applyReferenceGuard(a, page.href);
        row.appendChild(a);

        var arrow = document.createElement('span');
        arrow.className = 'cn-arrow cn-arrow--sub';
        arrow.innerHTML = '&#8250;';

        var childList          = buildPageList(page.pages, base, currentPath, depth + 1);
        var anyDescendantActive = subtreeHasActive(page.pages, currentPath);
        var collapsed           = !(pageActive || anyDescendantActive);

        arrow.style.transform   = collapsed ? 'rotate(0deg)' : 'rotate(90deg)';
        childList.style.display = collapsed ? 'none'         : '';

        row.appendChild(arrow);
        li.appendChild(row);
        li.appendChild(childList);

        (function (arrowEl, listEl, initCollapsed) {
          var isCollapsed = initCollapsed;
          arrowEl.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            isCollapsed = !isCollapsed;
            listEl.style.display    = isCollapsed ? 'none'         : '';
            arrowEl.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)';
          });
        })(arrow, childList, collapsed);

      } else {
        var a = document.createElement('a');
        a.href        = base + page.href;
        a.className   = 'cn-sublink' + (pageActive ? ' cn-sublink--active' : '');
        a.textContent = page.name;
        applyReferenceGuard(a, page.href);
        li.appendChild(a);
      }

      ul.appendChild(li);
    });

    return ul;
  }

  // ── Scroll to active link ─────────────────────────────────────────────────

  function getScrollParent(startEl) {
    var el = startEl ? startEl.parentElement : null;
    while (el && el !== document.documentElement) {
      var style    = window.getComputedStyle(el);
      var overflow = style.overflow + style.overflowY;
      if (/(auto|scroll)/.test(overflow) && el.scrollHeight > el.clientHeight) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

  function scrollToActive(sidebar) {
    var activeLink = sidebar.querySelector('.cn-sublink--active, .cn-label--active');
    if (!activeLink) return;

    function doScroll() {
      var scrollEl = getScrollParent(activeLink);
      if (!scrollEl) {
        scrollEl = sidebar.closest('.md-sidebar__scrollwrap') || sidebar;
      }

      var linkRect = activeLink.getBoundingClientRect();

      if (linkRect.height === 0) {
        requestAnimationFrame(doScroll);
        return;
      }

      var wrapRect   = scrollEl.getBoundingClientRect();
      var offsetTop  = linkRect.top - wrapRect.top;
      var wrapHeight = scrollEl.clientHeight;
      var linkHeight = activeLink.offsetHeight;

      if (offsetTop < 0 || offsetTop + linkHeight > wrapHeight) {
        var desired = scrollEl.scrollTop + offsetTop - (wrapHeight / 2) + (linkHeight / 2);
        scrollEl.scrollTop = Math.max(0, Math.min(desired, scrollEl.scrollHeight - wrapHeight));
      }
    }

    requestAnimationFrame(doScroll);
  }

  // ── Main nav builder ──────────────────────────────────────────────────────

  function buildNav() {
    var sidebar = document.querySelector('.md-sidebar--primary .md-sidebar__scrollwrap');
    if (!sidebar) return;

    var existing = sidebar.querySelector('.cn-nav');
    if (existing) existing.parentNode.removeChild(existing);

    var currentPath = window.location.pathname;
    var base        = getSiteRoot();

    var nav = document.createElement('nav');
    nav.className = 'cn-nav';

    // Find the single most-specific active section (longest key wins)
    var activeSectionKey = null;
    SECTIONS.forEach(function (section) {
      if (isSectionActive(currentPath, section.key)) {
        if (activeSectionKey === null || section.key.length > activeSectionKey.length) {
          activeSectionKey = section.key;
        }
      }
    });
    // Fallback: if a section's page tree contains the current page, prefer it
    SECTIONS.forEach(function (section) {
      if (section.pages && section.pages.length > 0 && section.key !== activeSectionKey) {
        if (subtreeHasActive(section.pages, currentPath)) {
          activeSectionKey = section.key;
        }
      }
    });

    SECTIONS.forEach(function (section) {
      var isActive = (section.key === activeSectionKey);

      var item = document.createElement('div');
      item.className = 'cn-item' + (isActive ? ' cn-item--active' : '');

      var header = document.createElement('div');
      header.className = 'cn-header';

      var link = document.createElement('a');
      link.href        = base + section.href;
      link.className   = 'cn-label' + (isActive ? ' cn-label--active' : '');
      link.textContent = section.label;
      applyReferenceGuard(link, section.href);
      header.appendChild(link);

      if (section.pages && section.pages.length > 0) {
        var arrow = document.createElement('span');
        arrow.className = 'cn-arrow';
        arrow.innerHTML = '&#8250;';

        var subList = buildPageList(section.pages, base, currentPath, 1);

        var collapsed = !isActive;
        arrow.style.transform = collapsed ? 'rotate(0deg)' : 'rotate(90deg)';
        subList.style.display = collapsed ? 'none' : '';

        header.appendChild(arrow);
        item.appendChild(header);
        item.appendChild(subList);

        (function (arrowEl, listEl, initCollapsed) {
          var isCollapsed = initCollapsed;
          arrowEl.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            isCollapsed = !isCollapsed;
            listEl.style.display    = isCollapsed ? 'none'         : '';
            arrowEl.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)';
          });
        })(arrow, subList, collapsed);

      } else {
        item.appendChild(header);
      }

      nav.appendChild(item);
    });

    var nativeNav = sidebar.querySelector('.md-nav--primary');
    if (nativeNav) nativeNav.style.display = 'none';

    var inner = sidebar.querySelector('.md-sidebar__inner');
    if (inner) inner.insertBefore(nav, inner.firstChild);

    scrollToActive(sidebar);
  }

  // ── Boot ──────────────────────────────────────────────────────────────────

  function init() {
    buildNav();
    fixTabLinks();
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
