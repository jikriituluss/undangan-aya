document.addEventListener('DOMContentLoaded', function () {

  var GALLERY_IMAGES = [
    'images/ayim.PNG',
    'images/aya1.JPG',
    'images/galeri.PNG',
    'images/ayacount.JPG',
    'images/ayastori.JPEG',
    'images/ayagift.png',
    'images/ayulia.JPEG',
    'images/ayam.jpg',
    'images/aya2.JPEG',
    'images/ayacouple.JPEG',
    'images/bunga.JPEG',
  ];

  var grid = document.getElementById('gallery-grid');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.querySelector('.lightbox-close');
  var lightboxPrev = document.querySelector('.lightbox-prev');
  var lightboxNext = document.querySelector('.lightbox-next');
  var currentIndex = 0;

  function renderGallery() {
    if (!grid) return;
    grid.innerHTML = '';
    GALLERY_IMAGES.forEach(function (src, index) {
      var item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-aos', 'fade-up');
      item.setAttribute('data-aos-duration', '800');
      item.setAttribute('data-aos-delay', String((index % 6) * 100));

      var img = document.createElement('img');
      img.src = src;
      img.alt = 'Gallery Photo ' + (index + 1);
      img.loading = 'lazy';

      var lens = document.createElement('div');
      lens.className = 'zoom-lens';
      lens.innerHTML = '<i class="fas fa-search-plus"></i>';

      item.appendChild(img);
      item.appendChild(lens);
      item.addEventListener('click', function () {
        openLightbox(index);
      });
      grid.appendChild(item);
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    if (lightboxImg) {
      lightboxImg.src = GALLERY_IMAGES[currentIndex].replace('w=600', 'w=1200');
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    if (lightboxImg) {
      lightboxImg.src = GALLERY_IMAGES[currentIndex].replace('w=600', 'w=1200');
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    if (lightboxImg) {
      lightboxImg.src = GALLERY_IMAGES[currentIndex].replace('w=600', 'w=1200');
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  renderGallery();

});
