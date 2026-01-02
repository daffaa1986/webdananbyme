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

/*
// AI System for home
document.addEventListener('DOMContentLoaded', function () {
  const ticker = document.getElementById('home-market-ticker');
  const aiBrief = document.getElementById('home-ai-brief');

  // Hanya jalankan jika elemen ticker ada di halaman ini (Halaman Home)
  if (ticker && aiBrief) {
    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        // 1. Render Indeks Saham Singkat
        ticker.innerHTML = data.market_indices.map(item => `
          <div class="ticker-item">
            ${item.name}: <span>${item.value}</span>
            <small class="${item.trend === 'up' ? 'up' : 'down'}">
              ${item.trend === 'up' ? '▲' : '▼'} ${item.change}
            </small>
          </div>
        `).join('');

        // 2. Render AI Brief (Simulasi Analisis)
        setTimeout(() => {
          const topData = data.danantara_assets[0]; // Ambil data Keuangan sebagai sampel
          aiBrief.innerHTML = `🤖 <strong>AI Insight:</strong> Sentimen ${topData.sektor} saat ini ${topData.sentiment_score > 0.7 ? 'Sangat Optimis' : 'Stabil'}.`;
          aiBrief.classList.remove('ai-loading');
        }, 2000);
      })
      .catch(err => console.error("Gagal memuat ticker:", err));
  }
});

//informasi.html - AI System
document.addEventListener('DOMContentLoaded', function () {
  const marketGrid = document.getElementById('market-grid');
  const bankStatus = document.getElementById('bank-status');
  const energyStatus = document.getElementById('energy-status');
  const telecomStatus = document.getElementById('telecom-status');

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      // MENGISI INDEKS PASAR (IHSG, REKSADANA, DLL)
      if (marketGrid) {
        marketGrid.innerHTML = ''; // Hapus teks loading
        data.market_indices.forEach(item => {
          const isUp = item.trend === 'up';
          marketGrid.innerHTML += `
            <div class="ai-item" style="text-align:center;">
              <small>${item.name}</small>
              <div style="font-size: 1.3rem; font-weight: bold;">${item.value}</div>
              <div style="color: ${isUp ? '#10b981' : '#ef4444'}; font-weight: bold;">
                ${isUp ? '↑' : '▼'} ${item.change}
              </div>
            </div>`;
        });
      }

      // MENGISI STATUS AI SEPERTI DI GAMBAR ANDA (Simulasi Delay)
      setTimeout(() => {
        const assets = data.danantara_assets;
        
        // Sektor Keuangan
        const fin = assets.find(a => a.sektor === "Keuangan");
        bankStatus.innerHTML = `<b style="color: #10b981;">↑ Optimis</b><br><small>Skor: ${fin.sentiment_score}. ${fin.recommendation}</small>`;
        bankStatus.classList.remove('ai-loading');

        // Sektor Energi
        const nrg = assets.find(a => a.sektor === "Energi");
        energyStatus.innerHTML = `<b style="color: #f59e0b;">→ Netral</b><br><small>Skor: ${nrg.sentiment_score}. ${nrg.recommendation}</small>`;
        energyStatus.classList.remove('ai-loading');

        // Sektor Telekomunikasi
        const tel = assets.find(a => a.sektor === "Telekomunikasi");
        telecomStatus.innerHTML = `<b style="color: #10b981;">↑ Optimis</b><br><small>Skor: ${tel.sentiment_score}. ${tel.recommendation}</small>`;
        telecomStatus.classList.remove('ai-loading');
      }, 2000);
    });
});
*/


// AI System Dashboard Danantara
// AI System Dashboard Danantara
document.addEventListener('DOMContentLoaded', function () {
  // 1. Inisialisasi Elemen Dashboard
  const ticker = document.getElementById('home-market-ticker');
  const aiBrief = document.getElementById('home-ai-brief');
  const updateTime = document.getElementById('update-time'); 
  const btnExpand = document.getElementById('btn-expand-danantara');
  const expandPanel = document.getElementById('danantara-companies-expand');
  const pilarContainer = document.getElementById('pilar-sektor-container');

  // Elemen Halaman Informasi
  const marketGrid = document.getElementById('market-grid');
  const companyGrid = document.getElementById('company-grid');

  // 2. Fungsi Utama Memuat Data
  function loadDashboardData() {
    fetch('dataset.json?t=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error("Gagal memuat dataset.json");
        return res.json();
      })
      .then(data => {
        
        // === UPDATE WAKTU & TICKER UTAMA (HOME) ===
        if (updateTime && data.terakhir_update) {
          updateTime.innerText = data.terakhir_update;
        }

        if (ticker && data.saham_bumn) {
          const tigaSaham = data.saham_bumn.slice(0, 3);
          ticker.innerHTML = tigaSaham.map(item => `
            <div class="ticker-item">
              <div class="ticker-info">
                <small>${item.name}</small>
                <b>Rp ${item.price}</b>
              </div>
              <div class="ticker-status ${item.status}">
                <span style="font-size: 0.85rem;">
                  ${item.status === 'naik' ? '▲' : '▼'} ${item.change}
                </span>
              </div>
            </div>
          `).join('');
        }

        // === LOGIKA INSIGHT AI ===
        if (aiBrief && data.saham_bumn) {
          setTimeout(() => {
            const statusUtama = data.saham_bumn[0].status;
            aiBrief.innerHTML = `🤖 AI Insight: Pasar saat ini dalam fase <b>${statusUtama.toUpperCase()}</b>.`;
            aiBrief.classList.remove('ai-loading');
          }, 1500);
        }

        // === LOGIKA HALAMAN INFORMASI (MARKET GRID) ===
        if (marketGrid && data.saham_bumn) {
            marketGrid.innerHTML = data.saham_bumn.map(item => `
              <div class="ai-item" style="text-align:center; padding:10px; border:1px solid #eee; border-radius:8px;">
                <small>${item.name}</small>
                <div style="font-size: 1.2rem; font-weight: bold;">Rp ${item.price}</div>
                <div class="${item.status}" style="font-weight: bold;">
                  ${item.status === 'naik' ? '▲' : '▼'} ${item.change}
                </div>
              </div>`).join('');
        }

        // === LOGIKA DAFTAR PERUSAHAAN ===
        if (companyGrid && data.companies) {
            companyGrid.innerHTML = data.companies.map(co => `
              <div class="card" style="display:flex; align-items:center; gap:10px; padding:10px; border:1px solid #eee; border-radius:8px;">
                <span>${co.icon}</span>
                <div>
                  <strong>${co.name}</strong><br>
                  <small>${co.sector}</small>
                </div>              
              </div>`).join('');
        }

        // === LOGIKA PILAR SEKTOR (EXPAND PANEL) ===
        if (pilarContainer && data.companies) {
          // Mengelompokkan perusahaan berdasarkan pilar sektor
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
                    <span>${co.icon} ${co.name}</span>
                    <b style="color:#64748b">${co.ticker || ''}</b>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('');
        }

      })
      .catch(err => console.error("Error Dashboard:", err));
  }

  // 3. Logika Interaksi Klik Segitiga (Expand)
  if (btnExpand && expandPanel) {
    btnExpand.addEventListener('click', function() {
      const isHidden = expandPanel.style.display === 'none';
      expandPanel.style.display = isHidden ? 'block' : 'none';
      
      // Animasi Rotasi Segitiga
      this.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  }

  // 4. Jalankan Pertama Kali & Set Interval Real-Time
  loadDashboardData();
  
  // Update otomatis setiap 5 menit (300000ms) untuk data bursa valid
  setInterval(loadDashboardData, 300000); 
});