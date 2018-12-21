'use strict';
(function () {
  var MIN_X = 0;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var NIB_HEIGHT = 22;
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var mapPins = document.querySelector('.map__pins');

  var drawPins = function (ads) {
    document.querySelectorAll('button.map__pin[type=button]').forEach(function (pin) {
      pin.remove();
    });
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(window.pin.renderPins(ad));
    });
    mapPins.appendChild(fragment);
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var priceRange = {
    'any': {
      min: 0,
      max: Infinity
    },
    'low': {
      min: 0,
      max: 9999
    },
    'middle': {
      min: 10000,
      max: 49999
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var getFilterType = function (ad) {
    return (housingType.value === 'any') || (housingType.value === ad.offer.type);
  };

  var getFilterPrice = function (ad) {
    var minPrice = priceRange[housingPrice.value].min;
    var maxPrice = priceRange[housingPrice.value].max;
    return (housingPrice.value === 'any') || (ad.offer.price <= minPrice && ad.offer.price <= maxPrice);
  };

  var getFilterRooms = function (ad) {
    return (housingRooms.value === 'any') || (Number(housingRooms.value) === ad.offer.rooms);
  };

  var getFilterGuests = function (ad) {
    return (housingGuests.value === 'any') || (Number(housingGuests.value) === ad.offer.guests);
  };

  var getSelectedFeatures = function (ad) {
    var checked = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
    var features = true;
    Array.from(checked).every(function (checkbox) {
      features = ad.offer.features.indexOf(checkbox.value) !== -1;
      return features;
    });
    return features;
  };

  var onDataLoad = function (ads) {
    drawPins(ads.slice(0, 5));
    var drawFilteredPins = function () {
      var filteredAds = ads.filter(function (ad) {
        return getFilterType(ad) && getFilterPrice(ad) && getFilterRooms(ad) && getFilterGuests(ad) && getSelectedFeatures(ad);
      });
      mapPins.append(drawPins(filteredAds));
    };
    mapFilters.addEventListener('change', drawFilteredPins);
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
      // window.backend.load(drawPins, displayError);
      window.backend.load(onDataLoad, displayError);
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
