document.addEventListener('DOMContentLoaded', function () {
  new Swiper('#articleSlider', {
    loop: true,
    slidesPerView: 3,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });

  lightbox.option({
    showImageNumberLabel: true,
    fadeDuration: 350,
    imageFadeDuration: 350,
    resizeDuration: 350,
    albumLabel: ''
  });

  var $heading = document.getElementById('animateBigHeading');
  var $headings = document.getElementsByClassName('page-header__info');
  var bounceEaseOut = convertToEaseOut(bounce);
  var counter = 0;

  animate({
    duration: 2000,
    timing: bounceEaseOut,
    draw: function (progress) {
      $heading.style.left = ((progress * 1000) - 1000) + 'px';
    }
  });

  var delayInterval = setInterval(function () {
    if(counter === 3) {
      clearInterval(delayInterval);
      return;
    }
    animate({
      duration: 1000,
      timing: bounceEaseOut,
      draw: function (progress) {
        if($headings[counter]) {
          $headings[counter].style.left = ((progress * 400) - 400) + 'px';
        }
        if(progress === 1) {
          counter++;
        }
      }
    });
  }, 1000)
});

function bounce(timeFraction) {
  for (var a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
    }
  }
}

function convertToEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

function animate(options) {
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;
    var progress = options.timing(timeFraction);
    options.draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}