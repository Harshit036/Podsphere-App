import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXu90_vCu7IergKIJtunTSzkXeL3HZTfM",
  authDomain: "fliprai.firebaseapp.com",
  projectId: "fliprai",
  storageBucket: "fliprai.appspot.com",
  messagingSenderId: "559044661840",
  appId: "1:559044661840:web:daecf457a35e8ca91cf755",
  measurementId: "G-99HVY4JQYN",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export default storage;
