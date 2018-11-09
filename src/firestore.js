import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDT3YoWmgq6SJ2DmuZuoaUyAEDrTz6wNWE",
    authDomain: "studyseat-6262b.firebaseapp.com",
    databaseURL: "https://studyseat-6262b.firebaseio.com",
    projectId: "studyseat-6262b",
    storageBucket: "studyseat-6262b.appspot.com",
    messagingSenderId: "216845681832"
}

const setting = {
    timestampsInSnapshots: true
}

firebase.initializeApp(config);
firebase.firestore().settings(setting);

export default firebase;