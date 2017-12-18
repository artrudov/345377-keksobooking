'use strict';

(function () {

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

  window.pin.mapVisible.addEventListener('click', onClickMainPin);
})();
