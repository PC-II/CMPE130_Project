import { initializeApp } from "firebase/app";
import { initializeAuth, signInAnonymously } from "firebase/auth";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

export const firebaseConfig = {
  apiKey: "AIzaSyAHn0KAKhSlB8QAxJ_RD4CCHmn5QT5aT78",
  authDomain: "cmpe130-ai.firebaseapp.com",
  projectId: "cmpe130-ai",
  storageBucket: "cmpe130-ai.firebasestorage.app",
  messagingSenderId: "1098177176456",
  appId: "1:1098177176456:web:fc31def87441602360103d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const vertexAI = getVertexAI(app);
export const model = getGenerativeModel(vertexAI, {model: "gemini-1.5-pro"});
export const auth = initializeAuth(app);

// not sure if were going to use this yet - to track user history
try
{
  var userSignIn = (await signInAnonymously(auth)).user;
}
catch(err)
{
  const errorCode = err.code;
  const errorMessage = err.message;
  console.error(`[${errorCode}] ${errorMessage}`);
}
export const user = userSignIn;