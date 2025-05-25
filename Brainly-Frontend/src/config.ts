// Configure the backend URL based on environment
const PRODUCTION_BACKEND_URL = "https://your-backend-deployment-url.vercel.app"; // Replace with your actual backend URL
const DEVELOPMENT_BACKEND_URL = "http://localhost:3000";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URI || 
  (import.meta.env.PROD ? PRODUCTION_BACKEND_URL : DEVELOPMENT_BACKEND_URL);

// Debug logging (remove in production)
if (import.meta.env.DEV) {
  console.log("Backend URL:", BACKEND_URL);
  console.log("Environment:", import.meta.env.MODE);
}


