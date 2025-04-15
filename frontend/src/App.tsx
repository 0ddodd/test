import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './auth/firebase'
import './App.css'
import AppRouter from './AppRouter'

function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log(currentUser)
      } else {
        console.log('error')
        console.log(user)
      }
    });


    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AppRouter user={user} />
    </Router>
  )
}

export default App
