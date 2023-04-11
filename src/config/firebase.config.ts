import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCwSSW1yvLA8yksJQ0cBrz6ZlCKIoxTONk",
    authDomain: "axium-sales.firebaseapp.com",
    projectId: "axium-sales",
    storageBucket: "axium-sales.appspot.com",
    messagingSenderId: "586162901134",
    appId: "1:586162901134:web:b175e9b9272a1c8a51b9df"
});

export const db = app.firestore();
export const storage = app.storage();
export const auth = app.auth()
export default app;
