'use strict';

(function () {
  var pins = [];

  var mapCard = document.querySelector('.map');
  var mapElementsPin = mapCard.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapVisible = document.querySelector('.map');

  var popupClose;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  var removePinActive = function () {
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
    mapCard.removeChild(mapCard.children[1]);
    mapCard.removeEventListener('keydown', onPopupEscPress);
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

  window.pin = {
    renderPin: function (ads) {
      var pinElement = pinTemplate.cloneNode(true);
      var avatarImageUrl = pinElement.children;

      pinElement.setAttribute('style', 'left:' + ads.location.x + 'px;' + ' ' + 'top:' + ads.location.y + 'px;');
      avatarImageUrl[0].setAttribute('src', ads.author.avatar);

      pinElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          onClickPin();
        }
      });

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
        mapCard.insertBefore(window.card.renderCard(ads), mapCard.lastChild.previousSibling);


        popupClose = mapCard.querySelector('.popup__close');

        mapCard.addEventListener('keydown', onPopupEscPress);

        popupClose.addEventListener('click', function () {
          removePinActive();
          popupClose = 0;
        });

        popupClose.addEventListener('keydown', onPopipEnterPress);
      }

      return pinElement;
    },
    mapVisible: mapVisible,
    mapElementsPin: mapElementsPin,
    allPin: pins
  };
})();
