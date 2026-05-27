(function () {

  var SECTIONS = [
    {
      key: '',
      label: 'Home',
      href: 'index.html',
      pages: []
    },
    {
      key: 'getting-started',
      label: 'Getting Started',
      href: 'getting-started/connect-to-data/connect-to-data.html',
      pages: [
        { name: 'Connect to Data', href: 'getting-started/connect-to-data/connect-to-data.html', pages: [
          { name: 'Connect to Data', href: 'getting-started/connect-to-data/connect-to-data.html' },
          { name: 'Projects', href: 'getting-started/connect-to-data/projects.html' },
          { name: 'Data Connectors', href: 'getting-started/connect-to-data/data-connectors/data-connectors.html', pages: [
            { name: 'Data Connectors', href: 'getting-started/connect-to-data/data-connectors/data-connectors.html' },
            { name: 'Google BigQuery', href: 'getting-started/connect-to-data/data-connectors/google-bigquery.html' },
            { name: 'Google Cloud Storage', href: 'getting-started/connect-to-data/data-connectors/google-cloud-storage.html' },
            { name: 'Iceberg', href: 'getting-started/connect-to-data/data-connectors/iceberg.html' },
            { name: 'Snowflake', href: 'getting-started/connect-to-data/data-connectors/snowflake.html' },
            { name: 'AWS S3', href: 'getting-started/connect-to-data/data-connectors/aws-s3.html' },
            { name: 'AWS Athena', href: 'getting-started/connect-to-data/data-connectors/aws-athena.html' },
            { name: 'AWS Redshift', href: 'getting-started/connect-to-data/data-connectors/aws-redshift.html' },
            { name: 'Databricks Delta', href: 'getting-started/connect-to-data/data-connectors/databricks-delta.html' },
            { name: 'Azure Blob', href: 'getting-started/connect-to-data/data-connectors/azure-blob.html' },
            { name: 'Azure OneLake', href: 'getting-started/connect-to-data/data-connectors/azure-onelake.html' },
            { name: 'Salesforce', href: 'getting-started/connect-to-data/data-connectors/salesforce.html' },
            { name: 'SAP Hana', href: 'getting-started/connect-to-data/data-connectors/sap-hana.html' },
            { name: 'SQL Server', href: 'getting-started/connect-to-data/data-connectors/sql-server.html' },
            { name: 'Trino', href: 'getting-started/connect-to-data/data-connectors/trino.html' }
          ]},
          { name: 'Supported File Types', href: 'getting-started/connect-to-data/supported-file-types.html' },
          { name: 'Connection Modes', href: 'getting-started/connect-to-data/connection-modes.html' },
          { name: 'File Path Options', href: 'getting-started/connect-to-data/file-path-options.html' },
          { name: 'Triggering Scans', href: 'getting-started/connect-to-data/triggering-scans.html' },
          { name: 'Configuring a Data Source', href: 'getting-started/connect-to-data/configuring-a-data-source.html' }
        ]},
        { name: 'Profiling Data', href: 'getting-started/profiling-data/profiling-data.html', pages: [
          { name: 'Profiling Data', href: 'getting-started/profiling-data/profiling-data.html' },
          { name: 'Data Health Metrics', href: 'getting-started/profiling-data/data-health-metrics.html' },
          { name: 'Data Health Overview Page', href: 'getting-started/profiling-data/data-health-overview-page.html' },
          { name: 'Interactive Profiling Tool - Investigator', href: 'getting-started/profiling-data/interactive-profiling-tool-investigator.html' },
          { name: 'Data Diff', href: 'getting-started/profiling-data/data-diff.html' },
          { name: 'Compound Attributes', href: 'getting-started/profiling-data/compound-attributes/compound-attributes.html', pages: [
            { name: 'Compound Attributes', href: 'getting-started/profiling-data/compound-attributes/compound-attributes.html' },
            { name: 'List of Supported Functions', href: 'getting-started/profiling-data/compound-attributes/list-of-supported-functions.html' }
          ]}
        ]},
        { name: 'Monitoring Data', href: 'getting-started/monitoring-data/monitoring-data.html', pages: [
          { name: 'Monitoring Data', href: 'getting-started/monitoring-data/monitoring-data.html' },
          { name: 'Out-of-the-Box Monitors', href: 'getting-started/monitoring-data/out-of-box-monitors.html' },
          { name: 'User-defined Monitors', href: 'getting-started/monitoring-data/user-defined-monitors.html' },
          { name: 'Built-in Metrics', href: 'getting-started/monitoring-data/built-in-metrics.html' },
          { name: 'User-defined Metrics', href: 'getting-started/monitoring-data/user-defined-metrics.html' },
          { name: 'Record Validation Rules', href: 'getting-started/monitoring-data/record-validation-rules.html' },
          { name: 'Rules Expression Examples', href: 'getting-started/monitoring-data/rules-expression-examples.html' },
          { name: 'PII Data Detection Monitors', href: 'getting-started/monitoring-data/pii-data-detection-monitors.html' },
          { name: 'Monitors Management', href: 'getting-started/monitoring-data/monitors-management.html' },
          { name: 'Creating a Monitor', href: 'getting-started/monitoring-data/creating-a-monitor.html' },
          { name: 'Managing Existing Monitors', href: 'getting-started/monitoring-data/managing-existing-monitors.html' },
          { name: 'Configuring Data-Binning', href: 'getting-started/monitoring-data/configuring-data-binning.html' },
          { name: 'Configuring Notifications', href: 'getting-started/monitoring-data/configuring-notifications.html' },
          { name: 'Monitors Troubleshooting', href: 'getting-started/monitoring-data/monitors-troubleshooting.html' },
          { name: 'Incident Portal', href: 'getting-started/monitoring-data/incident-portal.html' },
          { name: 'Data Trends and Alerts', href: 'getting-started/monitoring-data/data-trends-and-alerts.html' },
          { name: 'Metrics Exclusions', href: 'getting-started/monitoring-data/metrics-exclusions.html' },
          { name: 'Metrics Inspector', href: 'getting-started/monitoring-data/metrics-inspector.html' },
          { name: 'Data Quality Score', href: 'getting-started/monitoring-data/data-quality-score.html' }
        ]},
        { name: 'Remediation', href: 'getting-started/remediation/remediation.html', pages: [
          { name: 'Remediation', href: 'getting-started/remediation/remediation.html' },
          { name: 'Data Binning', href: 'getting-started/remediation/data-binning.html' },
          { name: 'Circuit Breaker', href: 'getting-started/remediation/circuit-breaker.html' }
        ]},
        { name: 'Integrations', href: 'getting-started/integrations/integrations.html', pages: [
          { name: 'Integrations', href: 'getting-started/integrations/integrations.html' },
          { name: 'Jira Integration', href: 'getting-started/integrations/jira-integration.html' },
          { name: 'Slack Integration', href: 'getting-started/integrations/slack.html' },
          { name: 'Jobs Status Notification', href: 'getting-started/integrations/jobs-status-notification.html' },
          { name: 'Data Quality External Reporting', href: 'getting-started/integrations/data-quality-external-reporting.html' },
          { name: 'Data Observability MCP Server', href: 'getting-started/integrations/mcp-server.html' },
          { name: 'Alation Integration', href: 'getting-started/integrations/alation-integration.html' }
        ]},
        { name: 'Authentication and Access Control', href: 'getting-started/authentication-and-access-control/auth-access-control.html', pages: [
          { name: 'Authentication and Access Control', href: 'getting-started/authentication-and-access-control/auth-access-control.html' },
          { name: 'SSO Configuration', href: 'getting-started/authentication-and-access-control/sso-configuration.html' },
          { name: 'Microsoft Entra IDP Setup', href: 'getting-started/authentication-and-access-control/microsoft-entra-idp-setup.html' },
          { name: 'Auth0 Setup', href: 'getting-started/authentication-and-access-control/auth0-setup.html' },
          { name: 'Okta SSO Setup', href: 'getting-started/authentication-and-access-control/okta-sso-setup.html' },
          { name: 'User Management', href: 'getting-started/authentication-and-access-control/user-management.html' }
        ]}
      ]
    },
    {
      key: 'deployment-models',
      label: 'Deployment Models',
      href: 'deployment-models/deployment-models.html',
      pages: [
        { name: 'Deployment Models', href: 'deployment-models/deployment-models.html' },
        { name: 'Virtual Private Cloud (VPC) Deployment', href: 'deployment-models/virtual-private-cloud-vpc-deployment.html' }
      ]
    },
    {
      key: 'api-reference',
      label: 'API Reference',
      href: 'api-reference/authentication-api.html',
      pages: [
        { name: 'Authentication API', href: 'api-reference/authentication-api.html' },
        { name: 'API Keys', href: 'api-reference/api-keys.html' },
        { name: 'Monitors API', href: 'api-reference/monitors-api.html' },
        { name: 'DQ Reporting APIs', href: 'api-reference/dq-reporting-apis.html' },
        { name: 'DQ Score API', href: 'api-reference/dq-score-api.html' },
        { name: 'Get Google Service Account API', href: 'api-reference/get-google-service-account-api.html' },
        { name: 'Tenant Configuration', href: 'api-reference/tenant-configuration.html' },
        { name: 'Actian Data Observability IP List', href: 'api-reference/telmai-ip-list.html' },
        { name: 'Source APIs', href: 'source-apis/list-all-sources.html' },
        { name: 'Upload Data', href: 'upload-data/upload-data-api/upload-data-from-cloud.html', pages: [
          { name: 'Upload Data from Cloud', href: 'upload-data/upload-data-api/upload-data-from-cloud.html' },
          { name: 'RedShift Request Data', href: 'upload-data/upload-data-api/redshift-request-data.html' },
          { name: 'GCS Request Data', href: 'upload-data/upload-data-api/gcs-request-data.html' },
          { name: 'Azure Request Data', href: 'upload-data/upload-data-api/azure-request-data.html' },
          { name: 'GBQ Request Data', href: 'upload-data/upload-data-api/gbq-request-data.html' },
          { name: 'Snowflake Request Data', href: 'upload-data/upload-data-api/snowflake-request-data.html' },
          { name: 'Amazon S3 Request Data', href: 'upload-data/upload-data-api/amazon-s3-request-data.html' },
          { name: 'Delta Lake Request', href: 'upload-data/upload-data-api/delta-lake-request.html' },
          { name: 'Trino Request Data', href: 'upload-data/upload-data-api/trino-request-data.html' },
          { name: 'Track Upload Job', href: 'upload-data/track-job-status.html' },
          { name: 'Check for Alerts', href: 'upload-data/check-for-alerts.html' }
        ]}
      ]
    },
    {
      key: 'admin-apis',
      label: 'Admin APIs',
      href: 'admin-apis/update-user.html',
      pages: [
        { name: 'User Management', href: 'admin-apis/update-user.html' },
        { name: 'Troubleshooting', href: 'admin-apis/troubleshooting.html' }
      ]
    },
    {
      key: 'telmai-releases',
      label: 'Release Notes',
      href: 'telmai-releases/release-notes/release-notes.html',
      pages: [
        { name: 'Release Notes', href: 'telmai-releases/release-notes/release-notes.html' },
        { name: 'Initial Release', href: 'telmai-releases/release-notes/initial_release.html' },
        { name: '25.1.0', href: 'telmai-releases/release-notes/25.1.0.html' },
        { name: '25.1.2', href: 'telmai-releases/release-notes/25.1.2.html' },
        { name: '25.1.3', href: 'telmai-releases/release-notes/25.1.3.html' },
        { name: '25.2.0', href: 'telmai-releases/release-notes/25.2.0.html' },
        { name: '25.2.1', href: 'telmai-releases/release-notes/25.2.1.html' }
      ]
    },
  ];
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
