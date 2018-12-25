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

  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var fileImg = adFormPhotoContainer.querySelector('.ad-form__input');

  fileImg.addEventListener('change', function () {
    var file = fileImg.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        adFormPhotoContainer.insertAdjacentHTML('beforeend', '<div class="ad-form__photo" ><img src="'
        + reader.result + '" alt="Фотографии жилья" width="70" height="70"></div>');
      });
      reader.readAsDataURL(file);
    }
  });
})();
