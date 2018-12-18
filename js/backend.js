'use strict';
(function () {
  var TIME_OUT = 10000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var createRequest = function (request, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT;
    xhr.open(request, url);
    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createRequest('GET', URL_LOAD);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createRequest('POST', URL_LOAD);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIME_OUT;

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    upload: upload
  };
})();
