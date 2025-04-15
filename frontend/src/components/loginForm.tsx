import { useState } from 'react'
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomButton from './customButton';

function LoginForm() {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const onLogin = async () => {
        try {
            const resp = await login(email, password);
            
            toast(`${resp.email}님이 로그인에 성공하였습니다.`, {
                type: 'success',
                position: 'bottom-right',
                autoClose: 2000,
                style: {
                    fontSize: '14px'
                }
            });

            localStorage.setItem("user_info", JSON.stringify({email}));
            navigate("/");
            console.log(resp);
        } catch (err) {
            toast(`${err}`, {
                type: 'error',
                position: 'bottom-right',
                autoClose: 2000,
                style: {
                    fontSize: '14px'
                }
            })
            console.error(err);
        }
    };

    return (
        <div className='card bg-light p-5'>
            <h5 className='text-center mb-4 fw-semibold'>LOG IN</h5>
            <div className="d-flex flex-column gap-3">
                <input 
                    type="email"
                    placeholder="이메일"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="비밀번호"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <CustomButton
                    text="로그인"
                    onClick={onLogin}
                    bg="primary"
                />
            </div>
        </div>
    )
}

export default LoginForm