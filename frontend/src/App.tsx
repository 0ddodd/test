import NavBar from './components/navbar'
import MainPage from './views/mainPage'
import PostPage from './views/postPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/posts" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
