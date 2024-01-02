import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBSu97UygnugtgqMzslpC8xoLSXFsXl6dQ',
  authDomain: 'circlo-635bd.firebaseapp.com',
  projectId: 'circlo-635bd',
  storageBucket: 'circlo-635bd.appspot.com',
  messagingSenderId: '444097994810',
  appId: '1:444097994810:web:30b6ecda0b1ca72e311503',
  measurementId: 'G-1TZC0DFLZP'
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export default app
