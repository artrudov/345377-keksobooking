'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = [
    {
      en: 'flat',
      ru: 'Квартира',
      price: '1000'
    },
    {
      en: 'bungalo',
      ru: 'Бунгало',
      price: '0'
    },
    {
      en: 'house',
      ru: 'Дом',
      price: '5000'
    }, {
      en: 'palace',
      ru: 'Дворец',
      price: '10000'
    }
  ];

  var CHECKIN_AND_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var AMOUNT_ADWORDS = 8;

  var adwords = [];
  var swapFeatures = FEATURES;

  var getRandomIndexArray = function (targetArray) {
    return Math.floor(Math.random() * targetArray.length);
  };

  var getMinMaxRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

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

  var getAdwordsArray = function () {
    for (var i = 0; i < AMOUNT_ADWORDS; i++) {

      adwords[i] = getAdwordContent(i);
      swapFeatures = FEATURES;
    }
  };

  getAdwordsArray();

  window.data = {
    adwordsArray: adwords,
    typesArray: TYPES,
    checkInOut: CHECKIN_AND_OUT
  };
})();
