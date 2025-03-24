import NavBar from './components/navbar'
import MainPage from './views/mainPage'
import PostsPage from './views/postsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/posts" element={<PostsPage />} />
          {/* <Route path="/posts" element={<PostPage />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
