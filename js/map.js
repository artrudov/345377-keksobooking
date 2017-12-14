'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = [{en: 'flat', ru: 'Квартира'}, {en: 'house', ru: 'Дом'}];
var CHECKIN_AND_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AMOUNT_ADWORDS = 8;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var adwords = [];
var pins = [];

var swapFeatures = FEATURES;
var mapCard = document.querySelector('.map');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapElementsPin = mapCard.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapVisible = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');

var titleAdwords = noticeForm.querySelector('#title');
var timein = noticeForm.querySelector('#timein');
var timeout = noticeForm.querySelector('#timeout');

timein.addEventListener('change', function (evt) {
// доработать обработчик инфу почитать на http://www.tigir.com/javascript_select.htm
});


var popupClose;

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

var removePinActive = function () {
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('map__pin--active');
  }
  mapCard.removeChild(mapCard.children[1]);
};

var installPinActive = function (evt) {
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('map__pin--active');
  }

  evt.classList.add('map__pin--active');
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removePinActive();
    popupClose = 0;
  }
};

var onPopipEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    removePinActive();
    popupClose = 0;
  }
};

var renderPin = function (ads) {
  var pinElement = pinTemplate.cloneNode(true);
  var avatarImageUrl = pinElement.children;

  pinElement.setAttribute('style', 'left:' + ads.location.x + 'px;' + ' ' + 'top:' + ads.location.y + 'px;');
  avatarImageUrl[0].setAttribute('src', ads.author.avatar);

  pinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onClickPin();
    }
  });

  document.addEventListener('keydown', onPopupEscPress);

  pinElement.addEventListener('click', onClickPin);

  function onClickPin() {
    pins = document.querySelectorAll('.map__pin');

    if (!pinElement.classList.contains('map__pin--active') && popupClose) {
      removePinActive();
    }

    if (pinElement.classList.contains('map__pin--active')) {
      return;
    }

    installPinActive(pinElement);
    mapCard.insertBefore(renderCard(ads), mapCard.lastChild.previousSibling);

    popupClose = mapCard.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      removePinActive();
      popupClose = 0;
    });

    popupClose.addEventListener('keydown', onPopipEnterPress);
  }

  return pinElement;
};


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

var renderCard = function (ads) {
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
};

var renderFragment = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var k = 0; k < ads.length; k++) {
    fragment.appendChild(renderPin(ads[k]));
  }
  mapElementsPin.appendChild(fragment);
};

getAdwordsArray();

var onClickMainPin = function () {
  mapVisible.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');

  renderFragment(adwords);
  mapVisible.removeEventListener('click', onClickMainPin);
};

mapVisible.addEventListener('click', onClickMainPin);

titleAdwords.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Имя должно состоять минимум из 30-х символов');
  } else {
    target.setCustomValidity('');
  }
});
