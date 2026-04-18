# QRly

![QRly](https://img.shields.io/badge/Status-Active-success) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-latest-purple) ![Supabase](https://img.shields.io/badge/Supabase-Storage-green)

QRly is a modern, single-page web application that allows users to securely share documents via expiring QR codes. Simply upload a file, and instantly get a scannable QR code along with a secure download link that automatically expires after **1 minute**.

## ✨ Features

- **⚡ Instant Uploads:** Drag and drop your files for immediate processing.
- **📱 Scannable QR Codes:** Automatically generates a high-quality QR code for every uploaded file.
- **⏱ Auto-Expiring Links:** For maximum security, all download links and hosted files expire and become inaccessible after 1 minute.
- **🔐 Private & Secure:** Built with Supabase Storage. No permanent data is retained.
- **🆓 Always Free:** No account, registration, or subscription required.
- **🎨 Premium UI:** Beautiful dark-themed interface with smooth micro-animations, built using Framer Motion and glassmorphism design principles.

## 🚀 Tech Stack

- **Frontend Framework:** React (via Vite)
- **Styling:** Custom CSS with Glassmorphism
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **QR Generation:** `qrcode.react`
- **Backend/Storage:** Supabase Storage

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- A Supabase account and project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/navinkarthikeyan/QRly.git
   cd QRly/Droplet
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the project root and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *Note: Ensure your Supabase storage bucket is properly configured for public uploads or signed URLs as per your requirements.*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local server address provided by Vite.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ by [@navinkarthikeyan](https://github.com/navinkarthikeyan)*
