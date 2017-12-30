'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var popupClose;
  var pins = [];


  var installPinActive = function (evt) {
    pins.forEach(function (item) {
      item.classList.remove('map__pin--active');
    });

    evt.classList.add('map__pin--active');
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePinActive();
      popupClose = 0;
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      removePinActive();
      popupClose = 0;
    }
  };

  var removePinActive = function () {
    pins.forEach(function (item) {
      item.classList.remove('map__pin--active');
    });

    window.pin.map.removeChild(window.pin.map.children[1]);
    window.pin.map.removeEventListener('keydown', window.showCard.popupEscPress);
  };

  window.showCard = {
    show: function (pinElement, ads) {

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

        window.pin.map.insertBefore(window.card.renderCard(ads), window.pin.map.lastChild.previousSibling);

        popupClose = window.pin.map.querySelector('.popup__close');

        window.pin.map.addEventListener('keydown', onPopupEscPress);

        popupClose.addEventListener('keydown', onPopupEnterPress);

        popupClose.addEventListener('click', function () {
          removePinActive();
          popupClose = 0;
        });
      }

    },
    pins: pins,
    popupEscPress: onPopupEscPress
  };

})();
