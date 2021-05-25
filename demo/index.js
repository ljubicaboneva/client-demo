import firebase from '../demo/node_modules/firebase';

// TODO: Replace firebaseConfig you get from Firebase Console
let firebaseConfig = {
    apiKey: "AIzaSyBpHzf9mxSr2Zd42enRyWZ-JBJZ5cDD8Y8",
    authDomain: "inellipse-43d5c.firebaseapp.com",
    projectId: "inellipse-43d5c",
    storageBucket: "inellipse-43d5c.appspot.com",
    messagingSenderId: "305917122766",
    appId: "1:305917122766:web:d3164255227051af4c989f",
    measurementId: "G-5EHJ0EHMW4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const registration = navigator.serviceWorker.ready;
const token = messaging.getToken({
    serviceWorkerRegistration: registration,
    vapidKey: "BIuXfUzKzwxI_y7fnf1WPV5Cj1Rw4f66k_e11YnRDXtylnq-lB7T6CKnIBhyZnPkWBTs4kOlhj05KkIbpyI-w7g",
});
console.log(token);
messaging
    .requestPermission()
    .then(function () {
        MsgElem.innerHTML = 'Notification permission granted.';
        console.log('Notification permission granted.');

        // get the token in the form of promise
        return messaging.getToken();
    })
    .then(function (token) {
        TokenElem.innerHTML = 'Device token is : <br>' + token;
    })
    .catch(function (err) {
        ErrElem.innerHTML = ErrElem.innerHTML + '; ' + err;
        console.log('Unable to get permission to notify.', err);
    });

let enableForegroundNotification = true;
messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
    NotisElem.innerHTML =
        NotisElem.innerHTML + JSON.stringify(payload);

    if (enableForegroundNotification) {
        let notification = payload.notification;
        navigator.serviceWorker
            .getRegistrations()
            .then((registration) => {
                registration[0].showNotification(notification.title);
            });
    }
});