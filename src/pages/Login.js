import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate(location.state?.from || "/", { replace: true });
      alert("로그인 성공!");
    } catch (err) {
      setError(err.message);
    }
  };

  const kakaoAuthUrl = "http://localhost:8000/oauth2/authorize/kakao";
  const naverAuthUrl = "http://localhost:8000/oauth2/authorize/naver";
  const googleAuthUrl = "http://localhost:8000/oauth2/authorize/google";

  return (
    <div className="login-wrapper">
      <h1 className="login-logo">꿈담</h1>

      <div className="login-box">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="email-login-btn">
            이메일로 로그인하기
          </button>
        </form>

        <button className="kakao-btn" onClick={() => (window.location.href = kakaoAuthUrl)}>
          카카오로 시작하기
        </button>
        <button className="naver-btn" onClick={() => (window.location.href = naverAuthUrl)}>
          네이버로 시작하기
        </button>

        <div className="social-icons">
          <button onClick={() => window.location.href = googleAuthUrl}>
            <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" />
          </button>

        </div>

        <div className="login-links">
          <Link to="#">아이디/비밀번호 찾기</Link> | <Link to="/register">회원가입</Link>
        </div>
      </div>

      <div className="qr-section">
        <div className="qr-text">📱 QR코드로 앱 전용 쿠폰, 혜택 받기</div>
        <img src="/1MdBB.jpg" alt="QR Code" className="qr-img" />
      </div>
    </div>
  );
};

export default Login;
