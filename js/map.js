'use strict';

(function () {
  var MAX_TOP = 500;
  var MIN_TOP = 100;
  var MIN_LEFT = 0;
  var MAX_RIGHT = window.pin.map.offsetWidth;
  var AMOUNT_ADWORDS = 5;
  var DEBOUNCE_INTERVAL = 500;

  var renderFragment = function (adwords, count) {
    var fragment = document.createDocumentFragment();
    if (count > AMOUNT_ADWORDS) {
      count = AMOUNT_ADWORDS;
    }
    for (var i = 0; i < count; i++) {
      fragment.appendChild(window.pin.renderPin(adwords[i]));
    }
    window.pin.mapElementsPin.appendChild(fragment);
  };


  var onClickMainPin = function () {
    var fieldset = window.form.noticeForm.querySelectorAll('fieldset');

    window.pin.mapVisible.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    renderFragment(window.data.adwordsArray, AMOUNT_ADWORDS);
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
  });

  var PRICE_MIDDLE_MIN = 10000;
  var PRICE_MIDDLE_MAX = 50000;

  var priceOptions = {
    'low': function (price) {
      return price < PRICE_MIDDLE_MIN;
    },
    'middle': function (price) {
      return price >= PRICE_MIDDLE_MIN && price <= PRICE_MIDDLE_MAX;
    },
    'high': function (price) {
      return price > PRICE_MIDDLE_MAX;
    }
  };

  var filteringPrice = function (list, value) {
    return list.filter(function (element) {
      return priceOptions[value](element.offer.price);
    });
  };

  var filteringValue = function (list, value, type) {
    return list.filter(function (element) {
      if (type === 'guests') {
        return element.offer[type] >= parseInt(value, 0);
      } else {
        return element.offer[type].toString() === value;
      }
    });
  };

  var filterFeatures = function (list, feature) {
    return list.filter(function (element) {
      return element.offer.features.indexOf(feature) !== -1;
    });
  };

  var filters = document.querySelector('.map__filters');
  var newArray = [];

  var getFilteredData = function (defaultArray) {
    var checkFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var filtersSelects = filters.querySelectorAll('select');

    newArray = defaultArray.slice();

    Array.from(filtersSelects).filter(function (element) {
      return element.value !== 'any';
    }).forEach(function (element) {
      var type = element.name.split('-')[1];
      newArray = (type === 'price') ? filteringPrice(newArray, element.value) : filteringValue(newArray, element.value, type);
    });

    checkFeatures.forEach(function (element) {
      newArray = filterFeatures(newArray, element.value);
    });

    return newArray;
  };

  var renderFilterData = function () {
    var renderPins = document.querySelector('.map__pins');

    while (dialogHandle.nextSibling) {
      renderPins.removeChild(renderPins.lastChild);
    }

    renderFragment(newArray, newArray.length);
  };

  var lastTimeout;
  var debounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };

  filters.addEventListener('change', function () {
    getFilteredData(window.data.adwordsArray);
    debounce(renderFilterData);
  });

})();
