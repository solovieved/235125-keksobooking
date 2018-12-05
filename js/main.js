'use strict';
var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECK = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTION = '';
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var QUANTITY_OBJECTS = 8;
var PIN_WIDTH = 50;
var MAP = document.querySelector('.map');

// генератор адресов аватарок
var avatarGenerator = function (quantity) {
  var adAvatar = [];
  for (var i = 1; i <= quantity; i++) {
    var link = 'img/avatars/user' + '0' + i + '.png';
    adAvatar.push(link);
  }
  return adAvatar;
};
var adAvatar = avatarGenerator(QUANTITY_OBJECTS);

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

var generatorObject = function () {
  var ads = [];
  for (var i = 0; i < QUANTITY_OBJECTS; i++) {
    var locationX = getRandomNum(PIN_WIDTH / 2, MAP.offsetWidth - PIN_WIDTH / 2);
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
var array = generatorObject();

// активация карты
MAP.classList.remove('map--faded');

// разметка пина из шаблона
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

// наполненние меток данными
var renderPin = function (pinAd) {
  var newPin = pin.cloneNode(true);
  newPin.style.left = pinAd.location.x + 'px';
  newPin.style.top = pinAd.location.y + 'px';
  newPin.querySelector('img').src = pinAd.author.avatar;
  newPin.querySelector('img').alt = pinAd.offer.title;
  return newPin;
};

var fragment = document.createDocumentFragment();

// создание меток
for (var i = 0; i < QUANTITY_OBJECTS; i++) {
  fragment.appendChild(renderPin(array[i]));
}

// отрисовка меток
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);

// разметка карточки из шаблона
var card = document.querySelector('#card').content.querySelector('.map__card');

// фото в объявлении
var getPhotos = function (arr) {
  for (var p = 0; p < arr.length; p++) {
    var img = document.createElement('img');
    img.className = 'popup__photo';
    img.src = arr[p];
    img.alt = 'Фотография жилья';
    img.width = 45;
    img.height = 40;
    fragment.appendChild(img);
  }
  return fragment;
};

// доступные удобства
var getFeatures = function (arr) {
  for (var q = 0; q < arr.length; q++) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + arr[q];
    fragment.appendChild(li);
  }
  return fragment;
};

// создание объявлений
var renderCard = function (cardAd) {
  var newCard = card.cloneNode(true);
  var typeRus;
  switch (cardAd.offer.type) {
    case 'flat':
      typeRus = 'Квартира';
      break;
    case 'bungalo':
      typeRus = 'Бунгало';
      break;
    case 'house':
      typeRus = 'Дом';
      break;
    case 'palace':
      typeRus = 'Дворец';
      break;
  }
  newCard.querySelector('.popup__title').textContent = cardAd.offer.title;
  newCard.querySelector('.popup__text--address').textContent = cardAd.offer.address;
  newCard.querySelector('.popup__text--price').textContent = cardAd.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = typeRus;
  newCard.querySelector('.popup__text--capacity').textContent = cardAd.offer.rooms + 'комнаты для ' + cardAd.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardAd.offer.checkin + ', выезд до ' + cardAd.offer.checkout;
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__features').appendChild(getFeatures(cardAd.offer.features));
  newCard.querySelector('.popup__description').textContent = cardAd.offer.description;
  newCard.querySelector('.popup__photos').innerHTML = '';
  newCard.querySelector('.popup__photos').appendChild(getPhotos(cardAd.offer.photos));
  newCard.querySelector('.popup__avatar').src = cardAd.author.avatar;
  return newCard;
};

MAP.insertBefore(renderCard(array[0]), MAP.querySelector('.map__filters-container'));
