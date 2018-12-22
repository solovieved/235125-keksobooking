'use strict';
(function () {
  var POSITION_LEFT = 570;
  var POSITION_TOP = 375;
  var fieldset = document.querySelectorAll('fieldset');
  var mapFilter = document.querySelectorAll('.map__filter');
  var adFormReset = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var adMap = document.querySelector('.map');

  var disableEnableForm = function (block, onOff) {
    for (var i = 0; i < block.length; i++) {
      block[i].disabled = onOff;
    }
  };

  // функция активации деативации формы
  var disableForm = function (trueFalse) {
    disableEnableForm(fieldset, trueFalse);
    disableEnableForm(mapFilter, trueFalse);
  };
  disableForm(true);

  var displayCard = function (ads) {
    adMap.insertBefore(window.card.renderPopup(ads), adMap.querySelector('.map__filters-container'));
  };

  var popupCloseClickHandler = function () {
    adMap.querySelector('.map__card').remove();
    window.card.newPopup.querySelector('.popup__close').removeEventListener('click', popupCloseClickHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === window.const.ESC_KEY) {
      adMap.querySelector('.map__card').remove();
      document.removeEventListener('keydown', popupEscPressHandler);
    }
  };

  var priceChangeHandler = function () {
    price.placeholder = window.const.TYPES[type.value].min;
    price.min = window.const.TYPES[type.value].min;
  };
  type.addEventListener('change', priceChangeHandler);

  var selectInChangeHandler = function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  };
  timeIn.addEventListener('change', selectInChangeHandler);

  var selectOutChangeHandler = function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  };
  timeOut.addEventListener('change', selectOutChangeHandler);

  adForm.addEventListener('change', function () {
    if (roomNumber.value !== '100' && capacity.value === '0') {
      capacity.setCustomValidity('Выберите количество гостей');
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Эти комнаты не для гостей');
    } else if ((roomNumber.value === '1' && capacity.value !== '1') || (roomNumber.value === '2' && capacity.value === '3')) {
      capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else {
      capacity.setCustomValidity('');
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), uploadForm, window.map.displayErrorHandler);
  });

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      document.querySelector('.map__card').remove();
    }
  };

  var resetHandler = function () {
    adForm.reset();
    adMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disableForm(true);
    window.map.pinMain.style = 'left:' + POSITION_LEFT + 'px; top:' + POSITION_TOP + 'px;';
    var mapPinNot = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinNot.length; i++) {
      document.querySelector('.map__pins').removeChild(mapPinNot[i]);
    }
    removeCard();
  };
  adFormReset.addEventListener('click', resetHandler);

  var displaySuccessHandler = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var newSuccess = success.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('beforebegin', newSuccess);
    newSuccess.addEventListener('click', closeSuccessHandler);
    document.addEventListener('keydown', successEscPressHandler);
  };

  var closeSuccessHandler = function () {
    var success = document.querySelector('.success');
    document.querySelector('body').removeChild(success);
  };

  var successEscPressHandler = function (evt) {
    if (evt.keyCode === window.const.ESC_KEY) {
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', successEscPressHandler);
    }
  };

  var uploadForm = function () {
    resetHandler();
    displaySuccessHandler();
  };

  window.form = {
    displayCard: displayCard,
    popupCloseClickHandler: popupCloseClickHandler,
    popupEscPressHandler: popupEscPressHandler,
    sendBlock: adForm,
    disable: disableForm,
    removeCard: removeCard,
    adMap: adMap
  };
})();
