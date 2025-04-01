import React, { useState } from 'react'
import { signUp } from '../services/authService';

function SignUpForm () {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSignUp = async () => {
        try {
            const resp = await signUp(email, password);
            console.log(resp);
        } catch (err) {
            alert(err);
            console.error(err);
        }
    }

    return (
        <div>
            <input 
                type="text" 
                value={email}
                placeholder="이메일"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                value={password}
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={onSignUp}
            >Sign Up</button>
        </div>
    )
}

export default SignUpForm