import React, { useState } from "react";
import axios from "axios";
import "./LoginModal.css"; // 모달 스타일

function LoginModal({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

    const handleLogin = async () => {
      try {
        const loginData = {
          email: userEmail,
          password: userPassword,
        };

        const response = await axios.post("http://localhost:8000/api/auth/login", loginData);
        const { accessToken, refreshToken } = response.data;

        // 콘솔 확인용
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);

        localStorage.setItem("refreshToken", refreshToken);

        alert("로그인 성공!");
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("로그인 실패", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };

  // 모달 배경 클릭 시 닫기 & 내부 클릭 시 닫히지 않도록 이벤트 막기
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleLogin}>로그인</button>
          <button className="close-btn" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
