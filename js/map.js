'use strict';
(function () {
  var MIN_X = 0;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var NIB_HEIGHT = 22;
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  // var array = window.pin.generateObject();
  var mapPins = document.querySelector('.map__pins');


  // создание меток
  var drawPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.pin.renderPins(arr[i]));
    }
    mapPins.appendChild(fragment);
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
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var changeСoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      var positionMinX = MIN_X;
      var positionMaxX = window.data.map.offsetWidth - mapPinMain.offsetWidth;
      var positionMinY = MIN_Y - mapPinMain.offsetHeight - NIB_HEIGHT;
      var positionMaxY = MAX_Y - mapPinMain.offsetHeight - NIB_HEIGHT;

      if (changeСoords.x < positionMinX) {
        changeСoords.x = positionMinX;
      }
      if (changeСoords.x > positionMaxX) {
        changeСoords.x = positionMaxX;
      }
      if (changeСoords.y < positionMinY) {
        changeСoords.y = positionMinY;
      }
      if (changeСoords.y > positionMaxY) {
        changeСoords.y = positionMaxY;
      }

      mapPinMain.style.top = changeСoords.y + 'px';
      mapPinMain.style.left = changeСoords.x + 'px';

      address.value = Math.round((mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2)) + ', ' + Math.round((mapPinMain.offsetTop + mapPinMain.offsetHeight + NIB_HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.backend.load(drawPins, displayError);
      window.data.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.form.disableForm(false);
      address.value = Math.round((mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2)) + ', ' + Math.round((mapPinMain.offsetTop + mapPinMain.offsetHeight + NIB_HEIGHT));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    mapPinMain: mapPinMain,
    drawPins: drawPins
  };
})();
