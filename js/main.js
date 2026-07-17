document.addEventListener('DOMContentLoaded', function () {

  // ============== GUEST NAME FROM URL ==============
  var params = new URLSearchParams(window.location.search);
  var guestName = params.get('to');
  var guestDisplay = document.getElementById('guest-name-display');
  if (guestDisplay && guestName) {
    guestDisplay.textContent = guestName;
  }

  // ============== LOADING SCREEN ==============
  var loadingScreen = document.getElementById('loading-screen');
  setTimeout(function () {
    loadingScreen.classList.add('hidden');
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
    });
  }, 2800);

  // ============== READING PROGRESS BAR ==============
  var progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  // ============== TOAST NOTIFICATION SYSTEM ==============
  var toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);

  window.showToast = function (message, icon) {
    icon = icon || 'fa-check-circle';
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<i class="fas ' + icon + '"></i> ' + message;
    toastContainer.appendChild(toast);
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  };

  // ============== MUSIC PLAYER ==============
  var musicBtn = document.getElementById('music-btn');
  var musicStatus = document.getElementById('music-status');

  function musicPlayHandler() {
    playMusic();
  }

  function musicToggleHandler() {
    if (MUSIC.isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  // ============== OPEN BUTTON ==============
  var openBtn = document.getElementById('open-btn');
  if (openBtn) {
    openBtn.addEventListener('click', function () {
      musicPlayHandler();
      var nextSection = document.querySelector('.section[data-index="1"]');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', musicToggleHandler);
  }

  // ============== FLOATING PARTICLES ON OPENING ==============
  function createParticles() {
    var opening = document.getElementById('opening');
    if (!opening) return;

    var symbols = ['\u2665', '\u2661', '\u2726', '\u2735'];
    for (var i = 0; i < 20; i++) {
      setTimeout(function () {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (10 + Math.random() * 12) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        particle.style.fontSize = (12 + Math.random() * 16) + 'px';

        if (Math.random() > 0.5) {
          particle.classList.add('particle--heart');
          particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        } else {
          particle.classList.add('particle--dot');
        }

        opening.insertBefore(particle, opening.querySelector('.section-content'));
      }, i * 200);
    }
  }
  createParticles();

  // ============== FLOATING NAVIGATION ==============
  var sections = document.querySelectorAll('.section');
  var navDots = document.querySelectorAll('.nav-dot');

  function updateActiveNav() {
    var currentIndex = 0;
    sections.forEach(function (section, index) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        currentIndex = index;
      }
    });

    navDots.forEach(function (dot) {
      dot.classList.remove('active');
    });

    var activeDot = document.querySelector('.nav-dot[data-section="' + currentIndex + '"]');
    if (activeDot) {
      activeDot.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  navDots.forEach(function (dot) {
    dot.addEventListener('click', function (e) {
      e.preventDefault();
      var target = dot.getAttribute('href');
      var targetSection = document.querySelector(target);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============== BACK TO TOP ==============
  var backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight * 0.5) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============== PARALLAX EFFECT ==============
  function updateParallax() {
    var scrollY = window.scrollY;
    sections.forEach(function (section) {
      var speed = 0.3;
      var offset = scrollY * speed;
      if (window.innerWidth > 768) {
        section.style.backgroundPositionY = 'calc(50% - ' + (offset - section.offsetTop * speed) + 'px)';
      }
    });
  }

  if (window.innerWidth > 768) {
    window.addEventListener('scroll', updateParallax);
  }

  // ============== BUTTON RIPPLE EFFECT ==============
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 600);
    });
  });

  // ============== TIMELINE EXPAND ==============
  document.querySelectorAll('.timeline-content').forEach(function (item) {
    item.addEventListener('click', function () {
      var detail = item.querySelector('.timeline-detail');
      if (!detail) {
        detail = document.createElement('div');
        detail.className = 'timeline-detail';
        var storyText = 'Momen spesial yang penuh dengan kebahagiaan dan doa dari orang-orang terkasih.';
        detail.innerHTML = '<p>' + storyText + '</p>';
        item.appendChild(detail);
        requestAnimationFrame(function () {
          detail.classList.add('open');
        });
      } else {
        detail.classList.toggle('open');
      }

      var icon = item.closest('.timeline-item').querySelector('.timeline-icon i');
      if (icon) {
        icon.style.transition = 'transform 0.4s ease';
        icon.style.transform = detail.classList.contains('open') ? 'scale(1.3)' : 'scale(1)';
        setTimeout(function () {
          icon.style.transform = 'scale(1)';
        }, 400);
      }
    });
  });

  // ============== GALLERY ZOOM LENS ==============
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    var lens = document.createElement('div');
    lens.className = 'zoom-lens';
    lens.innerHTML = '<i class="fas fa-search-plus"></i>';
    item.appendChild(lens);
  });

  // ============== COPY TO CLIPBOARD WITH TOAST ==============
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var accountNumber = btn.getAttribute('data-account');
      if (accountNumber) {
        navigator.clipboard.writeText(accountNumber).then(function () {
          if (window.showToast) {
            window.showToast('Nomor rekening berhasil disalin!', 'fa-copy');
          }
          var originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Tercopy!';
          btn.style.borderColor = '#4CAF50';
          btn.style.color = '#4CAF50';
          setTimeout(function () {
            btn.innerHTML = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        }).catch(function () {
          alert('Gagal menyalin. Silakan salin manual: ' + accountNumber);
        });
      }
    });
  });

  // ============== FALLING PETALS ==============
  function createPetals() {
    var container = document.getElementById('petals-container');
    if (!container) return;

    var petalCount = 35;
    for (var i = 0; i < petalCount; i++) {
      (function (idx) {
        setTimeout(function () {
          var petal = document.createElement('div');
          petal.classList.add('petal');
          petal.style.left = Math.random() * 100 + '%';
          petal.style.width = (14 + Math.random() * 14) + 'px';
          petal.style.height = (14 + Math.random() * 14) + 'px';
          petal.style.animationDuration = (6 + Math.random() * 8) + 's';
          petal.style.animationDelay = (Math.random() * 10) + 's';
          petal.style.opacity = 0.3 + Math.random() * 0.4;
          petal.style.background = ['#D4A373', '#E2C2A3', '#E8C9B0', '#F0D5C0'][Math.floor(Math.random() * 4)];
          container.appendChild(petal);
        }, idx * 250);
      })(i);
    }
  }

  createPetals();

  // ============== SMOOTH SECTION REVEAL ==============
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(function (section) {
    section.style.opacity = '1';
    revealObserver.observe(section);
  });

});
