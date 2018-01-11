'use strict';

(function () {
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var TYPE_AND_PRICE = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var MIN_LENGTH_INPUT = 30;
  var MAX_LENGTH_IPNUT = 100;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var SECOND_IMAGE_ELEMENT = 1;
  var SIZE_IMAGE = 40;
  var TARGET_INDEX = 0;

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
    price.setAttribute('placeholder', value);
  };

  var onClickHousingSync = function () {
    window.synchronizeFields(typeHousing, price, Object.keys(TYPE_AND_PRICE), Object.values(TYPE_AND_PRICE), syncValueWithMin);
  };

  var onRoomNumberChange = function () {
    if (capacityRoom.options.length > TARGET_INDEX) {
      [].forEach.call(capacityRoom.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][TARGET_INDEX] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= TARGET_INDEX) ? false : true;
      });
    }
  };

  var resetForm = function () {
    noticeForm.reset();
    onRoomNumberChange();
    price.setAttribute('placeholder', TYPE_AND_PRICE.flat);
    avatarPreview.src = 'img/muffin.png';

    while (imagePreview.children[SECOND_IMAGE_ELEMENT]) {
      imagePreview.removeChild(imagePreview.children[SECOND_IMAGE_ELEMENT]);
    }

  };

  var onUploadForm = function (evt) {
    window.backend.upload(new FormData(noticeForm), resetForm, window.data.messageError);
    evt.preventDefault();
  };

  var avatarLoad = noticeForm.querySelector('#avatar');
  var avatarPreview = noticeForm.querySelector('.notice__photo').querySelector('img');

  var imagePreview = noticeForm.querySelector('.form__photo-container');
  var imageLoad = imagePreview.querySelector('#images');

  var renderImage = function (reader) {
    var newImage = document.createElement('img');
    newImage.width = SIZE_IMAGE;
    newImage.height = SIZE_IMAGE;
    newImage.setAttribute('style', 'margin-top: 10px; margin-right: 5px;');
    newImage.src = reader;
    imagePreview.insertBefore(newImage, imagePreview.children[1]);
  };

  avatarLoad.addEventListener('change', function () {
    var file = avatarLoad.files[TARGET_INDEX];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  imageLoad.addEventListener('change', function () {
    var file = imageLoad.files[TARGET_INDEX];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        renderImage(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });


  onRoomNumberChange();

  timein.addEventListener('change', onSyncTimeIn);
  timeout.addEventListener('change', onSyncTimeOut);
  typeHousing.addEventListener('change', onClickHousingSync);
  roomNumber.addEventListener('change', onRoomNumberChange);

  titleAdwords.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_LENGTH_INPUT) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_LENGTH_INPUT + '-и символов');
    } else if (target.value.length > MAX_LENGTH_IPNUT) {
      target.setCustomValidity('Имя должно состоять максимум из ' + MAX_LENGTH_IPNUT + ' символов');
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
