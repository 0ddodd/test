import { useEffect, useState } from 'react'
import NavBar from './components/navbar'
import LoginPage from './views/loginPage'
import MainPage from './views/mainPage'
import PostsPage from './views/postsPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './auth/firebase'

function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log(user)
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
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={user ? <MainPage /> : <Navigate to="/login" />}/>
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/posts" element={user ? <PostsPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route path="/posts" element={<PostPage />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
