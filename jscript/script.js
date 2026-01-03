// Basic interactivity: hamburger, year update, search, simple form handlers

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger toggles all navs (works across pages)
  const hamburgerButtons = document.querySelectorAll('.hamburger');
  hamburgerButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const nav = document.querySelector('.nav-links');
      if (nav) nav.classList.toggle('show');
    });
  });

  // Update copyright years on all pages
  const yearEls = document.querySelectorAll('[id^="year"]');
  const now = new Date();
  yearEls.forEach(el => el.textContent = now.getFullYear());

  // Simple search form demo: prevent reload and show alert
  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = (form.querySelector('input[type="search"]') || {}).value || '';
      if (!q.trim()) {
        alert('Silakan masukkan kata kunci pencarian.');
        return;
      }
      // For static site demo, redirect to berita.html with query param (or show alert)
      window.location.href = `berita.html?search=${encodeURIComponent(q)}`;
    });
  });

  // Contact form — simple front-end validation + fake submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      const msgEl = document.getElementById('contactMsg');

      if (!name || !email || !message) {
        msgEl.textContent = 'Semua kolom harus diisi.';
        return;
      }
      msgEl.textContent = 'Pesan berhasil dikirim (demo). Terima kasih!';
      contactForm.reset();
    });
  }

  // Login form demo
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = loginForm.querySelector('#userEmail').value.trim();
      const pass = loginForm.querySelector('#userPass').value;
      const out = document.getElementById('loginMsg');

      if (!email || !pass) {
        out.textContent = 'Email & password wajib diisi.';
        return;
      }
      // demo: accept any credentials
      out.textContent = 'Login berhasil (demo).';
      setTimeout(() => { window.location.href = 'index.html'; }, 900);
    });
  }

  // Register form demo
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = regForm.querySelector('#regName').value.trim();
      const email = regForm.querySelector('#regEmail').value.trim();
      const pass = regForm.querySelector('#regPass').value;
      const out = document.getElementById('registerMsg');
      if (!name || !email || !pass) {
        out.textContent = 'Semua kolom wajib diisi.';
        return;
      }
      out.textContent = 'Pendaftaran berhasil (demo). Silakan login.';
      regForm.reset();
      setTimeout(() => { window.location.href = 'login.html'; }, 1000);
    });
  }
});


// AI System Dashboard Danantara
/**
 * AI System Dashboard Danantara - Full Logic
 * Mengelola interaksi UI, Sinkronisasi Bursa, dan Berita Otomatis
 */
document.addEventListener('DOMContentLoaded', function () {
    const ticker = document.getElementById('home-market-ticker');
    const updateTime = document.getElementById('update-time');
    const pilarContainer = document.getElementById('pilar-sektor-container');
    const newsContainer = document.querySelector('.news-grid');

    function loadDashboardData() {
        fetch(`dataset.json?t=${Date.now()}`) // Bypass cache
            .then(res => res.json())
            .then(data => {
                // Update Waktu
                if (updateTime) updateTime.innerText = data.terakhir_update;

                // Render Ticker
                if (ticker) {
                    ticker.innerHTML = data.saham_bumn.slice(0, 3).map(item => `
                        <div class="ticker-item">
                            <div class="ticker-info"><small>${item.name}</small><b>Rp ${item.price}</b></div>
                            <div class="ticker-status ${item.status}"><span>${item.status === 'naik' ? '▲' : '▼'} ${item.change}</span></div>
                        </div>`).join('');
                }

                // Render Sektor (26 Saham)
                if (pilarContainer) {
                    const sectors = {};
                    data.companies.forEach(co => {
                        if (!sectors[co.sector]) sectors[co.sector] = [];
                        sectors[co.sector].push(co);
                    });
                    pilarContainer.innerHTML = Object.keys(sectors).map(sektorName => `
                        <div class="sektor-group">
                            <div class="sektor-title">${sektorName}</div>
                            <div class="company-mini-grid">
                                ${sectors[sektorName].map(co => `
                                    <div class="company-tag">
                                        <div class="co-info-box"><small>${co.ticker}</small><b>Rp ${co.price}</b></div>
                                        <div class="co-status-box ${co.status}">${co.status === 'naik' ? '▲' : '▼'} ${co.change}</div>
                                    </div>`).join('')}
                            </div>
                        </div>`).join('');
                }

                // Render Berita
                if (newsContainer && data.berita) {
                    newsContainer.innerHTML = data.berita.map(n => `
                        <article class="news-item">
                            <h4>${n.judul}</h4>
                            <p><small>📅 ${n.tanggal}</small></p>
                            <p>${n.ringkasan}</p>
                            <a href="${n.link}">Baca Selengkapnya</a>
                        </article>`).join('');
                }
            });
    }

    // Hamburger & Expand Logic
    const btnExpand = document.getElementById('btn-expand-danantara');
    const expandPanel = document.getElementById('danantara-companies-expand');
    if (btnExpand) {
        btnExpand.addEventListener('click', () => {
            const isHidden = expandPanel.style.display === 'none' || expandPanel.style.display === '';
            expandPanel.style.display = isHidden ? 'block' : 'none';
            btnExpand.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }

    loadDashboardData();
    setInterval(loadDashboardData, 60000); // Polling per menit
});