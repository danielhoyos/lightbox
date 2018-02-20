'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var container = document.getElementById('gallery-container');
var getThumbs = [].concat(_toConsumableArray(container.querySelectorAll('.gallery-img')));
var getImages = getThumbs.map(function (image) {
    return image.src.replace('-thumb', '');
});
var getDescriptions = [].concat(_toConsumableArray(container.querySelectorAll('.gallery-img'))).map(function (e) {
    return e.alt;
});

var openImageSlider = function openImageSlider(indice) {
    var slider = document.createElement('div');
    slider.innerHTML = '<div class="container-image-slider" id="container-image-slider">\n                            <figure>\n                                <div class="close-modal">x</div>\n                                <img class="image-slider" src="' + getImages[indice] + '" alt="' + getDescriptions[indice] + '">\n                                <button class="btn-prev btn-slider">\u25C4</button>\n                                <button class="btn-next btn-slider">\u25BA</button>\n                                <figcaption>\n                                    <p>Im\xE1gen <span id=\'counter\'>' + (indice + 1) + '</span> de ' + getImages.length + '</p>\n                                    <small>' + getDescriptions[indice] + '</small>\n                                </figcaption>\n                            </figure>\n                        </div>';
    document.body.appendChild(slider);

    // Close Modal
    closeModal(slider);
    navigationSlider(slider, indice);
};

var closeModal = function closeModal(modalElement) {
    var btnModal = modalElement.querySelector('.close-modal');
    btnModal.addEventListener('click', function () {
        document.body.removeChild(modalElement);
    });
};

var slider = function slider() {
    container.addEventListener('click', function (e) {
        var element = e.target;
        var indice = getThumbs.indexOf(element);

        if (element.tagName === 'IMG') {
            openImageSlider(indice);
        }
    });
};

var navigationSlider = function navigationSlider(modalElement, indice) {
    var btnModal = modalElement.querySelector('.close-modal');
    var btnPrev = modalElement.querySelector('.btn-prev');
    var btnNext = modalElement.querySelector('.btn-next');
    var imageSlider = modalElement.querySelector('img');
    var description = modalElement.querySelector('small');
    var counter = modalElement.querySelector('#counter');

    modalElement.addEventListener('click', function (e) {
        var element = e.target;

        if (element === btnPrev) {
            indice = indice <= 0 ? getImages.length - 1 : indice - 1;
        }

        if (element === btnNext) {
            indice = indice >= getImages.length - 1 ? 0 : indice + 1;
        }

        imageSlider.src = getImages[indice];
        imageSlider.alt = getDescriptions[indice];
        description.textContent = getDescriptions[indice];
        counter.textContent = indice + 1;
    });

    window.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowLeft') btnPrev.click();
        if (e.key === 'ArrowRight') btnNext.click();
        if (e.key === 'Escape') btnModal.click();
    });
};

slider();