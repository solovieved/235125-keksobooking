'use strict';
var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECK = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTION = '';
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var QUANTITY_OBJECTS = 8;
var PIN_WIDTH = 50;
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
var NIB_HEIGHT = 22;
var ESC_KEY = 27;

// генератор адресов аватарок
var generateAvatar = function (quantity) {
  var adAvatar = [];
  for (var i = 1; i <= quantity; i++) {
    var link = 'img/avatars/user' + '0' + i + '.png';
    adAvatar.push(link);
  }
  return adAvatar;
};
var adAvatar = generateAvatar(QUANTITY_OBJECTS);

// случайное число от мин до макс
var getRandomNum = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// случайный элемент массива
var getRandomArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// массива случайной длинны
var getRandomArrayString = function (arr) {
  var values = getRandomNum(0, arr.length);
  var randSet = arr.slice(values);
  return randSet;
};

// массив в произвольном порядке
function shuffleArr(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

var map = document.querySelector('.map');

// массив объявлений
var generateObject = function () {
  var ads = [];
  for (var i = 0; i < QUANTITY_OBJECTS; i++) {
    var locationX = getRandomNum(PIN_WIDTH / 2, map.offsetWidth - PIN_WIDTH / 2);
    var locationY = getRandomNum(130, 630);
    ads.push({
      author: {
        avatar: adAvatar[i]
      },

      offer: {
        title: getRandomArray(AD_TITLE),
        address: locationX + ', ' + locationY,
        price: getRandomNum(1000, 1000000),
        type: getRandomArray(AD_TYPE),
        rooms: getRandomNum(1, 5),
        guests: getRandomNum(1, 10),
        checkin: getRandomArray(AD_CHECK),
        checkout: getRandomArray(AD_CHECK),
        features: getRandomArrayString(AD_FEATURES),
        description: AD_DESCRIPTION,
        photos: shuffleArr(AD_PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return ads;
};
var array = generateObject();

// разметка пина из шаблона
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

// наполненние меток данными
var renderPin = function (pinAd) {
  var newPin = pin.cloneNode(true);
  var handlePinClick = function () {
    displayCard(pinAd);
  };
  newPin.addEventListener('click', handlePinClick);
  newPin.style.left = pinAd.location.x + 'px';
  newPin.style.top = pinAd.location.y + 'px';
  newPin.querySelector('img').src = pinAd.author.avatar;
  newPin.querySelector('img').alt = pinAd.offer.title;
  return newPin;
};

var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

// создание меток
var drawPin = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  return fragment;
};

// разметка карточки из шаблона
var card = document.querySelector('#card').content.querySelector('.map__card');

// фото в объявлении
var getPhotos = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var img = document.createElement('img');
    img.className = 'popup__photo';
    img.src = arr[i];
    img.alt = 'Фотография жилья';
    img.width = 45;
    img.height = 40;
    fragment.appendChild(img);
  }
  return fragment;
};

// доступные удобства
var getFeatures = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + arr[i];
    fragment.appendChild(li);
  }
  return fragment;
};

var newCard = card.cloneNode(true);

// создание объявлений
var renderCard = function (cardAd) {
  newCard.querySelector('.popup__title').textContent = cardAd.offer.title;
  newCard.querySelector('.popup__text--address').textContent = cardAd.offer.address;
  newCard.querySelector('.popup__text--price').textContent = cardAd.offer.price + ' ₽/ночь';
  newCard.querySelector('.popup__type').textContent = TYPES.rus[cardAd.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = cardAd.offer.rooms + 'комнаты для ' + cardAd.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardAd.offer.checkin + ', выезд до ' + cardAd.offer.checkout;
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__features').appendChild(getFeatures(cardAd.offer.features));
  newCard.querySelector('.popup__description').textContent = cardAd.offer.description;
  newCard.querySelector('.popup__photos').innerHTML = '';
  newCard.querySelector('.popup__photos').appendChild(getPhotos(cardAd.offer.photos));
  newCard.querySelector('.popup__avatar').src = cardAd.author.avatar;
  newCard.querySelector('.popup__close').addEventListener('click', popupCloseClickHandler);
  document.addEventListener('keydown', popupEscPressHandler);
  return newCard;
};

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

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var address = document.querySelector('#address');

// активация по клику
mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  disableForm(false);
  mapPins.appendChild(drawPin(array));
  address.value = Math.round((mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2)) + ', ' + Math.round((mapPinMain.offsetTop + mapPinMain.offsetHeight + NIB_HEIGHT));
});

var displayCard = function (ads) {
  map.insertBefore(renderCard(ads), map.querySelector('.map__filters-container'));
};

var popupCloseClickHandler = function () {
  map.querySelector('.map__card').remove();
  newCard.querySelector('.popup__close').removeEventListener('click', popupCloseClickHandler);
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    map.querySelector('.map__card').remove();
    document.removeEventListener('keydown', popupEscPressHandler);
  }
};

var type = document.querySelector('#type');
var price = document.querySelector('#price');

var priceChangeHandler = function () {
  price.placeholder = TYPES[type.value].min;
  price.min = TYPES[type.value].min;
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
