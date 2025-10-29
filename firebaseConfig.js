import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC99bII8kfJWxhjE076Y85GFMyDw1yjS7U",
  authDomain: "moiseswater-e1182.firebaseapp.com",
  databaseURL: "https://moiseswater-e1182-default-rtdb.firebaseio.com",
  projectId: "moiseswater-e1182",
  storageBucket: "moiseswater-e1182.firebasestorage.app",
  messagingSenderId: "1046338105933",
  appId: "1:1046338105933:web:c30131223f698b0ddfa204",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
