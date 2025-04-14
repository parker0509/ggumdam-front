import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import heroVideo from "../assets/hero-video.mp4";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4; // 슬라이드의 총 개수

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
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

      {/* 슬라이더 섹션 */}
      <section className="slider-section">
        <div className="slider-header">
          <h2>꿈담을 통해<br /><span>전시를 홍보하다</span></h2>
          <p>꿈담은 새로운 도전을 만드는 모든 분들을 <strong>메이커</strong>라고 부릅니다</p>
        </div>

        <div className="slider-wrapper">
          <button className="slider-arrow left" onClick={prevSlide}>‹</button>

          <div className="slider-container" style={{ transform: `translateX(-${currentSlide * 320}px)` }}>
            <div className="slider-card">
              <img src="/images/sample1.jpg" alt="sample1" />
              <div className="card-text">
                <p>주식회사중인무역</p>
                <h3>58,023% 달성</h3>
                <div className="tags">
                  <span>#펀딩</span>
                  <span>#디자인</span>
                  <span>#캐리커처</span>
                </div>
              </div>
            </div>

            <div className="slider-card">
              <img src="/images/sample2.jpg" alt="sample2" />
              <div className="card-text">
                <p>(주)미니덕트</p>
                <h3>85,241% 달성</h3>
                <div className="tags">
                  <span>#펀딩</span>
                  <span>#테크</span>
                </div>
              </div>
            </div>

            <div className="slider-card">
              <img src="/images/sample3.jpg" alt="sample3" />
              <div className="card-text">
                <p>이너뷰티, 소휘</p>
                <h3>60,535% 달성</h3>
                <div className="tags">
                  <span>#프리오더</span>
                  <span>#헬스</span>
                  <span>#이너뷰티</span>
                </div>
              </div>
            </div>

            <div className="slider-card">
              <img src="/images/sample4.jpg" alt="sample4" />
              <div className="card-text">
                <p>꿈담 에디션</p>
                <h3>188명 참여</h3>
                <div className="tags">
                  <span>#꿈담 에디션</span>
                  <span>#주방</span>
                  <span>#생활</span>
                </div>
              </div>
            </div>
          </div>

          <button className="slider-arrow right" onClick={nextSlide}>›</button>
        </div>

        <div className="slider-dots">
          {[...Array(totalSlides)].map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
