import { useState } from 'react'
import { signUp } from '../services/authService';
import { toast } from 'react-toastify';
import CustomButton from './customButton';

function SignUpForm () {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSignUp = async () => {
        try {
            const resp = await signUp(email, password);
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
    }

    return (
        <div className='card bg-light p-5'>
            <h5 className='text-center mb-4 fw-semibold'>SIGN UP</h5>
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
                    text="회원가입"
                    onClick={onSignUp}
                    bg="primary"
                />
            </div>
        </div>
    )
}

export default SignUpForm