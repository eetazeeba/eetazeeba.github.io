(function () {
  var navRoots = document.querySelectorAll('[data-nav-root]');

  function closeHamburger(root) {
    var toggle = root.querySelector('[data-nav-toggle]');
    if (!toggle) return;
    root.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function setupHamburger(root) {
    var toggle = root.querySelector('[data-nav-toggle]');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var isOpen = root.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        closeHamburger(root);
      }
    });
  }

  function closeAllDropdowns(scope) {
    var dropdowns = scope.querySelectorAll('[data-dropdown-root]');
    dropdowns.forEach(function (dropdown) {
      dropdown.classList.remove('is-open');
      var button = dropdown.querySelector('[data-dropdown-toggle]');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupDropdowns(root) {
    var toggles = root.querySelectorAll('[data-dropdown-toggle]');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var dropdownRoot = toggle.closest('[data-dropdown-root]');
        var openNow = dropdownRoot.classList.contains('is-open');

        closeAllDropdowns(root);

        if (!openNow) {
          dropdownRoot.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        closeAllDropdowns(root);
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    navRoots.forEach(function (root) {
      closeHamburger(root);
      closeAllDropdowns(root);
    });
  });

  navRoots.forEach(function (root) {
    setupHamburger(root);
    setupDropdowns(root);
  });
})();