'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var TYPES = {
    flat: {
      rus: 'Квартира',
      min: 1000
    },
    bungalo: {
      rus: 'Бунгало',
      min: 0
    },
    house: {
      rus: 'Дом',
      min: 5000
    },
    palace: {
      rus: 'Дворец',
      min: 10000
    }
  };
  var ESC_KEY = 27;
  window.utils = {
    fragment: fragment,
    TYPES: TYPES,
    ESC_KEY: ESC_KEY
  };
})();
