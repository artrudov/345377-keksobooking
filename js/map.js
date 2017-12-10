'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_AND_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
for (var i = 0; i < 8; i++) {
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


// Дописать!
var mapCard = document.querySelector('.map');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderCard = function (sda) {
  var cardElement = mapCardTemplate.cloneNode(true);
  var cardTitle = mapCardTemplate.querySelector('h3');
  var cardAddress = mapCardTemplate.querySelector('small');
  var cardPrice = mapCardTemplate.querySelector('.popup__price');
  var cardType = mapCardTemplate.querySelector('h4');
  var cardParagraph = mapCardTemplate.querySelectorAll('p');
  var cardAvatar = mapCardTemplate.querySelector('.popup__avatar');
  var cardListFeatures = mapCardTemplate.querySelector('.popup__features');

  cardTitle.innerHTML = sda.offer.title;
  cardAddress.innerHTML = sda.offer.address;
  cardPrice.innerHTML = sda.offer.price;
  cardParagraph[2].innerHTML = sda.offer.rooms + ' комнаты для ' + sda.offer.guests + ' гостей';
  cardParagraph[3].innerHTML = 'Заезд после ' + sda.offer.ckeckin + ', выезд до ' + sda.offer.checkout;
  cardParagraph[4].innerHTML = sda.offer.description;
  cardAvatar.setAttribute('src', sda.author.avatar);

  if (sda.offer.type === 'flat') {
    cardType.innerHTML = 'Квартира';
  } else if (sda.offer.type === 'bungalo') {
    cardType.innerHTML = 'Бунгало';
  } else {
    cardType.innerHTML = 'Дом';
  }

  while (cardListFeatures.firstChild) {
    cardListFeatures.removeChild(cardListFeatures.firstChild);
  }

  var lengthFeaturesArray = sda.offer.features.length;

  for (var s = 0; s < lengthFeaturesArray; s++) {
    var newListItem = document.createElement('li');
    newListItem.className = 'feature feature--' + sda.offer.features[s];
    cardListFeatures.appendChild(newListItem);
  }

  return cardElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < adwords.length; k++) {
  fragment.appendChild(renderPin(adwords[k]));
}

mapElementsPin.appendChild(fragment);

mapCard.insertBefore(renderCard(adwords[0]), mapCard.children[1]);

mapCard.appendChild(renderCard(adwords[0]));
