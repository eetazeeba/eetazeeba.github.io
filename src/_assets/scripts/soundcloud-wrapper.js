(function () {
  var wrappers = document.querySelectorAll('[data-soundcloud-wrapper]');
  if (!wrappers.length) return;

  wrappers.forEach(function (wrapper) {
    var iframe = wrapper.querySelector('[data-soundcloud-iframe]');

    if (!iframe) {
      wrapper.dataset.soundcloudState = 'fallback';
      return;
    }

    wrapper.dataset.soundcloudState = 'pending';

    iframe.addEventListener('load', function () {
      wrapper.dataset.soundcloudState = 'loaded';
    });
  });
})();
