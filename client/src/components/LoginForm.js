import React, { useEffect, useState } from 'react';
import { validateLogin } from '../api/fetchApi';
import { useHistory } from 'react-router-dom';
import { saveToLocal } from '../utils/saveToLocal';

function LoginForm() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'));
        if (token !== null) history.push('/chatbot');
        const min = 6;
        const validEmail = /\S+@\S+\.\S+/.test(loginData.email);
        const validPassword = loginData.password.length >= min;
        setDisabled(!(validEmail && validPassword));
    }, [loginData])

    const handleChange = ({ target: { name, value } }) => {
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        const data = await validateLogin(loginData.email, loginData.password);
        console.log(loginData.email, loginData.password);
        console.log(data);
        saveToLocal('user', data);
        if (data) history.push('/chatbot');
    }

    return (
        <form>
            <label htmlFor='email-input'>
                <span>E-mail</span>
                <input
                    type="email"
                    name="email"
                    id="email-input"
                    onChange={handleChange}
                    value={loginData.email}
                    placeholder="youremail@email.com"
                />
            </label>

            <label htmlFor='password-input'>
                <span>Password</span>
                <input
                    type="password"
                    name="password"
                    id="password-input"
                    onChange={handleChange}
                    value={loginData.password}
                    placeholder="Your password"
                />
            </label>

            <button
                type="button"
                disabled={disabled}
                onClick={handleLogin}
            >
                LOGIN
            </button>


        </form>
    )
}

export default LoginForm;
