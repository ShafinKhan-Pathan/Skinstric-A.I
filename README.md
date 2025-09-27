# Skinstric AI — Flow-Only

A simple, 3-phase user journey for a simulated AI skin analysis experience.  
**No API keys or endpoints are included here.**

**Live:** https://skinstric-a-i.vercel.app/

---

## User Flow

1) **Start**  
   Open the app and click **Start Analysis**.

2) **Phase 1 – Form (Name → City)**  
   Enter **Name** then **City**. Client validation blocks **Proceed** until inputs look valid.  
   On success, show a brief loading state and a **Proceed** button.

3) **Phase 2 – Image Upload (Gallery)**  
   Pick a photo from the device. The app converts it to **Base64** (Data URL) and sends it for analysis.  
   Receive **race / age / gender** scores (0–1), display **sorted** and **rounded to two decimals**.  
   Tap any item to set your **Actual** value; the sidebar updates.  
   The last preview is kept via **sessionStorage** so going back doesn’t lose it.

4) **Phase 3 – Selfie (Camera)**  
   Ask permission via the browser **MediaDevices API**. Show live video; tap **Take Photo**.  
   Capture a frame to a hidden **`<canvas>`**, convert to **Base64**, and reuse the same analysis flow.  
   When done, **stop camera tracks** for privacy/battery.

5) **Results & Navigation**  
   Clear **Back** / **Proceed** controls at each step.  
   Final screens show sorted/rounded predictions and a simple donut-style visualization.  
   Friendly loading & error messages throughout.

---
**Built with:** React (React Router, React Hook Form) · JavaScript (GSAP, Axios, MediaDevices, Canvas) · HTML · CSS (responsive)


## Run Locally
```bash
npm install
npm run dev

