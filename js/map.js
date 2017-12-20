'use strict';

(function () {

  var HEIGHT_PIN = 22;

  var renderFragment = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var k = 0; k < ads.length; k++) {
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

      address.value = 'x:' + (dialogHandle.offsetLeft - shift.x) + ' y:' + (dialogHandle.offsetTop - shift.y);

      if (dialogHandle.offsetTop - shift.y > 500) {
        dialogHandle.style.top = '500px';
        address.value = 'x: ' + (dialogHandle.offsetLeft - shift.x) + ' y: 500px';
      }

      if (dialogHandle.offsetTop - shift.y < 100) {
        dialogHandle.style.top = '100px';
        address.value = 'x: ' + (dialogHandle.offsetLeft - shift.x) + ' y: 100px';
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
})();
