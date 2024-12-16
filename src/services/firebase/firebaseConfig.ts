import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBuobxz4qA-2EtYVmrhHTK3r-u1JZ0HntI',
  authDomain: 'codingchallenge049.firebaseapp.com',
  projectId: 'codingchallenge049',
  storageBucket: 'codingchallenge049.firebasestorage.app',
  messagingSenderId: '812568441576',
  appId: '1:812568441576:web:cf1cf545fbf0a2e082cf5d',
  measurementId: 'G-4VFRGXXHGB',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
