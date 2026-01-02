import yfinance as yf
import json
import os
# Tambahkan timezone di sini
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
            s = yf.Ticker(tkr)
            df = s.history(period="2d")
            if len(df) >= 2:
                price = df['Close'].iloc[-1]
                change = ((price - df['Close'].iloc[-2]) / df['Close'].iloc[-2]) * 100
                
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

    # === BAGIAN YANG DIUBAH (Poin 3) ===
    # Menggunakan datetime.now(timezone.utc) untuk menghilangkan DeprecationWarning
    waktu_utc = datetime.now(timezone.utc)
    waktu_wib = waktu_utc + timedelta(hours=7)
    waktu_teks = waktu_wib.strftime("%d %b %Y, %H:%M WIB")

    # 4. Simpan ke dataset.json
    data_final = {
        "terakhir_update": waktu_teks,
        "saham_bumn": saham_bumn,
        "companies": companies
    }

    file_name = 'dataset.json'
    with open(file_name, 'w') as f:
        json.dump(data_final, f, indent=4)
    
    print(f"Berhasil update: {waktu_teks}")

if __name__ == "__main__":
    ambil_data_danantara()