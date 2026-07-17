document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('rsvp-form');
  var messagesList = document.getElementById('messages-list');
  var paginationContainer = document.getElementById('messages-pagination');

  var PER_PAGE = 5;
  var currentPage = 1;
  var allMessages = [];

  function getAvatar(name) {
    if (!name) return '?';
    var parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  function loadMessages() {
    db.collection('messages')
      .orderBy('date', 'desc')
      .get()
      .then(function (snapshot) {
        allMessages = [];
        snapshot.forEach(function (doc) {
          allMessages.push(doc.data());
        });
        renderMessages();
      })
      .catch(function (err) {
        console.log('Firestore load error:', err);
      });
  }

  function renderMessages() {
    if (!messagesList) return;

    var totalPages = Math.ceil(allMessages.length / PER_PAGE) || 1;

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    var start = (currentPage - 1) * PER_PAGE;
    var end = start + PER_PAGE;
    var pageMessages = allMessages.slice(start, end);

    messagesList.innerHTML = '';

    if (pageMessages.length === 0) {
      messagesList.innerHTML = '<p style="text-align:center;color:rgba(248,245,240,0.4);padding:40px;font-family:Poppins,sans-serif;font-size:0.9rem;">Belum ada ucapan. Jadilah yang pertama!</p>';
    } else {
      pageMessages.forEach(function (msg) {
        var card = document.createElement('div');
        card.className = 'message-card';

        var avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = getAvatar(msg.name);

        var body = document.createElement('div');
        body.className = 'message-body';

        var nameEl = document.createElement('p');
        nameEl.className = 'message-name';
        nameEl.textContent = msg.name;

        var attendanceEl = document.createElement('p');
        attendanceEl.className = 'message-attendance';
        var icon = msg.attendance === 'Hadir' ? 'fa-check-circle' : (msg.attendance === 'Tidak Hadir' ? 'fa-times-circle' : 'fa-question-circle');
        attendanceEl.innerHTML = '<i class="fas ' + icon + '"></i> ' + msg.attendance;

        body.appendChild(nameEl);
        body.appendChild(attendanceEl);

        if (msg.message) {
          var textEl = document.createElement('p');
          textEl.className = 'message-text';
          textEl.textContent = msg.message;
          body.appendChild(textEl);
        }

        var dateEl = document.createElement('p');
        dateEl.className = 'message-date';
        if (msg.date) {
          var d = msg.date.toDate ? msg.date.toDate() : new Date(msg.date);
          dateEl.textContent = d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        body.appendChild(dateEl);

        card.appendChild(avatar);
        card.appendChild(body);
        messagesList.appendChild(card);
      });
    }

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    for (var i = 1; i <= totalPages; i++) {
      var btn = document.createElement('button');
      btn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
      btn.textContent = i;
      btn.addEventListener('click', function (page) {
        return function () {
          currentPage = page;
          renderMessages();
          var list = document.getElementById('messages-list');
          if (list) {
            list.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };
      }(i));
      paginationContainer.appendChild(btn);
    }
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('form-name');
      var attendanceInput = document.getElementById('form-attendance');
      var messageInput = document.getElementById('form-message');

      var data = {
        name: nameInput ? nameInput.value.trim() : '',
        attendance: attendanceInput ? attendanceInput.value : '',
        message: messageInput ? messageInput.value.trim() : ''
      };

      if (!data.name) {
        if (window.showToast) {
          window.showToast('Silakan masukkan nama Anda', 'fa-exclamation-circle');
        }
        if (nameInput) nameInput.focus();
        return;
      }

      if (!data.attendance) {
        if (window.showToast) {
          window.showToast('Silakan pilih konfirmasi kehadiran', 'fa-exclamation-circle');
        }
        if (attendanceInput) attendanceInput.focus();
        return;
      }

      db.collection('messages').add({
        name: data.name,
        attendance: data.attendance,
        message: data.message || '',
        date: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function () {
        if (nameInput) nameInput.value = '';
        if (attendanceInput) attendanceInput.value = '';
        if (messageInput) messageInput.value = '';

        currentPage = 1;
        loadMessages();

        if (window.showToast) {
          window.showToast('Terima kasih ' + data.name + '! Ucapan berhasil dikirim.', 'fa-paper-plane');
        }

        if (WEDDING.formspreeEndpoint && WEDDING.formspreeEndpoint !== 'https://formspree.io/f/your-form-id') {
          var formData = new FormData();
          formData.append('name', data.name);
          formData.append('attendance', data.attendance);
          formData.append('message', data.message);
          fetch(WEDDING.formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          }).then(function (res) {
            if (res.ok) console.log('Sent to Formspree');
          }).catch(function (err) {
            console.log('Formspree error:', err);
          });
        }
      }).catch(function (err) {
        console.log('Firestore add error:', err);
        if (window.showToast) {
          window.showToast('Gagal mengirim ucapan. Coba lagi.', 'fa-exclamation-circle');
        }
      });
    });
  }

  loadMessages();
});
