import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiMPZHm-kLiGDtG_TMEo1okn4z1Nwes18",
  authDomain: "duelist-d2beb.firebaseapp.com",
  projectId: "duelist-d2beb",
  storageBucket: "duelist-d2beb.appspot.com",
  messagingSenderId: "932814771167",
  appId: "1:932814771167:web:605780efbbe47eab812a6a",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
