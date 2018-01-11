'use strict';

(function () {
  window.synchronizeFields = function (targetField, syncField, targetArray, syncArray, callback) {
    var numElem = targetArray.indexOf(targetField.value);
    var dependValue = syncArray[numElem];

    callback(syncField, dependValue);
  };
})();
