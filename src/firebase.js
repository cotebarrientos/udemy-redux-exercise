import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "my-poke-app.firebaseapp.com",
    projectId: "my-poke-app",
    storageBucket: "my-poke-app.appspot.com",
    messagingSenderId: "633925450605",
    appId: "1:633925450605:web:ec5d54b71c43de7ae93864"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()

export {auth, firebase, db}