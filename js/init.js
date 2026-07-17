(function () {
  function populateWeddingData() {
    document.title = 'The Wedding - ' + WEDDING.groom.name + ' & ' + WEDDING.bride.name;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = 'Undangan Pernikahan ' + WEDDING.groom.fullName + ' & ' + WEDDING.bride.fullName;

    var nameGroom = document.querySelector('.name-groom');
    var nameBride = document.querySelector('.name-bride');
    if (nameGroom) nameGroom.textContent = WEDDING.groom.name;
    if (nameBride) nameBride.textContent = WEDDING.bride.name;

    var coupleNames = document.querySelectorAll('.couple-name-item');
    if (coupleNames.length >= 2) {
      var gFull = coupleNames[0].querySelector('.name-full');
      var gParent = coupleNames[0].querySelector('.name-parent');
      var bFull = coupleNames[1].querySelector('.name-full');
      var bParent = coupleNames[1].querySelector('.name-parent');
      if (gFull) gFull.textContent = WEDDING.groom.fullName;
      if (gParent) gParent.innerHTML = 'Putra Pertama dari ' + WEDDING.groom.father + ' &amp; ' + WEDDING.groom.mother;
      if (bFull) bFull.textContent = WEDDING.bride.fullName;
      if (bParent) bParent.innerHTML = 'Putri Kedua dari ' + WEDDING.bride.father + ' &amp; ' + WEDDING.bride.mother;
    }

    var groomSection = document.getElementById('groom');
    if (groomSection) {
      var pName = groomSection.querySelector('.person-name');
      var pParents = groomSection.querySelectorAll('.person-parent');
      var pIg = groomSection.querySelector('.person-instagram');
      if (pName) pName.textContent = WEDDING.groom.fullName;
      if (pParents.length >= 2) {
        pParents[0].textContent = WEDDING.groom.father;
        pParents[1].textContent = WEDDING.groom.mother;
      }
      if (pIg) pIg.innerHTML = '<i class="fab fa-instagram"></i> @' + WEDDING.groom.instagram;
      var igLink = groomSection.querySelector('.person-instagram');
      if (igLink && WEDDING.groom.instagram) igLink.href = 'https://instagram.com/' + WEDDING.groom.instagram;
    }

    var brideSection = document.getElementById('bride');
    if (brideSection) {
      var pName = brideSection.querySelector('.person-name');
      var pParents = brideSection.querySelectorAll('.person-parent');
      var pIg = brideSection.querySelector('.person-instagram');
      if (pName) pName.textContent = WEDDING.bride.fullName;
      if (pParents.length >= 2) {
        pParents[0].textContent = WEDDING.bride.father;
        pParents[1].textContent = WEDDING.bride.mother;
      }
      if (pIg) pIg.innerHTML = '<i class="fab fa-instagram"></i> @' + WEDDING.bride.instagram;
      var igLink = brideSection.querySelector('.person-instagram');
      if (igLink && WEDDING.bride.instagram) igLink.href = 'https://instagram.com/' + WEDDING.bride.instagram;
    }

    var giftCards = document.querySelectorAll('.gift-card');
    if (giftCards.length > 0 && WEDDING.bankAccounts) {
      WEDDING.bankAccounts.forEach(function (account, index) {
        if (giftCards[index]) {
          var hTitle = giftCards[index].querySelector('.gift-card-header h3');
          var numEl = giftCards[index].querySelector('.gift-number');
          var nameEl = giftCards[index].querySelector('.gift-name');
          var copyBtn = giftCards[index].querySelector('.copy-btn');
          if (hTitle) hTitle.textContent = account.bank;
          if (numEl) numEl.textContent = account.number;
          if (nameEl) nameEl.textContent = account.name;
          if (copyBtn) copyBtn.setAttribute('data-account', account.number);
        }
      });
    }

    var addressCard = document.querySelector('.gift-address-card p');
    if (addressCard && WEDDING.giftAddress) addressCard.textContent = WEDDING.giftAddress;

    var guestDisplay = document.querySelector('.guest-name');
    if (guestDisplay && WEDDING.guestName) {
      var params = new URLSearchParams(window.location.search);
      var guestParam = params.get('to');
      guestDisplay.textContent = guestParam || WEDDING.guestName;
    }

    var thankyouGroom = document.querySelector('.thankyou-groom');
    var thankyouBride = document.querySelector('.thankyou-bride');
    if (thankyouGroom) thankyouGroom.textContent = WEDDING.groom.fullName;
    if (thankyouBride) thankyouBride.textContent = WEDDING.bride.fullName;

    var timeline = document.getElementById('timeline');
    if (timeline && WEDDING.loveStory) {
      WEDDING.loveStory.forEach(function (item, index) {
        var tlItem = document.createElement('div');
        tlItem.className = 'timeline-item';
        tlItem.setAttribute('data-aos', 'fade-up');
        tlItem.setAttribute('data-aos-duration', '1000');
        if (index > 0) tlItem.setAttribute('data-aos-delay', String(index * 200));

        var icon = document.createElement('div');
        icon.className = 'timeline-icon';
        icon.innerHTML = '<i class="fas fa-heart"></i>';

        var content = document.createElement('div');
        content.className = 'timeline-content';

        var h3 = document.createElement('h3');
        h3.textContent = item.title;

        var span = document.createElement('span');
        span.className = 'timeline-date';
        span.textContent = item.date;

        var p = document.createElement('p');
        p.textContent = item.description;

        content.appendChild(h3);
        content.appendChild(span);
        content.appendChild(p);
        tlItem.appendChild(icon);
        tlItem.appendChild(content);
        timeline.appendChild(tlItem);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populateWeddingData);
  } else {
    populateWeddingData();
  }
})();
