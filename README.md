# Sri Clinical Laboratory Web App

A full-stack laboratory management system for clinical labs, featuring user bookings, report management, admin dashboard, and an AI-powered chatbot.

**Live:** [sri-lab.vercel.app](https://sri-lab.vercel.app)
**Repo:** [github.com/rajeshraz/SRI-LAB](https://github.com/rajeshraz/SRI-LAB)

---

## Features

- **User Panel:** Book appointments, view/download reports, chat with AI assistant.
- **Admin Panel:** Manage bookings, upload/delete reports, view statistics.
- **Chatbot:** Gemini API integration for user queries.
- **File Uploads:** Cloudinary integration for secure report storage.
- **Mobile Responsive:** Optimized for all devices.
- **PWA:** Installable on mobile with custom app icon.
- **Production Ready:** Deployed on Vercel (frontend) and Render (backend).

---

## Tech Stack

- **Frontend:** React, Vite, React Router, Chart.js, React Toastify, PWA
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, Cloudinary, Gemini API
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database), Cloudinary (file storage)

---

## Demo

- **Live App:** [sri-lab.vercel.app](https://sri-lab.vercel.app)
- **GitHub Repo:** [github.com/rajeshraz/SRI-LAB](https://github.com/rajeshraz/SRI-LAB)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account
- Cloudinary account
- Gemini API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/rajeshraz/SRI-LAB.git
cd SRI-LAB
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with:
  ```
  MONGO_URI=your_mongodb_connection_string
  GEMINI_API_KEY=your_gemini_api_key
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ```

- Start the backend:
  ```bash
  npm start
  ```

---

### 3. Frontend Setup

```bash
cd ../frontend/Laboratory
npm install
```

- Create a `.env` file in `/frontend/Laboratory` with:
  ```
  # Admin Credentials
  VITE_ADMIN_USERNAME=your_admin_username
  VITE_ADMIN_PASSWORD=your_admin_password
  
  # API Configuration
  VITE_API_ENVIRONMENT=production
  VITE_API_BASE_URL=https://sri-lab.onrender.com
  
  # Contact Information
  VITE_LAB_MOBILE_NUMBER=your_lab_mobile_number
  ```

- To run locally:
  ```bash
  npm run dev
  ```
- The app will be available at `http://localhost:5173`

---

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `GEMINI_API_KEY`: Google Gemini API key for chatbot
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Frontend (.env)
- `VITE_ADMIN_USERNAME`: Admin login username
- `VITE_ADMIN_PASSWORD`: Admin login password
- `VITE_API_ENVIRONMENT`: API environment (local/production)
- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_LAB_MOBILE_NUMBER`: Laboratory contact mobile number

**Note:** All frontend environment variables must start with `VITE_` to be accessible in the React app.

---

## Deployment

### Frontend (Vercel)

- Connect your GitHub repo to Vercel.
- Set environment variables in Vercel dashboard:
  - `VITE_ADMIN_USERNAME`
  - `VITE_ADMIN_PASSWORD`
  - `VITE_API_ENVIRONMENT`
  - `VITE_API_BASE_URL`
  - `VITE_LAB_MOBILE_NUMBER`
- Vercel auto-deploys on push to `main`/`master`.

### Backend (Render)

- Create a new Web Service on Render, connect your repo.
- Set environment variables in the Render dashboard.
- Deploy and note the backend URL.

---

## Usage

- **User:** Book appointments, chat, view/download reports.
- **Admin:** Login with credentials from environment variables, manage bookings, upload/delete reports, view dashboard.
- **Chatbot:** Ask health/lab-related questions.

---

## Troubleshooting

- **CORS errors:** Check allowed origins in backend.
- **API errors:** Check backend logs and environment variables.
- **PWA icon issues:** Ensure `maskable_icon.png` is a square PNG and referenced in `manifest.webmanifest`.
- **Admin login issues:** Verify environment variables are set correctly.

---

## Project Structure

```
SRI-LAB/
  backend/         # Node.js/Express API
  frontend/
    Laboratory/    # React (Vite) frontend
```

---

## License

MIT 