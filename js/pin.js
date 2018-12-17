'use strict';
(function () {
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

  // создание меток
  var drawPin = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      window.utils.fragment().appendChild(renderPin(arr[i]));
    }
    return window.utils.fragment();
  };
  window.pin = {
    drawPin: drawPin
  };
})();
