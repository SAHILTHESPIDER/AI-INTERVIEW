import {GoogleAuthProvider, getAuth} from 'firebase/auth';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewai-ea581.firebaseapp.com",
  projectId: "interviewai-ea581",
  storageBucket: "interviewai-ea581.firebasestorage.app",
  messagingSenderId: "379916522304",
  appId: "1:379916522304:web:9826ba86b0c8ad8d0220a5"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}