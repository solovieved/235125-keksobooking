'use strict';
(function () {
  // фото в объявлении
  var getPhotos = function (arr) {
    var fragment = document.createDocumentFragment();
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
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + arr[i];
      fragment.appendChild(li);
    }
    return fragment;
  };

  // разметка карточки из шаблона
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var newCard = card.cloneNode(true);

  // создание объявлений
  var renderCard = function (cardAd) {
    newCard.querySelector('.popup__title').textContent = cardAd.offer.title;
    newCard.querySelector('.popup__text--address').textContent = cardAd.offer.address;
    newCard.querySelector('.popup__text--price').textContent = cardAd.offer.price + ' ₽/ночь';
    newCard.querySelector('.popup__type').textContent = window.const.TYPES[cardAd.offer.type].rus;
    newCard.querySelector('.popup__text--capacity').textContent = cardAd.offer.rooms + 'комнаты для ' + cardAd.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardAd.offer.checkin + ', выезд до ' + cardAd.offer.checkout;
    newCard.querySelector('.popup__features').innerHTML = '';
    newCard.querySelector('.popup__features').appendChild(getFeatures(cardAd.offer.features));
    newCard.querySelector('.popup__description').textContent = cardAd.offer.description;
    newCard.querySelector('.popup__photos').innerHTML = '';
    newCard.querySelector('.popup__photos').appendChild(getPhotos(cardAd.offer.photos));
    newCard.querySelector('.popup__avatar').src = cardAd.author.avatar;
    newCard.querySelector('.popup__close').addEventListener('click', window.form.popupCloseClickHandler);
    document.addEventListener('keydown', window.form.popupEscPressHandler);
    return newCard;
  };

  window.card = {
    renderCard: renderCard,
    newCard: newCard
  };
})();
