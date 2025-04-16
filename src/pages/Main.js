import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';

function Main() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('localhost:8080/web/main')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("데이터 요청 실패", error);
      });
  }, []);

  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="custom-navbar">
        <div className="nav-container">
          <a href="/" className="logo">꿈담</a>
          <ul className="nav-menu">
            <li><a href="/">홈</a></li>
            <li><a href="/projects">프로젝트</a></li>
            <li><a href="/about">소개</a></li>
          </ul>
          <div className="nav-search">
            <input type="text" placeholder="검색어 입력" />
            <button>🔥</button>
          </div>
          <div className="nav-right">
            <a href="/login">로그인</a>
            <a href="/signup">회원가입</a>
            <a href="/projects/new" className="project-btn">프로젝트 올리기</a>
          </div>
        </div>
      </nav>

      {/* 본문 영역 (자유롭게 구성) */}
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1>메인 페이지</h1>
        <p>{message}</p>
        <p>이곳에 원하는 내용을 추가하세요!</p>
      </main>

      {/* 푸터 */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/terms">이용약관</a>
            <a href="/privacy">개인정보처리방침</a>
            <a href="/help">고객센터</a>
          </div>
          <div className="footer-contact">
            <p>문의: help@funding.com</p>
            <p>전화: 1234-5678</p>
          </div>
        </div>
        <div className="footer-disclaimer">
          <p>ⓒ 2025 FUNDING. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;
