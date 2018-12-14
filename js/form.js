'use strict';
(function () {
  var fieldset = document.querySelectorAll('fieldset');
  var mapFilter = document.querySelectorAll('.map__filter');

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

  var adForm = document.querySelector('.ad-form');

  var displayCard = function (ads) {
    window.data.map.insertBefore(window.card.renderCard(ads), window.data.map.querySelector('.map__filters-container'));
  };

  var popupCloseClickHandler = function () {
    window.data.map.querySelector('.map__card').remove();
    window.card.newCard.querySelector('.popup__close').removeEventListener('click', popupCloseClickHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      window.data.map.querySelector('.map__card').remove();
      document.removeEventListener('keydown', popupEscPressHandler);
    }
  };

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var priceChangeHandler = function () {
    price.placeholder = window.utils.TYPES[type.value].min;
    price.min = window.utils.TYPES[type.value].min;
  };
  type.addEventListener('change', priceChangeHandler);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var selectInChangeHandler = function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  };
  timeIn.addEventListener('change', selectInChangeHandler);

  var selectOutChangeHandler = function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  };
  timeOut.addEventListener('change', selectOutChangeHandler);

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var checkGuestNumber = function () {
    adForm.addEventListener('submit', function () {
      if (roomNumber.value !== '100' && capacity.value === '0') {
        capacity.setCustomValidity('Выберите количество гостей');
      } else if (roomNumber.value === '100' && capacity.value !== '0') {
        capacity.setCustomValidity('Эти комнаты не для гостей');
      } else if ((roomNumber.value === '1' && capacity.value !== '1') || (roomNumber.value === '2' && capacity.value === '3')) {
        capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
      } else {
        capacity.setCustomValidity('');
        adForm.submit();
      }
    });
  };
  checkGuestNumber();
  window.form = {
    displayCard: displayCard,
    popupCloseClickHandler: popupCloseClickHandler,
    popupEscPressHandler: popupEscPressHandler,
    adForm: adForm,
    disableForm: disableForm
  };
})();
