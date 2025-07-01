import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8005/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패. 다시 시도해주세요.");
      }

      alert("회원가입 성공!");
      navigate("/Home");
    } catch (err) {
      setError(err.message);
    }
  };

  // OAuth 로그인 페이지 URL (백엔드 OAuth 콜백 앞단 URL)
  const kakaoAuthUrl = "http://localhost:8000/oauth2/authorize/kakao";   // 예: 백엔드에서 카카오 인가 요청 시작점
  const naverAuthUrl = "http://localhost:8000/oauth2/authorize/naver";
  const googleAuthUrl = "http://localhost:8000/oauth2/authorize/google";

  // 실제 URL은 백엔드 OAuth2 인가 요청 URL에 맞게 조정 필요

  return (
    <div className="container mt-5">
      <h2 className="text-center">회원가입</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">이름:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">이메일:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">비밀번호:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">전화번호:</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$"
            placeholder="010-1234-5678"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          회원가입
        </button>
      </form>

      <hr className="my-4" />

      <div className="text-center">
        <p>간편 로그인</p>
        <button
          onClick={() => window.location.href = kakaoAuthUrl}
          className="btn btn-warning me-2"
          style={{ color: "#3c1e1e" }}
        >
          카카오 로그인
        </button>
        <button
          onClick={() => window.location.href = naverAuthUrl}
          className="btn btn-success me-2"
          style={{ backgroundColor: "#03C75A", borderColor: "#03C75A" }}
        >
          네이버 로그인
        </button>
        <button
          onClick={() => window.location.href = googleAuthUrl}
          className="btn btn-outline-danger"
        >
          구글 로그인
        </button>
      </div>
    </div>
  );
};

export default Register;
