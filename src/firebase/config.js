const {
  VITE_FB_API_KEY,
  VITE_FB_AUTHDOMAIN,
  VITE_FB_PROJECT_ID,
  VITE_FB_STORAGE_BUCKET,
  VITE_FB_MESSAGINGSENDERID,
  VITE_FB_APP_ID,
  VITE_FB_MEASUREMENT_ID,
} = import.meta.env;

export const firebaseConfig = {
  apiKey: VITE_FB_API_KEY,
  authDomain: VITE_FB_AUTHDOMAIN,
  projectId: VITE_FB_PROJECT_ID,
  storageBucket: VITE_FB_STORAGE_BUCKET,
  messagingSenderId: VITE_FB_MESSAGINGSENDERID,
  appId: VITE_FB_APP_ID,
  measurementId: VITE_FB_MEASUREMENT_ID
};