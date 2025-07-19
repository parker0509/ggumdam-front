// Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import heroVideo from "../assets/hero-video.mp4";
import HomeSliderSection from "./HomeSliderSection";
import axios from "axios";
import LoginModal from "./LoginModal";
import About from "./About";
import SearchDropdown from "./SearchDropdown"; // 🔍 추가

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("free"); // free or funding
  const recommendedKeywords = [
    "꿈담에디션", "마감임박", "스토어BEST", "패션추천",
    "충전기", "건강식품", "스킨케어", "간식", "화장품",
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("액세스 토큰이 없습니다.");

      await axios.post("http://localhost:8000/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  // 🔽 추가: 검색 실행 함수
  const handleSearch = () => {
    // 입력값이 비어있지 않을 때만 검색 실행
    if (searchInput.trim()) {
      // 검색 드롭다운을 닫고, 검색 결과 페이지로 이동
      setIsSearchFocused(false);
      navigate(`/search?type=${searchType}&keyword=${encodeURIComponent(searchInput)}`);
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  // 🔽 추가: 엔터 키 입력 처리 함수
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
            <li><Link to="/fundplus">펀딩 +</Link></li>
            <li><Link to="/freeorder">프리오더</Link></li>
            <li><Link to="/more">더보기 ▾</Link></li>
          </ul>

    <div className="nav-search" ref={searchRef}>
      <div className="search-controls">
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="free">프리오더</option>
          <option value="funding">펀딩</option>
        </select>
        <input
          type="text"
          placeholder="🦖 새로운 일상이 필요하신가요?"
          value={searchInput}
          onFocus={() => setIsSearchFocused(true)}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      {isSearchFocused && (
        <SearchDropdown
          keywords={recommendedKeywords}
          onKeywordSelect={(keyword) => {
            setSearchInput(keyword);
            setIsSearchFocused(false);
            navigate(`/search?type=${searchType}&keyword=${encodeURIComponent(keyword)}`);
          }}
          onClose={() => setIsSearchFocused(false)}
        />
      )}
    </div>

          <div className="nav-right">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout}>로그아웃</button>
                <Link to="/mypage">마이페이지</Link>
              </>
            ) : (
              <>
                <button className="nav-login-btn" onClick={() => navigate("/login")}>로그인</button>
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

      <HomeSliderSection />
      <About />

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">{/* ... */}</div>
          <div className="footer-contact">{/* ... */}</div>
        </div>
        <div className="footer-disclaimer">{/* ... */}</div>
      </footer>
    </>
  );
};

export default Home;
