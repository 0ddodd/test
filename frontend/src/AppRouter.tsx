import NavBar from './components/navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainPage from './views/mainPage'
import PostDetail from './views/postDetail'
import PostsPage from './views/postsPage'
import { ToastContainer } from 'react-toastify'
import LoginPage from './views/loginPage'

function AppRouter({user}) {
    
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    
    return (
        <div
            className="d-flex flex-column"
            style={{height: '100vh'}}
        >
            <NavBar />
            <div
                className={`d-flex justify-content-center ${isLoginPage ? "align-items-center" : ""}`}
                style={{flex:1}}
            >
            <Routes>
                <Route path="/" element={user ? <MainPage /> : <Navigate to="/login" />}/>
                <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="/posts" element={user ? <PostsPage /> : <Navigate to="/login" />} />
                <Route path="/post/:id" element={user ? <PostDetail /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
                {/* <Route path="/posts" element={<PostPage />} /> */}
            </Routes>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AppRouter