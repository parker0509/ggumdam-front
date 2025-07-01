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

  // URL에 token이 있으면 자동 로그인 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      // 필요하면 리프레시 토큰도 같이 저장하도록 백엔드에 맞춰서 추가 가능
      navigate("/", { replace: true }); // 로그인 후 홈으로 이동
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

      console.log("로그인 응답:", data);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const locationState = location.state?.from || "/";
      navigate(locationState, { replace: true });

      alert("로그인 성공!");
    } catch (err) {
      setError(err.message);
    }
  };

  // OAuth 로그인 URL (백엔드 설정에 맞게 변경하세요)
  const kakaoAuthUrl = "http://localhost:8000/oauth2/authorize/kakao";
  const naverAuthUrl = "http://localhost:8000/oauth2/authorize/naver";
  const googleAuthUrl = "http://localhost:8000/oauth2/authorize/google";

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
          <button type="submit" className="btn btn-primary w-100">
            로그인
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register">회원가입</Link>
        </div>

        <hr className="my-4" />

        <div className="text-center">
          <p>간편 로그인</p>
          <button
            onClick={() => (window.location.href = kakaoAuthUrl)}
            className="btn btn-warning me-2"
            style={{ color: "#3c1e1e" }}
          >
            카카오 로그인
          </button>
          <button
            onClick={() => (window.location.href = naverAuthUrl)}
            className="btn btn-success me-2"
            style={{ backgroundColor: "#03C75A", borderColor: "#03C75A" }}
          >
            네이버 로그인
          </button>
          <button
            onClick={() => (window.location.href = googleAuthUrl)}
            className="btn btn-outline-danger"
          >
            구글 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
