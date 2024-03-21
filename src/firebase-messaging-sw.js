importScripts('https://www.gstatic.com/firebasejs/9.6.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.3/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCMiTF7XNAqg7k0e467ecqUbO1JFRCDXMo",
    authDomain: "fir-cdff0.firebaseapp.com",
    projectId: "fir-cdff0",
    storageBucket: "fir-cdff0.appspot.com",
    messagingSenderId: "774255142625",
    appId: "1:774255142625:web:a3763c076634bb6d9579a0",
    measurementId: "G-WGYTM6LP73"
});
const messaging = firebase.messaging();