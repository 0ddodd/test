import React, { useState } from 'react'
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onLogin = async () => {
        try {
            const resp = await login(email, password);
            alert(`${resp.email}님이 로그인에 성공하였습니다.`);
            localStorage.setItem("user_info", JSON.stringify({email}));
            navigate("/");
            console.log(resp);
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    return (
        <div>
            <input 
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={onLogin}
            >Login</button>
        </div>
    )
}

export default LoginForm