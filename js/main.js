var carouselMain = document.querySelector('.carousel-image'), leftCarouselArrow = document.querySelector('.arrow-left'), rightCarouselArrow = document.querySelector('.arrow-right'), carouselThumbs = document.querySelectorAll('.thumbs img');
var nextCarouselImage = function (event) {
    var currentImageIndex = Number(carouselMain.dataset.imageIndex), nextImageIndex, newImage;
    if (event) {
        // Reset interval on click
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextCarouselImage, 20 * 1000);
    }
    if (event && event.target.classList.contains('arrow-left')) {
        // Left arrow click
        nextImageIndex = currentImageIndex == 1 ? 6 : currentImageIndex - 1;
    }
    else {
        // Right arrow click or setInterval
        nextImageIndex = currentImageIndex == 6 ? 1 : currentImageIndex + 1;
    }
    newImage = "url(\"media/carousel_" + nextImageIndex + ".jpg\")";
    carouselThumbs[currentImageIndex - 1].classList.remove('thumb-active');
    carouselThumbs[nextImageIndex - 1].classList.add('thumb-active');
    carouselMain.dataset.imageIndex = String(nextImageIndex);
    carouselMain.style.backgroundImage = newImage;
};
var carouselInterval = setInterval(nextCarouselImage, 20 * 1000);
rightCarouselArrow.addEventListener('click', nextCarouselImage, false);
leftCarouselArrow.addEventListener('click', nextCarouselImage, false);
var thumbClickListener = function (event) {
    var clickedNode = event.target, currentImageIndex = Number(carouselMain.dataset.imageIndex), nextImageIndex = Number(clickedNode.dataset.imageIndex), newImage = "url(\"media/carousel_" + nextImageIndex + ".jpg\")";
    carouselThumbs[currentImageIndex - 1].classList.remove('thumb-active');
    carouselThumbs[nextImageIndex - 1].classList.add('thumb-active');
    carouselMain.dataset.imageIndex = String(nextImageIndex);
    carouselMain.style.backgroundImage = newImage;
};
carouselThumbs.forEach(function (thumb) {
    thumb.addEventListener('click', thumbClickListener);
});
