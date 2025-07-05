# Environment Setup Guide

## Frontend Environment Variables

Create a `.env` file in `frontend/Laboratory/` with the following content:

```env
# Admin Credentials
VITE_ADMIN_USERNAME=Srilab
VITE_ADMIN_PASSWORD=Srilab

# API Configuration
VITE_API_ENVIRONMENT=production
VITE_API_BASE_URL=https://sri-lab.onrender.com

# Contact Information
VITE_LAB_MOBILE_NUMBER=9908841335
```

## Backend Environment Variables

Create a `.env` file in `backend/` with the following content:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Deployment Environment Variables

### Vercel (Frontend)
Set these environment variables in your Vercel dashboard:
- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`
- `VITE_API_ENVIRONMENT`
- `VITE_API_BASE_URL`
- `VITE_LAB_MOBILE_NUMBER`

### Render (Backend)
Set these environment variables in your Render dashboard:
- `MONGO_URI`
- `GEMINI_API_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Security Notes
- Never commit `.env` files to version control
- Use strong, unique passwords for admin credentials
- Regularly rotate API keys and secrets
- The `.env` files are already in `.gitignore` 