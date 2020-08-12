import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyDSsBMatx7H6bkSefU431UDiLbKHL76jHk",
  authDomain: "tasty-760b1.firebaseapp.com",
  databaseURL: "https://tasty-760b1.firebaseio.com",
  projectId: "tasty-760b1",
  storageBucket: "tasty-760b1.appspot.com",
  messagingSenderId: "661864551262",
  appId: "1:661864551262:web:459ba1359eb4c7ccfe35cf",
  measurementId: "G-T845QM52D2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase