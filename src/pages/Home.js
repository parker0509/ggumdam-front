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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
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
            <li><Link to="/main">프리오더</Link></li>
            <li><Link to="/store">스토어</Link></li>
            <li><Link to="/more">더보기 ▾</Link></li>
          </ul>

          <div className="nav-search">
            <input type="text" placeholder="새로운 일상이 필요하신가요?" />
            <button>🔍</button>
          </div>

          <div className="nav-right">
            {/* 로그인 버튼 클릭 시 모달 열기 */}
            <button onClick={openModal}>로그인</button>
            <Link to="/register">회원가입</Link>
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

      {/* About 컴포넌트 추가 */}
      <About />

      {/* 로그인 모달 */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />

      {/* 푸터 영역 */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">정책 · 약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">제휴문의</a>
            <a href="#">공지사항</a>
            <a href="#">꿈담 IR</a>
            <a href="#">인재채용</a>
            <a href="#">SNS</a>
            <a href="#">번역 아이콘</a>
            <a href="#">꿈담 고객센터</a>
            <a href="#">채팅 상담하기</a>
            <a href="#">문의 등록하기</a>
            <a href="#">도움말 센터 바로가기</a>
            <a href="#">Contact for Global</a>
          </div>
          <div className="footer-contact">
            <p>상담 가능 시간: 평일 오전 9시 ~ 오후 6시 (주말, 공휴일 제외)</p>
            <p>꿈담㈜ 대표이사 신혜성</p>
            <p>사업자등록번호 258-87-01370</p>
            <p>통신판매업신고번호 2021-성남분당C-1153</p>
            <p>호스팅 서비스사업자: 꿈담㈜</p>
            <p>경기 성남시 분당구 판교로 242 PDC A동 402호</p>
            <p>이메일 상담: info@dreamcompany.kr</p>
            <p>유선 상담: 1661-9056</p>
            <p>© dreamcompany Co., Ltd.</p>
          </div>
        </div>
        <div className="footer-disclaimer">
          <p>일부 상품의 경우 꿈담은 통신판매중개자이며 통신판매 당사자가 아닙니다.</p>
          <p>상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있으며 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.</p>
          <p>무단복제, 전송, 배포, 크롤링, 스크래핑 등의 행위는 저작권법에 의해 금지됩니다.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
