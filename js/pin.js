'use strict';
(function () {
  var QUANTITY_OBJECTS = 8;
  // разметка пина из шаблона
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  // наполненние меток данными
  var renderPins = function (pinAd) {
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

  window.pin = {
    generateObject: generateObject,
    renderPins: renderPins,
    ads: ads
  };
})();
