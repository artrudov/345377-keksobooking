'use strict';

(function () {
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var noticeForm = document.querySelector('.notice__form');
  var titleAdwords = noticeForm.querySelector('#title');
  // var timein = noticeForm.querySelector('#timein');
  // var timeout = noticeForm.querySelector('#timeout');
  // var typeHousing = noticeForm.querySelector('#type');
  // var price = noticeForm.querySelector('#price');
  // var roomNumber = noticeForm.querySelector('#room_number');
  // var capacityRoom = noticeForm.querySelector('#capacity');
  var addressHouse = noticeForm.querySelector('#address');

  // var onClickSelectSync = function (eventTarget, target) {
  //   var index = eventTarget.selectedIndex;
  //   target.selectedIndex = index;
  // };

  // var onClickHousingSync = function () {
  //   var index = typeHousing.selectedIndex;
  //   price.setAttribute('min', window.data.typesArray[index].price);
  //   price.setAttribute('placeholder', window.data.typesArray[index].price);
  // };

  // function roomNumberChangeHandler() {
  //   if (capacityRoom.options.length > 0) {
  //     [].forEach.call(capacityRoom.options, function (item) {
  //       item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
  //       item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
  //     });
  //   }
  // }

  // roomNumberChangeHandler();

  // timein.addEventListener('change', function () {
  //   onClickSelectSync(timein, timeout);
  // });
  //
  // timeout.addEventListener('change', function () {
  //   onClickSelectSync(timeout, timein);
  // });

  // typeHousing.addEventListener('change', onClickHousingSync);
  //
  // roomNumber.addEventListener('change', roomNumberChangeHandler);

  titleAdwords.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Имя должно состоять минимум из 30-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  window.form = {
    address: addressHouse,
    noticeForm: noticeForm
  };
})();
