'use strict';

(function () {
  var mapCard = document.querySelector('.map');
  var mapElementsPin = mapCard.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapVisible = document.querySelector('.map');

  window.pin = {
    renderPin: function (adwords) {
      var pinElement = pinTemplate.cloneNode(true);
      var avatarImageUrl = pinElement.children;

      pinElement.setAttribute('style', 'left:' + adwords.location.x + 'px;' + ' ' + 'top:' + adwords.location.y + 'px;');
      avatarImageUrl[0].setAttribute('src', adwords.author.avatar);

      window.showCard.show(pinElement, adwords);

      return pinElement;
    },
    mainPin: mapVisible,
    mapPin: mapElementsPin,
    map: mapCard
  };
})();
