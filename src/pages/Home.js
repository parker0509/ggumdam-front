import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import heroVideo from "../assets/hero-video.mp4";
import HomeSliderSection from "./HomeSliderSection";
import axios from "axios";
import LoginModal from "./LoginModal"; // 모달 컴포넌트 임포트
import About from "./About"; // About 컴포넌트 임포트

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 로그인 모달
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  // 슬라이드 관련 함수
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // 모달 열기/닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 프로젝트 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8006/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("프로젝트 가져오기 실패", err));
  }, []);

  // 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // 로그아웃 핸들러
const handleLogout = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // 여기 accessToken 써야 함
    if (!accessToken) throw new Error("액세스 토큰이 없습니다.");

    await axios.post(
      "http://localhost:8000/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // accessToken 사용
        },
      }
    );
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
  } catch (error) {
    console.error("로그아웃 실패", error);
    alert("로그아웃 중 오류가 발생했습니다.");
  }
};

  return (
    <>
      {/* 네비게이션 */}
      <nav className="custom-navbar">
        <div className="nav-container">
          <Link to="/" className="logo">꿈담</Link>

          <ul className="nav-menu">
            <li><Link to="/upcoming">오픈예정</Link></li>
            <li><Link to="/funding">펀딩 +</Link></li>
            <li><Link to="/freeorder">프리오더</Link></li>
            <li><Link to="/store">스토어</Link></li>
            <li><Link to="/more">더보기 ▾</Link></li>
          </ul>

          <div className="nav-search">
            <input type="text" placeholder="새로운 일상이 필요하신가요?" />
            <button>🔍</button>
          </div>

          <div className="nav-right">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout}>로그아웃</button>
                <Link to="/mypage">마이페이지</Link>
              </>
            ) : (
              <>
                <button onClick={openModal}>로그인</button>
                <Link to="/register">회원가입</Link>
              </>
            )}
            <Link to="/projects/new" className="project-btn">프로젝트 만들기</Link>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="hero-video-section">
        <video autoPlay muted loop className="hero-video">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <h2>누구나 꿈담을 통해 할 수 있어요</h2>
          <Link to="/create-project" className="start-btn">프로젝트 시작하기 →</Link>
        </div>
      </section>

      {/* 슬라이더 영역 */}
      <HomeSliderSection />

      {/* About 섹션 */}
      <About />

      {/* 로그인 모달 — 조건부 렌더링 */}
      {isModalOpen && <LoginModal onClose={closeModal} />}

      {/* 푸터 */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            {/* ... footer links ... */}
          </div>
          <div className="footer-contact">
            {/* ... footer contact info ... */}
          </div>
        </div>
        <div className="footer-disclaimer">
          {/* ... disclaimer text ... */}
        </div>
      </footer>
    </>
  );
};

export default Home;
