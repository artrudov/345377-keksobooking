'use strict';

(function () {
// Синхронизация полей времени заезда и выезда
  var checkinTime = document.querySelector('#time');
  var checkoutTime = document.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(checkinTime, checkoutTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);

// Синхронизация типа жилья и минимальной цены
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

// Односторонняя синхронизация значения первого поля с минимальным значением второго
  window.synchronizeFields(apartmentType, pricePerNight, ['apartment', 'shack', 'palace'], [1000, 0, 10000], syncValueWithMin);
})();
