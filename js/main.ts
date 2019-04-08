let carouselMain: HTMLDivElement = document.querySelector('.carousel-image'),
    leftCarouselArrow = document.querySelector('.arrow-left'),
    rightCarouselArrow = document.querySelector('.arrow-right'),
    carouselThumbs = document.querySelectorAll('.thumbs img');

const nextCarouselImage = (event?: MouseEvent) => {
  let currentImageIndex = Number(carouselMain.dataset.imageIndex),
      nextImageIndex: number, newImage: string;

  if (event) {
    // Reset interval on click
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextCarouselImage, 20 * 1000);
  }

  if (event && (<HTMLDivElement>event.target).classList.contains('arrow-left')) {
    // Left arrow click
    nextImageIndex = currentImageIndex == 1 ? 6 : currentImageIndex - 1;
  } else {
    // Right arrow click or setInterval
    nextImageIndex = currentImageIndex == 6 ? 1 : currentImageIndex + 1;
  }

  newImage = `url("media/carousel_${nextImageIndex}.jpg")`;

  carouselThumbs[currentImageIndex - 1].classList.remove('thumb-active');
  carouselThumbs[nextImageIndex - 1].classList.add('thumb-active');

  carouselMain.dataset.imageIndex = String(nextImageIndex);
  carouselMain.style.backgroundImage = newImage;
};

let carouselInterval = setInterval(nextCarouselImage, 20 * 1000);

rightCarouselArrow.addEventListener('click', nextCarouselImage, false);
leftCarouselArrow.addEventListener('click', nextCarouselImage, false);

const thumbClickListener = (event: MouseEvent) => {
  let clickedNode: HTMLImageElement = <HTMLImageElement>event.target,
      currentImageIndex = Number(carouselMain.dataset.imageIndex),
      nextImageIndex = Number(clickedNode.dataset.imageIndex),
      newImage = `url("media/carousel_${nextImageIndex}.jpg")`;

  carouselThumbs[currentImageIndex - 1].classList.remove('thumb-active');
  carouselThumbs[nextImageIndex - 1].classList.add('thumb-active');

  carouselMain.dataset.imageIndex = String(nextImageIndex);
  carouselMain.style.backgroundImage = newImage;
};

carouselThumbs.forEach(thumb => {
  thumb.addEventListener('click', thumbClickListener);
});