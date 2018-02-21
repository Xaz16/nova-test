document.addEventListener('DOMContentLoaded', function () {
  new Swiper ('#articleSlider', {
    loop: true,
    slidesPerView: 3,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      }
    }
  });

  lightbox.option({
    showImageNumberLabel: true,
    fadeDuration: 350,
    imageFadeDuration: 350,
    resizeDuration: 350,
    albumLabel: ''
  })
});