import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import heroVideo from "../assets/hero-video.mp4";
import HomeSliderSection from "./HomeSliderSection"; // 경로는 실제 위치에 맞게 조정해줘
import axios from "axios";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projects, setProjects] = useState([]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("프로젝트 가져오기 실패", err);
      });
  }, []);

  return (
    <>
      {/* 네비게이션 */}
      <nav className="custom-navbar">
        <div className="nav-container">
          <Link to="/" className="logo">꿈담</Link>

          <ul className="nav-menu">
            <li><Link to="/upcoming">오픈예정</Link></li>
            <li><Link to="/funding">펀딩 +</Link></li>
            <li><Link to="/preorder">프리오더</Link></li>
            <li><Link to="/store">스토어</Link></li>
            <li><Link to="/more">더보기 ▾</Link></li>
          </ul>

          <div className="nav-search">
            <input type="text" placeholder="새로운 일상이 필요하신가요?" />
            <button>🔍</button>
          </div>

          <div className="nav-right">
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
            <Link to="/create-project" className="project-btn">프로젝트 만들기</Link>
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
    </>
  );
};

export default Home;
