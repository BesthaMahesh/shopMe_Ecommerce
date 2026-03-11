import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBo0VoOjCL_Xhap1wtmPhOUW6heZGsF7A4",
    authDomain: "ecommerce-811ec.firebaseapp.com",
    projectId: "ecommerce-811ec",
    storageBucket: "ecommerce-811ec.firebasestorage.app",
    messagingSenderId: "819281951526",
    appId: "1:819281951526:web:b8fc200669d262afe41fe7",
    measurementId: "G-4W67C7PGWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
