'use strict';
(function () {
  var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var AD_CHECK = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var AD_DESCRIPTION = '';
  var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var QUANTITY_OBJECTS = 8;
  var PIN_WIDTH = 50;

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

  window.data = {
    generateObject: generateObject,
    map: map
  };
})();
