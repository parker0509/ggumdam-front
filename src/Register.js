import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            window.location.href = "/Login"; // 로그인 페이지로 이동
        } else {
            alert('회원가입 실패');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>가입하기</button>
        </div>
    );
};

export default Register;
