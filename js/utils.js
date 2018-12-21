'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_TIMEOUT);
    };
  };

  window.utils = {
    debounce: debounce
  };
})();
