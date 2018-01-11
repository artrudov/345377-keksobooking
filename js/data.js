'use strict';

(function () {
  var adwordsLoad = [];

  var succesLoad = function (adwords) {
    adwords.forEach(function (item) {
      adwordsLoad.push(item);
    });
  };

  var errorLoad = function (message) {
    var errorContainer = document.createElement('div');
    errorContainer.setAttribute('style', 'position: absolute; left: 0; top: 0; margin: 0 auto; width: 100%; padding: 10px 0; font-size: 30px; text-align: center; background-color: red; color: white; z-index: 100;');
    errorContainer.textContent = message;
    document.body.appendChild(errorContainer);
  };

  window.backend.load(succesLoad, errorLoad);

  window.data = {
    adwordsArray: adwordsLoad,
    messageError: errorLoad
  };
})();
