'use strict';
(function () {
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

  window.pin = {
    renderMarker: renderPins
  };
})();
