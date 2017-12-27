'use strict';

(function () {
  var mapCard = document.querySelector('.map');
  var mapElementsPin = mapCard.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapVisible = document.querySelector('.map');

  window.pin = {
    renderPin: function (ads) {
      var pinElement = pinTemplate.cloneNode(true);
      var avatarImageUrl = pinElement.children;

      pinElement.setAttribute('style', 'left:' + ads.location.x + 'px;' + ' ' + 'top:' + ads.location.y + 'px;');
      avatarImageUrl[0].setAttribute('src', ads.author.avatar);

      window.showCard.show(pinElement, ads);

      return pinElement;
    },
    mapVisible: mapVisible,
    mapElementsPin: mapElementsPin,
    map: mapCard
  };
})();
