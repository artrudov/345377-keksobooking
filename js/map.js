'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = [{flat: {ru: 'Квартира'}}, {house: {ru: 'Дом'}}, {bungalo: {ru: 'Бунгало'}}];
var CHECKIN_AND_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AMOUNT_ADWORDS = 8;

var mapVisible = document.querySelector('.map');
mapVisible.classList.remove('map--faded');

var getRandomIndexArray = function (targetArray) {
  return Math.floor(Math.random() * targetArray.length);
};

var getMinMaxRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function compareRandom() {
  return Math.random() - 0.5;
}

var getAdwordContent = function (numberImage) {

  var coordinateX = getMinMaxRandom(300, 900);
  var coordinateY = getMinMaxRandom(100, 500);
  var urlAvatar = 'img/avatars/user0' + (numberImage + 1) + '.png';
  swapFeatures.sort(compareRandom);
  var features = swapFeatures.slice(0, getRandomIndexArray(swapFeatures) - 1);

  return {
    author: {
      avatar: urlAvatar
    },

    offer: {
      title: TITLES[getRandomIndexArray(TITLES)],
      address: coordinateX + ' ' + coordinateY,
      price: getMinMaxRandom(1000, 1000000),
      type: TYPES[getRandomIndexArray(TYPES)],
      rooms: getMinMaxRandom(1, 5),
      guests: getMinMaxRandom(1, 100),
      ckeckin: CHECKIN_AND_OUT[getRandomIndexArray(CHECKIN_AND_OUT)],
      checkout: CHECKIN_AND_OUT[getRandomIndexArray(CHECKIN_AND_OUT)],
      features: features,
      description: '',
      photos: []
    },

    location: {
      x: coordinateX,
      y: coordinateY
    }
  };
};

var adwords = [];
for (var i = 0; i < AMOUNT_ADWORDS; i++) {
  var swapFeatures = FEATURES;

  adwords[i] = getAdwordContent(i);
  swapFeatures = FEATURES;
}

var mapElementsPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');


var renderPin = function (ads) {
  var pinElement = pinTemplate.cloneNode(true);
  var avatarImageUrl = pinElement.children;

  pinElement.setAttribute('style', 'left:' + ads.location.x + 'px;' + ' ' + 'top:' + ads.location.y + 'px;');
  avatarImageUrl[0].setAttribute('src', ads.author.avatar);

  return pinElement;
};


var mapCard = document.querySelector('.map');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var insertListItem = function (ads) {
  var cardListFeatures = mapCardTemplate.querySelector('.popup__features');

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

var renderCard = function (ads) {
  var cardElement = mapCardTemplate.cloneNode(true);
  var cardTitle = mapCardTemplate.querySelector('h3');
  var cardAddress = mapCardTemplate.querySelector('small');
  var cardPrice = mapCardTemplate.querySelector('.popup__price');
  var cardType = mapCardTemplate.querySelector('h4');
  var cardParagraph = mapCardTemplate.querySelectorAll('p');
  var cardAvatar = mapCardTemplate.querySelector('.popup__avatar');


  cardTitle.innerHTML = ads.offer.title;
  cardAddress.innerHTML = ads.offer.address;
  cardPrice.innerHTML = ads.offer.price + '&#x20bd;/ночь';
  cardParagraph[2].innerHTML = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  cardParagraph[3].innerHTML = 'Заезд после ' + ads.offer.ckeckin + ', выезд до ' + ads.offer.checkout;
  cardParagraph[4].innerHTML = ads.offer.description;
  cardAvatar.setAttribute('src', ads.author.avatar);

  if (ads.offer.type.flat) {
    cardType.innerHTML = ads.offer.type.flat.ru;
  } else if (ads.offer.type.bungalo) {
    cardType.innerHTML = ads.offer.type.bungalo.ru;
  } else {
    cardType.innerHTML = ads.offer.type.house.ru;
  }

  insertListItem(ads);

  return cardElement;
};

var renderFragment = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var k = 0; k < ads.length; k++) {
    fragment.appendChild(renderPin(ads[k]));
  }

  mapElementsPin.appendChild(fragment);
  mapCard.insertBefore(renderCard(ads[0]), mapCard.children[1]).style = 'display: none;';
  mapCard.insertBefore(renderCard(ads[0]), mapCard.children[1]);
};

renderFragment(adwords);

