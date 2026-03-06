(function () {
  var navRoots = document.querySelectorAll('[data-nav-root]');
  if (!navRoots.length) return;
  var SCROLL_TOP_THRESHOLD = 12;
  var SCROLL_DEAD_ZONE = 10;
  var lastY = getScrollY();
  var rafPending = false;
  var lastDirection = 0;
  var directionDistance = 0;

  function getScrollY() {
    return Math.max(window.scrollY || window.pageYOffset || 0, 0);
  }

  function rootHasFocus(root) {
    var active = document.activeElement;
    return !!active && root.contains(active);
  }

  function shouldForceVisible(root, currentY) {
    if (currentY <= SCROLL_TOP_THRESHOLD) return true;
    if (root.classList.contains('is-open')) return true;
    if (rootHasFocus(root)) return true;
    return false;
  }

  function applyScrollState(root, currentY, direction, distance) {
    root.classList.toggle('is-scrolled', currentY > SCROLL_TOP_THRESHOLD);

    if (shouldForceVisible(root, currentY)) {
      root.classList.remove('is-hidden');
      return;
    }

    if (distance < SCROLL_DEAD_ZONE) {
      return;
    }

    if (direction > 0) {
      root.classList.add('is-hidden');
      return;
    }

    if (direction < 0) {
      root.classList.remove('is-hidden');
    }
  }

  function updateScrollState() {
    var currentY = getScrollY();
    var deltaY = currentY - lastY;
    var direction = 0;

    if (deltaY > 0) direction = 1;
    if (deltaY < 0) direction = -1;

    if (direction === 0) {
      directionDistance = 0;
    } else {
      if (direction !== lastDirection) {
        directionDistance = 0;
        lastDirection = direction;
      }
      directionDistance += Math.abs(deltaY);
    }

    navRoots.forEach(function (root) {
      applyScrollState(root, currentY, direction, directionDistance);
    });

    lastY = currentY;
    rafPending = false;
  }

  function requestScrollStateUpdate() {
    if (rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(updateScrollState);
  }

  function closeHamburger(root) {
    var toggle = root.querySelector('[data-nav-toggle]');
    if (!toggle) return;
    root.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    requestScrollStateUpdate();
  }

  function setupHamburger(root) {
    var toggle = root.querySelector('[data-nav-toggle]');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var isOpen = root.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      requestScrollStateUpdate();
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
        if (!dropdownRoot) return;
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

  function setupFocusGuard(root) {
    root.addEventListener('focusin', function () {
      root.classList.remove('is-hidden');
    });

    root.addEventListener('focusout', function () {
      window.requestAnimationFrame(requestScrollStateUpdate);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    navRoots.forEach(function (root) {
      closeHamburger(root);
      closeAllDropdowns(root);
    });
  });

  window.addEventListener('scroll', requestScrollStateUpdate, { passive: true });
  window.addEventListener('resize', requestScrollStateUpdate, { passive: true });

  navRoots.forEach(function (root) {
    setupHamburger(root);
    setupDropdowns(root);
    setupFocusGuard(root);
  });

  requestScrollStateUpdate();
})();
