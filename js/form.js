'use strict';

(function () {
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var typeAndPrice = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var MIN_LENGTH_INPUT = 30;

  var noticeForm = document.querySelector('.notice__form');
  var titleAdwords = noticeForm.querySelector('#title');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var timeArray = window.data.checkInOut;
  var typeHousing = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacityRoom = noticeForm.querySelector('#capacity');
  var addressHouse = noticeForm.querySelector('#address');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var onSyncTimeIn = function () {
    window.synchronizeFields(timein, timeout, timeArray, timeArray, syncValues);
  };

  var onSyncTimeOut = function () {
    window.synchronizeFields(timeout, timein, timeArray, timeArray, syncValues);
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var onClickHousingSync = function () {
    var index = typeHousing.selectedIndex;
    price.setAttribute('placeholder', window.data.typesArray[index].price);

    window.synchronizeFields(typeHousing, price, Object.keys(typeAndPrice), Object.values(typeAndPrice), syncValueWithMin);
  };

  function onRoomNumberChange() {
    if (capacityRoom.options.length > 0) {
      [].forEach.call(capacityRoom.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  }

  var resetForm = function () {
    noticeForm.reset();
  };

  var onUploadForm = function (evt) {
    window.backend.upload(new FormData(noticeForm), resetForm, window.data.messageError);
    evt.preventDefault();
  };

  onRoomNumberChange();

  timein.addEventListener('change', onSyncTimeIn);
  timeout.addEventListener('change', onSyncTimeOut);
  typeHousing.addEventListener('change', onClickHousingSync);
  roomNumber.addEventListener('change', onRoomNumberChange);

  titleAdwords.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_LENGTH_INPUT) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_LENGTH_INPUT + '-и символов');
    } else {
      target.setCustomValidity('');
    }
  });

  noticeForm.addEventListener('submit', onUploadForm);

  window.form = {
    address: addressHouse,
    mainForm: noticeForm
  };
})();
