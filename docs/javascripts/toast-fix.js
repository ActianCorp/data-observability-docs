// Force toast text to always be white — overrides MD CSS variables too
(function () {
  function fixToast() {
    var toast = document.querySelector('.md-toast');
    var inner = document.querySelector('.md-toast__inner');

    if (toast) {
      // Override CSS variables at the element level so inherited color tokens can't win
      toast.style.setProperty('--md-default-fg-color', '#ffffff', 'important');
      toast.style.setProperty('--md-default-fg-color--light', '#ffffff', 'important');
      toast.style.setProperty('--md-default-fg-color--lighter', '#ffffff', 'important');
      toast.style.setProperty('--md-default-fg-color--lightest', '#ffffff', 'important');
      toast.style.setProperty('color', '#ffffff', 'important');
    }

    if (inner) {
      inner.style.setProperty('color', '#ffffff', 'important');
      inner.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
      inner.style.setProperty('opacity', '1', 'important');
      inner.style.setProperty('background-color', '#1a1a1a', 'important');

      // Also fix any child text nodes / spans Material may inject
      var children = inner.querySelectorAll('*');
      children.forEach(function (el) {
        el.style.setProperty('color', '#ffffff', 'important');
        el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
        el.style.setProperty('opacity', '1', 'important');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var observer = new MutationObserver(fixToast);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  });
})();