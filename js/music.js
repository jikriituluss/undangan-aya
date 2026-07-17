var MUSIC = {
  audio: null,
  isPlaying: false,
  ready: false,
  pendingPlay: false,
  startOffset: 0
};

document.addEventListener('DOMContentLoaded', function () {
  MUSIC.audio = document.getElementById('wedding-music');
  if (!MUSIC.audio) return;

  var source = MUSIC.audio.querySelector('source');

  function getMusicUrl() {
    if (WEDDING.music && WEDDING.music.file) {
      return WEDDING.music.file;
    }
    if (WEDDING.musicUrl) {
      return WEDDING.musicUrl;
    }
    return 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  }

  source.src = getMusicUrl();
  MUSIC.audio.load();

  MUSIC.audio.addEventListener('loadedmetadata', function () {
    MUSIC.audio.currentTime = MUSIC.startOffset;
  });

  MUSIC.audio.addEventListener('canplaythrough', function () {
    MUSIC.ready = true;
    if (MUSIC.pendingPlay) {
      MUSIC.audio.currentTime = MUSIC.startOffset;
      MUSIC.audio.play().then(function () {
        MUSIC.isPlaying = true;
        MUSIC.pendingPlay = false;
        document.getElementById('music-btn').classList.add('playing');
        var st = document.getElementById('music-status');
        if (st) st.textContent = 'Now Playing';
      }).catch(function () {});
    }
  });

  MUSIC.audio.addEventListener('error', function () {
    console.log('Music load failed, trying fallback...');
    source.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    MUSIC.audio.load();
  });
});

function playMusic() {
  if (!MUSIC.audio) return;
  if (MUSIC.isPlaying) return;

  if (MUSIC.ready) {
    MUSIC.audio.currentTime = MUSIC.startOffset;
    MUSIC.audio.play().then(function () {
      MUSIC.isPlaying = true;
      document.getElementById('music-btn').classList.add('playing');
      var st = document.getElementById('music-status');
      if (st) st.textContent = 'Now Playing';
    }).catch(function (e) {
      console.log('Play failed:', e);
    });
  } else {
    MUSIC.pendingPlay = true;
    MUSIC.audio.load();
  }
}

function pauseMusic() {
  if (!MUSIC.audio) return;
  MUSIC.audio.pause();
  MUSIC.isPlaying = false;
  MUSIC.pendingPlay = false;
  document.getElementById('music-btn').classList.remove('playing');
  var st = document.getElementById('music-status');
  if (st) st.textContent = 'Putar Musik';
}
