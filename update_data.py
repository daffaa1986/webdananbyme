import yfinance as yf
import json
import os
from datetime import datetime, timedelta, timezone 

def ambil_data_danantara():
    # 1. Daftar emiten pilar Danantara
    emiten_map = {
        "BMRI.JK": "Perbankan", 
        "BBRI.JK": "Perbankan", 
        "BBNI.JK": "Perbankan",
        "TLKM.JK": "Telekomunikasi", 
        "PGAS.JK": "Energi", 
        "ANTM.JK": "Mineral & Tambang",
        "PTBA.JK": "Mineral & Tambang", 
        "SMGR.JK": "Infrastruktur & Logistik"
    }
    
    saham_bumn = []
    companies = []
    
    # 2. Ambil data dari Yahoo Finance
    for tkr, skt in emiten_map.items():
        try:
            # Menggunakan period 5d agar saat weekend tetap dapat data harga terakhir
            s = yf.Ticker(tkr)
            df = s.history(period="5d") 
            if not df.empty and len(df) >= 2:
                price = df['Close'].iloc[-1]
                prev_price = df['Close'].iloc[-2]
                change = ((price - prev_price) / prev_price) * 100
                
                info = {
                    "name": tkr.split('.')[0],
                    "ticker": tkr.split('.')[0],
                    "price": f"{price:,.0f}",
                    "change": f"{change:+.2f}%",
                    "status": "naik" if change > 0 else "turun",
                    "sector": skt,
                    "icon": "🏢"
                }
                companies.append(info)
                if tkr in ["BMRI.JK", "TLKM.JK", "BBRI.JK"]:
                    saham_bumn.append(info)
        except Exception as e: 
            print(f"Gagal mengambil {tkr}: {e}")

    # 3. Pengaturan Waktu WIB
    waktu_utc = datetime.now(timezone.utc)
    waktu_wib = waktu_utc + timedelta(hours=7)
    waktu_teks = waktu_wib.strftime("%d %b %Y, %H:%M WIB")

    # 4. PROSES SIMPAN (DENGAN PENGAMAN)
    file_name = 'dataset.json'
    
    # HANYA update file jika data berhasil ditarik (tidak kosong)
    if len(companies) > 0:
        data_final = {
            "terakhir_update": waktu_teks,
            "saham_bumn": saham_bumn,
            "companies": companies
        }
        with open(file_name, 'w') as f:
            json.dump(data_final, f, indent=4)
        print(f"Berhasil update: {waktu_teks}")
    else:
        # Jika bursa tutup atau error, jangan timpa file lama dengan data kosong
        print("Peringatan: Data dari bursa kosong. File dataset.json tidak diperbarui untuk menjaga data lama.")

if __name__ == "__main__":
    ambil_data_danantara()