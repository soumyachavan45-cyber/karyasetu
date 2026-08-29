# KaryaSetu 🇮🇳 (कार्यसेतु)
### India's Sovereign Cooperative Digital Workforce Marketplace & Public Rail

**KaryaSetu** is a decentralized, state-backed, cooperative-owned digital public marketplace that formalizes India's blue-collar workforce (electricians, plumbers, AC technicians, Vedic pandits, micro-dairy logistics, SHG artisans) as a fair, sovereign alternative to corporate venture-backed gig platforms.

---

## 🌟 Key Pillars & Features

1. **Transparent 92% Payout Rails**:
   - **92%** settled directly to the artisan's bank account instantly via UPI.
   - **6%** automatically allocated to the worker's **e-Shram Universal Account Number (UAN)** for accident insurance (PMSBY) and pension funds in compliance with the **Code on Social Security (2020)**.
   - **2%** allocated to local **Labour Felicitation Centre (LFC)** server and cooperative tool maintenance.
   - **Zero Surge Pricing**: Fixed wage baselines aligned with State Minimum Wage Boards.

2. **The 3-Tier Application Ecosystem**:
   - 🛒 **Consumer Marketplace**: 4-column Bento grid with core trades + expanded Indian categories (Vedic Pandits, Hourly Drivers, A2 Milk/Ghee, SHG Handicrafts, GST/Solar).
   - 📱 **Worker Mobile Web View**: Outdoor low-glare sun mode, flashing job alert with oversized `[ACCEPT]` buttons, OTP verification, celebration confetti, and Bhashini AI voice assistant in Hindi, Marathi, and English.
   - 🏢 **Cooperative Admin Hub**: Physical office dashboard for dispatching unassigned jobs, matching offline artisans, and printing official physical work cards with tear-off cash receipts.

3. **Sovereign Indian Tech Stack**:
   - **Aadhaar & NCD e-KYC**: Background and guild skill verification.
   - **ISRO Bhuvan Satellite Mapping**: Live radar with real-time green (available), yellow (busy), and moving (delivery) markers.
   - **ONDC / Beckn Gateway**: Cross-app discovery.
   - **Bhashini AI**: Voice-first speech commands for smartphone-free and non-typing artisans.
   - **SQLite Persistent Database**: Local file-based relational database (`data/sahakargig.db`) with live table inspector.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 🌐 How to Share with Friends / Evaluators

### Option 1: Instant Free Public Link (No Deploy Required)
Run this in your terminal to generate an instant live public HTTPS link:
```bash
npx localtunnel --port 3000
```
*(Or use Cloudflare Tunnel: `npx cloudflared tunnel --url http://localhost:3000`)*

### Option 2: Same Wi-Fi / Hotspot Testing (Mobile Testing)
1. Find your computer's local IP address (`ipconfig` on Windows).
2. Tell your friends on the same Wi-Fi to open: `http://<YOUR_LOCAL_IP>:3000` (e.g. `http://192.168.1.5:3000`).

### Option 3: Deploy Free to Vercel (Global Permanent URL)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of KaryaSetu platform"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Import into [Vercel](https://vercel.com) and click **Deploy**.

---

## 📂 Project Structure

```
├── data/
│   └── sahakargig.db           # Persistent SQLite database
├── src/
│   ├── app/
│   │   ├── api/                # Backend REST Route Handlers (bookings, workers, voice, etc.)
│   │   ├── layout.tsx          # Root layout & providers
│   │   ├── page.tsx            # Main router (Landing -> Login -> App Hub)
│   │   └── globals.css         # Cyberpunk Dark Mode design tokens
│   ├── components/
│   │   ├── KaryaSetuLogo.tsx   # Sanskrit modern geometric logo
│   │   ├── LandingPage.tsx     # Public grand landing page
│   │   ├── LoginPage.tsx       # Role-based auth (Citizen, Artisan, Admin)
│   │   ├── ConsumerView.tsx    # Consumer marketplace & Bento grid
│   │   ├── WorkerMobileView.tsx# Artisan mobile view with low-glare mode
│   │   ├── AdminHubView.tsx    # LFC cooperative federation dashboard
│   │   ├── LiveMapView.tsx     # Bhuvan hyper-local interactive map
│   │   ├── DatabaseModal.tsx   # SQLite live table inspector
│   │   └── ...
│   ├── context/
│   │   └── AppContext.tsx      # Global state & API sync engine
│   └── lib/
│       └── db.ts               # SQLite query engine & schema migrations
```

---
© 2026 KaryaSetu • National Labour Cooperatives Federation of India (NLCF).
