'use strict';

(function () {
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

  var adwordsLoad = [];

  var succesLoad = function (adwords) {
    adwords.forEach(function (item) {
      adwordsLoad.push(item);
    });

    window.pin.map.addEventListener('click', window.map.onClickMainPin);
  };

  var errorLoad = function (errorMessage) {
    var errorContainer = document.createElement('div');
    errorContainer.setAttribute('style', 'position: absolute; left: 0; top: 0; margin: 0 auto; width: 100%; padding: 10px 0; font-size: 30px; text-align: center; background-color: red; color: white; z-index: 100;');
    errorContainer.textContent = errorMessage;
    document.body.appendChild(errorContainer);
  };

  window.backend.load(succesLoad, errorLoad);

  window.data = {
    adwordsArray: adwordsLoad,
    typesArray: TYPES,
    checkInOut: CHECKIN_AND_OUT,
    messageError: errorLoad
  };
})();
