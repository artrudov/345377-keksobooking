'use strict';

(function () {
  var MAX_TOP = 500;
  var MIN_TOP = 100;
  var MIN_LEFT = 0;
  var MAX_RIGHT = window.pin.map.offsetWidth;
  var AMOUNT_ADWORDS = 5;
  var TYPES = ['all', 'flat', 'house', 'bungalo'];
  var PRICES = ['all', '10000 - 500000\u20bd', 'до 10000\u20bd', 'от 500000\u20bd'];

  var renderFragment = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var k = 0; k < AMOUNT_ADWORDS; k++) {
      fragment.appendChild(window.pin.renderPin(ads[k]));
    }
    window.pin.mapElementsPin.appendChild(fragment);
  };


  var onClickMainPin = function () {
    var fieldset = window.form.noticeForm.querySelectorAll('fieldset');

    window.pin.mapVisible.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    renderFragment(window.data.adwordsArray);
    window.pin.mapVisible.removeEventListener('click', onClickMainPin);

    for (var i = 1; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled');
    }
  };

  var dialogHandle = document.querySelector('.map__pin--main');
  var address = window.form.address;

  dialogHandle.style.transform = 'translate(-50%, calc(-50% - 22px))';

  window.pin.mapVisible.addEventListener('click', onClickMainPin);

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    address.value = 'x: ' + dialogHandle.offsetLeft + ' y: ' + dialogHandle.offsetTop;

    var setPostitionPin = function (value1, value2) {
      address.value = 'x: ' + value1 + ' y: ' + value2 + 'px';
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialogHandle.style.top = (dialogHandle.offsetTop - shift.y) + 'px';
      dialogHandle.style.left = (dialogHandle.offsetLeft - shift.x) + 'px';

      address.value = 'x: ' + (dialogHandle.offsetLeft - shift.x) + ' y: ' + (dialogHandle.offsetTop - shift.y);

      if (dialogHandle.offsetTop - shift.y > MAX_TOP) {
        dialogHandle.style.top = MAX_TOP + 'px';
        setPostitionPin(dialogHandle.offsetLeft - shift.x, MAX_TOP);
      }

      if (dialogHandle.offsetTop - shift.y < MIN_TOP) {
        dialogHandle.style.top = MIN_TOP + 'px';
        setPostitionPin(dialogHandle.offsetLeft - shift.x, MIN_TOP);
      }

      if (dialogHandle.offsetLeft - shift.x < MIN_LEFT) {
        dialogHandle.style.left = MIN_LEFT;
        setPostitionPin(MIN_LEFT, dialogHandle.offsetTop - shift.y);
      }

      if (dialogHandle.offsetLeft - shift.x > MAX_RIGHT) {
        dialogHandle.style.left = MAX_RIGHT + 'px';
        setPostitionPin(MAX_RIGHT, dialogHandle.offsetTop - shift.y);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    var containerFiltres = document.querySelector('.map__filters');
    var typeFilter = containerFiltres.querySelector('#housing-type');
    var priceFilter = containerFiltres.querySelector('#housing-price');
    var roomsFilter = containerFiltres.querySelector('#housing-rooms');
    var guestFilter = containerFiltres.querySelector('#housing-guests');
    var featuresFilter = containerFiltres.querySelectorAll('input[type=checkbox]');

    var swapArray = [];

    var getTypeFilter = function (value) {
      swapArray = window.data.adwordsArray.filter(function (adwords) {
        return adwords.offer.type === value;
      });
    };

    var getRoomsFilter = function (value) {
      value = Number(value);
      swapArray = window.data.adwordsArray.filter(function (adwords) {
        return adwords.offer.rooms === value;
      });
    };

    var getGuestsFilter = function (value) {
      value = Number(value);
      swapArray = window.data.adwordsArray.filter(function (adwords) {
        return adwords.offer.guests === value;
      });
    };

    var onCgangeTypeFilter = function () {
      var index = typeFilter.selectedIndex;
      var value = typeFilter.options[index].value;

      switch (value) {
        case 'any':
          swapArray = window.data.adwordsArray.slice(0, 5);
          break;
        default:
          getTypeFilter(value);
      }

      return swapArray;
    };

    var onChangePriceFilter = function () {
      var index = priceFilter.selectedIndex;
      var value = priceFilter.options[index].value;
      switch (value) {
        case 'any':
          swapArray = window.data.adwordsArray.slice(0, 5);
          break;
        case 'middle':
          swapArray = window.data.adwordsArray.filter(function (adwords) {
            return (10000 <= adwords.offer.price && adwords.offer.price <= 50000);
          });
          break;
        case 'low':
          swapArray = window.data.adwordsArray.filter(function (adwords) {
            return 10000 >= adwords.offer.price;
          });
          break;
        case 'high':
          swapArray = window.data.adwordsArray.filter(function (adwords) {
            return 50000 <= adwords.offer.price;
          });
          break;
      }

      return swapArray;
    };

    var onChangeRoomsFilter = function () {
      var index = roomsFilter.selectedIndex;
      var value = roomsFilter.options[index].value;

      switch (value) {
        case 'any':
          swapArray = window.data.adwordsArray.slice(0, 5);
          break;
        default:
          getRoomsFilter(value);
      }

      return swapArray;
    };

    var onChangeGuestsFilter = function () {
      var index = guestFilter.selectedIndex;
      var value = guestFilter.options[index].value;

      switch (value) {
        case 'any':
          swapArray = window.data.adwordsArray.slice(0, 5);
          break;
        default:
          getGuestsFilter(value);
      }

      return swapArray;
    };

    typeFilter.addEventListener('change', onCgangeTypeFilter);
    priceFilter.addEventListener('change', onChangePriceFilter);
    roomsFilter.addEventListener('change', onChangeRoomsFilter);
    guestFilter.addEventListener('change', onChangeGuestsFilter);
  });
})();
