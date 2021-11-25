import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC63cfn4CgIwf4P7nBJfgUWMryuhafFmt4',
  authDomain: 'cooking-ninja-eecb4.firebaseapp.com',
  projectId: 'cooking-ninja-eecb4',
  storageBucket: 'cooking-ninja-eecb4.appspot.com',
  messagingSenderId: '611152528624',
  appId: '1:611152528624:web:3073c81dd5a29c9666ee35',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
