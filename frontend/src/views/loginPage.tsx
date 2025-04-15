import { useState } from 'react'
import SignUpForm from '../components/signUpForm'
import LoginForm from '../components/loginForm'

function LoginPage() {

    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <div>
            {isLogin ?
                <LoginForm />
            :
                <SignUpForm />
            }
            <p className="text-decoration-underline text-center mt-3" onClick={()=>setIsLogin(!isLogin)}>
                {isLogin ? "회원가입" : "로그인"}
            </p>
        </div>
    )
}

export default LoginPage