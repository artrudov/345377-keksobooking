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

var getAdwordContent = function () {
  var coordinateX = getMinMaxRandom(300, 900);
  var coordinateY = getMinMaxRandom(100, 500);
  var urlAvatar = 'img/avatars/user0' + getMinMaxRandom(1, 8) + '.png';

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
      features: FEATURES[getRandomIndexArray(FEATURES)],
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
  adwords[i] = getAdwordContent();
}

var mapElementsPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

// ОПИСАТЬ ФУНКЦИЮ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ В КЛОНИРУЕМУЮ НОДУ
var renderPin = function (adwords) {
  var pinElement = pinTemplate.cloneNode(true);
  var avatarImageUrl = pinElement.children;

  avatarImageUrl.setAttribute('src', adwords[j].author.avatar);
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < adwords.length; j++) {
  fragment.appendChild(renderPin(adwords[j]));
}
mapElementsPin.appendChild(fragment);
