'use strict';
(function () {
  var QUANTITY_OBJECTS = 8;
  // разметка пина из шаблона
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  // наполненние меток данными
  var renderPin = function (pinAd) {
    var newPin = pin.cloneNode(true);
    var handlePinClick = function () {
      window.form.displayCard(pinAd);
    };
    newPin.addEventListener('click', handlePinClick);
    newPin.style.left = pinAd.location.x + 'px';
    newPin.style.top = pinAd.location.y + 'px';
    newPin.querySelector('img').src = pinAd.author.avatar;
    newPin.querySelector('img').alt = pinAd.offer.title;
    return newPin;
  };

  var getRandomArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var ads = [];
  var generateObject = function (arr) {
    for (var i = 0; i < QUANTITY_OBJECTS.length; i++) {
      var data = getRandomArray(arr);
      ads.push(data);
    }
    return ads;
  };

  // создание меток
  var drawPin = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPin(arr[i]));
    }
    return fragment;
  };

  var displayError = function (errorText) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var NewError = error.cloneNode(true);
    var errorMessage = NewError.querySelector('.error__message');
    var errorButton = NewError.querySelector('.error__button');
    errorMessage.textContent = errorText;
    document.querySelector('main').insertAdjacentElement('beforebegin', NewError);
    errorButton.addEventListener('click', closeError);
  };

  var closeError = function () {
    var error = document.querySelector('.error');
    document.querySelector('body').removeChild(error);
  };
  window.backend.load(generateObject, displayError);
  window.pin = {
    generateObject: generateObject,
    drawPin: drawPin,
    ads: ads,
    displayError: displayError
  };
})();
