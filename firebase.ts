import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXDdjMwiKlMx3Ows_4patLt2SaVIs_QD8",
  authDomain: "ask-gpt-ebf83.firebaseapp.com",
  projectId: "ask-gpt-ebf83",
  storageBucket: "ask-gpt-ebf83.appspot.com",
  messagingSenderId: "2430979510",
  appId: "1:2430979510:web:9bb9d7c4ec0ea42af9c517",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
