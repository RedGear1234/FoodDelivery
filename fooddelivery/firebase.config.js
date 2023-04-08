import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfnFYqP-dPsm2IUDBdr-6ZoLugM7E9PEM",
  authDomain: "fooddelivery-fc713.firebaseapp.com",
  databaseURL: "https://fooddelivery-fc713-default-rtdb.firebaseio.com",
  projectId: "fooddelivery-fc713",
  storageBucket: "fooddelivery-fc713.appspot.com",
  messagingSenderId: "1052691294328",
  appId: "1:1052691294328:web:f0cc640cccb9a379c2a58d",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage, };


