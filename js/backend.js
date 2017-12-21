'use strict';

(function () {
  var SERVER_SEND_URL = 'https://js.dump.academy/keksobooking';
  var SERVER_LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var OK_STATUS = 200;
  var SET_TIMEOUT = 10000;

  var setupXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SET_TIMEOUT;

    return xhr;
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = setupXHR(onLoad, onError);

      xhr.open('POST', SERVER_SEND_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setupXHR(onLoad, onError);

      xhr.open('GET', SERVER_LOAD_URL);
      xhr.send();

    }
  };

})();
