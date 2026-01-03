import yfinance as yf
import json
from datetime import datetime, timedelta, timezone 

def ambil_data_danantara():
    emiten_map = {
        "BBRI.JK": "Sektor Perbankan", "BMRI.JK": "Sektor Perbankan", 
        "BBNI.JK": "Sektor Perbankan", "BBTN.JK": "Sektor Perbankan",
        "TLKM.JK": "Energi & Pertambangan", "ANTM.JK": "Energi & Pertambangan",
        "PTBA.JK": "Energi & Pertambangan", "TINS.JK": "Energi & Pertambangan",
        "PGEO.JK": "Energi & Pertambangan", "ELSA.JK": "Energi & Pertambangan",
        "ADHI.JK": "Konstruksi & Infrastruktur", "PTPP.JK": "Konstruksi & Infrastruktur",
        "WIKA.JK": "Konstruksi & Infrastruktur", "WSKT.JK": "Konstruksi & Infrastruktur",
        "JSMR.JK": "Konstruksi & Infrastruktur", "SMGR.JK": "Konstruksi & Infrastruktur",
        "SMBR.JK": "Konstruksi & Infrastruktur",
        "GIAA.JK": "Transportasi & Logistik", "IPCC.JK": "Transportasi & Logistik",
        "IPTV.JK": "Transportasi & Logistik",
        "KAEF.JK": "Kesehatan & Konsumsi", "INAF.JK": "Kesehatan & Konsumsi",
        "BRMS.JK": "Saham Afiliasi", "PPRO.JK": "Saham Afiliasi",
        "WEGE.JK": "Saham Afiliasi", "WTON.JK": "Saham Afiliasi"
    }
    
    companies = []
    saham_bumn_utama = [] 
    
    for tkr, skt in emiten_map.items():
        try:
            s = yf.Ticker(tkr)
            df = s.history(period="7d") # Menjaga data tetap ada saat weekend
            if not df.empty:
                price = df['Close'].iloc[-1]
                change = 0.0
                if len(df) >= 2:
                    prev_price = df['Close'].iloc[-2]
                    change = ((price - prev_price) / prev_price) * 100
                
                info = {
                    "name": tkr.split('.')[0],
                    "ticker": tkr.split('.')[0],
                    "price": f"{price:,.0f}".replace(",", "."), 
                    "change": f"{change:+.2f}%",
                    "status": "naik" if change >= 0 else "turun",
                    "sector": skt,
                    "icon": "🏢"
                }
                companies.append(info)
                if tkr in ["BMRI.JK", "BBRI.JK", "BBNI.JK"]:
                    saham_bumn_utama.append(info)
        except Exception as e:
            print(f"Error pada {tkr}: {e}")

    if not saham_bumn_utama and len(companies) >= 3:
        saham_bumn_utama = companies[:3]
    
    # Waktu Update WIB
    waktu_now = datetime.now(timezone.utc) + timedelta(hours=7)
    waktu_str = waktu_now.strftime("%d %b %Y, %H:%M WIB")

    # Berita Otomatis
    berita_list = [
        {
            "judul": "Intelligence Nusantara: Laporan Portofolio",
            "tanggal": waktu_str,
            "ringkasan": f"Sistem memantau {len(companies)} aset strategis secara intensif dengan data real-time.",
            "link": "berita.html"
        }
    ]

    data_final = {
        "terakhir_update": waktu_str,
        "saham_bumn": saham_bumn_utama,
        "companies": companies,
        "berita": berita_list
    }

    with open('dataset.json', 'w', encoding='utf-8') as f:
        json.dump(data_final, f, indent=4, ensure_ascii=False)
    print(f"Sukses update bursa & berita: {waktu_str}")

if __name__ == "__main__":
    ambil_data_danantara()