Here you go — **full README in one clean copy block** 👇

````md
# QRly

![QRly](https://img.shields.io/badge/Status-Active-success) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-latest-purple) ![Supabase](https://img.shields.io/badge/Supabase-Storage-green)

QRly is a modern, single-page web application that allows users to securely share documents via expiring QR codes. Simply upload a file, and instantly get a scannable QR code along with a secure download link that automatically expires after **1 minute**.

---

## ✨ Features

- ⚡ Instant Uploads: Drag and drop your files for immediate processing  
- 📱 Scannable QR Codes: Automatically generates a high-quality QR code  
- ⏱ Auto-Expiring Links: Links expire after 1 minute  
- 🔐 Private & Secure: Built with Supabase Storage  
- 🆓 No Login Required: Completely frictionless usage  
- 🎨 Premium UI: Dark-themed interface with smooth animations  

---

## 🚀 Tech Stack

- Frontend: React (Vite + TypeScript)
- Styling: Tailwind / Custom CSS (Glassmorphism)
- Animations: Framer Motion
- Icons: Lucide React
- QR Generation: `qrcode.react`
- Backend/Storage: Supabase Storage

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account

---

### Installation

1. Clone the repository:
```bash
git clone https://github.com/navinkarthikeyan/QRly.git
cd QRly
````

2. Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_publishable_key
```

> ⚠️ Never commit `.env` to Git

---

## 📦 Supabase Setup (IMPORTANT)

### 1. Create Storage Bucket

* Go to Supabase Dashboard → Storage
* Click **Create Bucket**
* Name: `documents`
* Public bucket: ❌ OFF (keep private)

---

### 2. Configure Storage Policies

Go to:
**Storage → Policies → documents bucket → New Policy**

---

### Policy 1: Allow Public Upload (INSERT)

* Operation: `INSERT`
* Target role: `public`

```sql
true
```

---

### Policy 2: Allow Public Read (SELECT)

* Operation: `SELECT`
* Target role: `public`

```sql
true
```

---

### ⚠️ Why this is needed

* `INSERT` → allows file upload from frontend
* `SELECT` → required to generate signed URLs
* Bucket remains private → files are accessed only via signed URLs

---

### ⚠️ Security Note

This setup is for **MVP/demo only**.

In production, you should:

* restrict file types and size
* add rate limiting
* use backend validation
* optionally add authentication

---

## 🧠 How it Works

1. User uploads file
2. File stored in Supabase Storage
3. Signed URL generated (expires in 1 minute)
4. QR code generated from URL
5. User scans QR → downloads file

---

## 🚀 Run the App

```bash
npm run dev
```

---

## 🌐 Deployment

Deploy easily on:

* Vercel (recommended)
* Netlify

Make sure to add environment variables in deployment settings.

---

## ⚠️ Limitations

* Files are not auto-deleted yet (only link expires)
* Public upload access (no auth)
* No rate limiting

---

## 🔮 Future Improvements

* Auto-delete expired files
* Password-protected QR links
* Download analytics
* File size restrictions
* User accounts (optional)

---

## 📸 Use Cases

* Temporary file sharing
* QR-based document transfer
* Events & offline sharing
* Quick device-to-device file transfer

---

## 🤝 Contributing

Feel free to fork and improve the project!

---

## 📝 License

MIT License

---

## 💡 Author

Built with ❤️ by [@navinkarthikeyan](https://github.com/navinkarthikeyan)

```

---

You can copy this directly into `README.md` ✅

If you want next:
👉 I can add **AdSense monetization section + SEO keywords** to help you actually get traffic 🚀
```
