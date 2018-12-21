'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 50000000000000;

  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    var lastTimeout = setTimeout(cb, DEBOUNCE_TIMEOUT);
  };

  window.utils = {
    debounce: debounce
  };
})();
