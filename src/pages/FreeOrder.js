import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import './FreeOrder.css';
import './Nav.css';  // Nav.css 꼭 import 해주세요

function FreeOrder() {
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // ✅ 추가

  useEffect(() => {
    axios.get('http://localhost:9000/web/main')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("메인 메시지 요청 실패", error);
      });

    axios.get('http://localhost:9000/api/free-orders')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error("프로젝트 목록 요청 실패", error);
      });
  }, []);

  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="custom-navbar">
        <div className="nav-container">
          <div className="nav-left">
            <a href="/" className="logo">꿈담</a>
            <ul className="nav-menu">
              <li><a href="/upcoming">오픈예정</a></li>
              <li><a href="/fundplus">펀딩 +</a></li>
              <li><a href="/freeorder">프리오더</a></li>
              <li><a href="/more">더보기 ▾</a></li>
            </ul>
          </div>

          <div className="nav-right">
            <a href="/login">로그인</a>
            <a href="/signup">회원가입</a>
            <a href="/projects/new" className="project-btn">프로젝트 올리기</a>
          </div>
        </div>
      </nav>

      <main style={{ padding: '100px' }}>
        <div className="project-grid">
          {projects.map((item, index) => (
            <div
              className="project-card"
              key={index}
              onClick={() => navigate(`/free-orders/${item.id}`)} // ✅ 상세 페이지 이동
              style={{ cursor: 'pointer' }}
            >
              <img src={item.imageUrl} alt={item.productName || '프로젝트 이미지'} />
              <div className="project-info">
                <p className="project-percentage">
                  {(item.achievement ?? 0).toLocaleString()}% 달성
                </p>
                <h3 className="project-title">{item.productName || '제목 없음'}</h3>
                <p className="project-sub">{item.companyName || '회사명 없음'}</p>
                <p className="project-amount">
                  {(Math.floor((item.amountRaised ?? 0) / 10000)).toLocaleString()}만 원+
                </p>
                <p className="project-days">
                  {item.daysLeft ?? 0}일 남음
                </p>
              </div>
            </div>
          ))}
        </div>
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

export default FreeOrder;
