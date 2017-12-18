'use strict';

(function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var insertListItem = function (ads, cardListFeatures) {

    while (cardListFeatures.firstChild) {
      cardListFeatures.removeChild(cardListFeatures.firstChild);
    }

    var lengthFeaturesArray = ads.offer.features.length;

    for (var s = 0; s < lengthFeaturesArray; s++) {
      var newListItem = document.createElement('li');
      newListItem.className = 'feature feature--' + ads.offer.features[s];
      cardListFeatures.appendChild(newListItem);
    }
  };

  window.card = {
    renderCard: function (ads) {
      var cardElement = mapCardTemplate.cloneNode(true);

      var cardTitle = cardElement.querySelector('h3');
      var cardAddress = cardElement.querySelector('small');
      var cardPrice = cardElement.querySelector('.popup__price');
      var cardType = cardElement.querySelector('h4');
      var cardParagraph = cardElement.querySelectorAll('p');
      var cardAvatar = cardElement.querySelector('.popup__avatar');
      var cardListFeatures = cardElement.querySelector('.popup__features');

      cardTitle.textContent = ads.offer.title;
      cardAddress.innerHTML = ads.offer.address;
      cardPrice.innerHTML = ads.offer.price + '&#x20bd;/ночь';
      cardParagraph[2].innerHTML = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
      cardParagraph[3].innerHTML = 'Заезд после ' + ads.offer.ckeckin + ', выезд до ' + ads.offer.checkout;
      cardParagraph[4].innerHTML = ads.offer.description;
      cardAvatar.setAttribute('src', ads.author.avatar);

      cardType.innerHTML = ads.offer.type.ru;

      insertListItem(ads, cardListFeatures);

      return cardElement;
    }
  };
})();

