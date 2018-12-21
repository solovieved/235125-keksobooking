'use strict';
(function () {
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
  var POSITION_LEFT = 570;
  var POSITION_TOP = 375;

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
    window.data.map.insertBefore(window.card.renderCard(ads), window.data.map.querySelector('.map__filters-container'));
  };

  var popupCloseClickHandler = function () {
    window.data.map.querySelector('.map__card').remove();
    window.card.newCard.querySelector('.popup__close').removeEventListener('click', popupCloseClickHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === window.const.ESC_KEY) {
      window.data.map.querySelector('.map__card').remove();
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
  var checkGuestNumber = function () {
    adForm.addEventListener('click', function (evt) {
      if (roomNumber.value !== '100' && capacity.value === '0') {
        capacity.setCustomValidity('Выберите количество гостей');
      } else if (roomNumber.value === '100' && capacity.value !== '0') {
        capacity.setCustomValidity('Эти комнаты не для гостей');
      } else if ((roomNumber.value === '1' && capacity.value !== '1') || (roomNumber.value === '2' && capacity.value === '3')) {
        capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
      } else {
        capacity.setCustomValidity('');
        window.backend.upload(new FormData(adForm), uploadForm, window.pin.displayError);
        evt.preventDefault();
      }
    });
  };
  checkGuestNumber();
  var onReset = function () {
    adForm.reset();
    window.data.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disableForm(true);
    window.map.mapPinMain.style = 'left:' + POSITION_LEFT + 'px; top:' + POSITION_TOP + 'px;';
    var mapPinNot = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinNot.length; i++) {
      document.querySelector('.map__pins').removeChild(mapPinNot[i]);
    }
    var card = document.querySelector('.map__card');
    if (card !== null) {
      document.querySelector('.map__card').remove();
    }
  };
  adFormReset.addEventListener('click', onReset);

  var onDisplaySuccess = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var NewSuccess = success.cloneNode(true);
    document.querySelector('main').insertAdjacentElement('beforebegin', NewSuccess);
    NewSuccess.addEventListener('click', closeSuccess);
  };

  var closeSuccess = function () {
    var success = document.querySelector('.success');
    document.querySelector('body').removeChild(success);
  };

  var uploadForm = function () {
    onReset();
    onDisplaySuccess();
  };

  window.form = {
    displayCard: displayCard,
    popupCloseClickHandler: popupCloseClickHandler,
    popupEscPressHandler: popupEscPressHandler,
    adForm: adForm,
    disableForm: disableForm
  };
})();
