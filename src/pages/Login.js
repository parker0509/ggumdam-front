import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ 추가
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 훅
  const location = useLocation(); // ✅ 이전 경로 정보 가져오기

    const handleLogin = async (e) => {
      e.preventDefault();
      setError(null);

      // 로그인 API 호출
      try {
        const response = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");

        const data = await response.json();
        localStorage.setItem("token", data.token);

        // 로그인 후 원래 페이지로 리디렉션
        const locationState = location.state?.from || "/";
        navigate(locationState, { replace: true });

        alert("로그인 성공!");
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">로그인</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">로그인</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
