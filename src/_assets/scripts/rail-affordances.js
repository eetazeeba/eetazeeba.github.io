(function () {
  var frames = document.querySelectorAll('.module-rail-frame');
  if (!frames.length) return;

  var SCROLL_EPSILON = 2;
  var FALLBACK_SCROLL_RATIO = 0.85;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function getItems(sequence) {
    return toArray(sequence.children).filter(function (item) {
      return item.nodeType === 1;
    });
  }

  function clampIndex(index, itemCount) {
    if (!itemCount) return 0;
    if (index < 0) return 0;
    if (index >= itemCount) return itemCount - 1;
    return index;
  }

  function setBooleanData(target, key, value) {
    target.dataset[key] = value ? 'true' : 'false';
  }

  function toggleHidden(control, hidden) {
    if (!control) return;
    control.hidden = hidden;
    control.disabled = hidden;
  }

  function ensurePips(state) {
    var items = state.items;
    if (!state.pipsRoot || !state.pipsEnabled) {
      if (state.pipsRoot) state.pipsRoot.hidden = true;
      return;
    }

    if (state.pips.length !== items.length) {
      var fragment = document.createDocumentFragment();
      state.pips = [];

      while (state.pipsRoot.firstChild) {
        state.pipsRoot.removeChild(state.pipsRoot.firstChild);
      }

      items.forEach(function (_, index) {
        var pip = document.createElement('span');
        pip.className = 'module-position-pip';
        pip.dataset.index = String(index);
        pip.setAttribute('aria-hidden', 'true');
        state.pips.push(pip);
        fragment.appendChild(pip);
      });

      state.pipsRoot.appendChild(fragment);
    }

    state.pipsRoot.hidden = items.length < 2;
    state.frame.classList.toggle('has-position-pips', items.length > 1);
    state.frame.dataset.itemCount = String(items.length);
  }

  function getRailStride(sequence, items) {
    if (items.length > 1) {
      var stride = items[1].offsetLeft - items[0].offsetLeft;
      if (stride > 0) return stride;
    }

    return Math.max(Math.round(sequence.clientWidth * FALLBACK_SCROLL_RATIO), 1);
  }

  function getSnapRailActiveIndex(sequence, items) {
    var targetOffset = sequence.scrollLeft;
    var closestIndex = 0;
    var closestDistance = Number.POSITIVE_INFINITY;

    items.forEach(function (item, index) {
      var distance = Math.abs(item.offsetLeft - targetOffset);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function getStackActiveIndex(sequence, items) {
    var sequenceRect = sequence.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    var visibleTop = Math.max(sequenceRect.top, 0);
    var visibleBottom = Math.min(sequenceRect.bottom, viewportHeight);
    var visibleCenter = (visibleTop + visibleBottom) / 2;
    var closestIndex = 0;
    var closestDistance = Number.POSITIVE_INFINITY;

    items.forEach(function (item, index) {
      var rect = item.getBoundingClientRect();
      var center = rect.top + (rect.height / 2);
      var distance = Math.abs(center - visibleCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function syncActiveIndex(state) {
    var items = state.items;
    if (!state.indexTrackingEnabled || !items.length) return;

    var activeIndex = state.isRail
      ? getSnapRailActiveIndex(state.sequence, items)
      : getStackActiveIndex(state.sequence, items);

    activeIndex = clampIndex(activeIndex, items.length);
    state.frame.dataset.activeIndex = String(activeIndex);

    if (!state.pips.length) return;

    state.pips.forEach(function (pip, index) {
      pip.classList.toggle('is-active', index === activeIndex);
    });
  }

  function syncRailState(state) {
    if (!state.isRail) return;

    var maxScrollLeft = Math.max(state.sequence.scrollWidth - state.sequence.clientWidth, 0);
    var overflowing = maxScrollLeft > SCROLL_EPSILON;
    var canScrollPrev = state.sequence.scrollLeft > SCROLL_EPSILON;
    var canScrollNext = state.sequence.scrollLeft < (maxScrollLeft - SCROLL_EPSILON);

    setBooleanData(state.frame, 'overflowing', overflowing);
    setBooleanData(state.frame, 'canScrollPrev', overflowing && canScrollPrev);
    setBooleanData(state.frame, 'canScrollNext', overflowing && canScrollNext);

    if (state.navEnabled) {
      toggleHidden(state.prevButton, !(overflowing && canScrollPrev));
      toggleHidden(state.nextButton, !(overflowing && canScrollNext));
    }
  }

  function updateState(state) {
    state.items = getItems(state.sequence);
    ensurePips(state);
    syncRailState(state);
    syncActiveIndex(state);
  }

  function requestUpdate(state) {
    if (state.updateQueued) return;

    state.updateQueued = true;
    window.requestAnimationFrame(function () {
      state.updateQueued = false;
      updateState(state);
    });
  }

  function scrollSequenceByStride(state, direction) {
    var stride = getRailStride(state.sequence, state.items);
    state.sequence.scrollBy({
      left: stride * direction,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
    });
  }

  var states = toArray(frames).map(function (frame) {
    var sequence = frame.querySelector('.module-rail, .module-card-stack');
    if (!sequence) return null;

    var isRail = sequence.classList.contains('module-rail');
    var prevButton = frame.querySelector('[data-module-nav-prev]');
    var nextButton = frame.querySelector('[data-module-nav-next]');
    var navEnabled = isRail && (frame.hasAttribute('data-module-nav') || !!(prevButton || nextButton));
    var pipsRoot = frame.querySelector('.module-position-pips');
    var pipsEnabled = !!pipsRoot && (frame.hasAttribute('data-module-position-pips') || sequence.hasAttribute('data-module-position-pips'));
    var indexTrackingEnabled = pipsEnabled && (sequence.classList.contains('module-rail--snap') || sequence.classList.contains('module-card-stack'));
    var state = {
      frame: frame,
      sequence: sequence,
      isRail: isRail,
      navEnabled: navEnabled,
      prevButton: prevButton,
      nextButton: nextButton,
      pipsRoot: pipsRoot,
      pipsEnabled: pipsEnabled,
      indexTrackingEnabled: indexTrackingEnabled,
      items: [],
      pips: [],
      updateQueued: false
    };

    frame.classList.toggle('has-module-nav', navEnabled);
    frame.classList.toggle('has-position-pips', pipsEnabled);
    setBooleanData(frame, 'overflowing', false);
    setBooleanData(frame, 'canScrollPrev', false);
    setBooleanData(frame, 'canScrollNext', false);

    if (navEnabled && prevButton) {
      prevButton.addEventListener('click', function () {
        scrollSequenceByStride(state, -1);
      });
    }

    if (navEnabled && nextButton) {
      nextButton.addEventListener('click', function () {
        scrollSequenceByStride(state, 1);
      });
    }

    if (isRail) {
      sequence.addEventListener('scroll', function () {
        requestUpdate(state);
      }, { passive: true });
    }

    return state;
  }).filter(Boolean);

  if (!states.length) return;

  function requestAllUpdates() {
    states.forEach(function (state) {
      requestUpdate(state);
    });
  }

  window.addEventListener('resize', requestAllUpdates, { passive: true });
  window.addEventListener('load', requestAllUpdates);

  if (states.some(function (state) { return !state.isRail && state.indexTrackingEnabled; })) {
    window.addEventListener('scroll', requestAllUpdates, { passive: true });
  }

  if (typeof ResizeObserver === 'function') {
    states.forEach(function (state) {
      var observer = new ResizeObserver(function () {
        requestUpdate(state);
      });

      state.resizeObserver = observer;
      observer.observe(state.sequence);
      state.items = getItems(state.sequence);
      state.items.forEach(function (item) {
        observer.observe(item);
      });
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(requestAllUpdates);
  }

  requestAllUpdates();
})();
