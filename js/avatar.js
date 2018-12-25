'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileAvatar = document.querySelector('.ad-form__field').querySelector('.ad-form-header__input');
  var loadAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');

  fileAvatar.addEventListener('change', function () {
    var file = fileAvatar.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        loadAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var adFormUpload = document.querySelector('.ad-form__upload');
  var fileImg = adFormUpload.querySelector('.ad-form__input');
  fileImg.addEventListener('change', function () {
    var file = fileImg.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        adFormUpload.insertAdjacentHTML('afterend', '<div class="ad-form__photo ad-form__photo--reset" ><img src="' +
          reader.result + '" alt="Фотографии жилья" width="70" height="70"></div>');
      });

      reader.readAsDataURL(file);
    }
    if (document.querySelector('.ad-form__photo:not(.ad-form__photo--reset)')) {
      document.querySelector('.ad-form__photo').remove();
    }
  });

  window.avatar = {
    adFormUpload: adFormUpload,
    loadPhoto: loadAvatar
  };
})();

