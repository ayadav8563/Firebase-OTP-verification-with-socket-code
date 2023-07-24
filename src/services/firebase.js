import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAju26bEwyDRvXeAa0RfR0DWynVdnDK2NU",
  authDomain: "mobutask.firebaseapp.com",
  projectId: "mobutask",
  storageBucket: "mobutask.appspot.com",
  messagingSenderId: "851142011498",
  appId: "1:851142011498:web:1d79a9f4662eca119db813"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;