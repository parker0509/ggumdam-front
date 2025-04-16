// LoginModal.js
import React from "react";
import "./LoginModal.css"; // 스타일 파일

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음.

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>로그인 또는 회원가입</h2>
        <div className="modal-buttons">
          <button onClick={() => window.location.href = "/login"}>로그인하기</button>
          <button onClick={() => window.location.href = "/signup"}>회원가입하기</button>
        </div>
        <button onClick={onClose} className="close-btn">닫기</button>
      </div>
    </div>
  );
};

export default LoginModal;
