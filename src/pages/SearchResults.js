import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import './SearchResults.css';
import axios from 'axios';
import SearchDropdown from './SearchDropdown'; // 필요 시 경로 수정

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const type = searchParams.get('type') || 'free';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 navbar 관련 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState(keyword);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchType, setSearchType] = useState(type);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const recommendedKeywords = [
    '꿈담에디션', '마감임박', '스토어BEST', '패션추천',
    '충전기', '건강식품', '스킨케어', '간식', '화장품',
  ];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?type=${searchType}&keyword=${encodeURIComponent(searchInput)}`);
    } else {
      alert('검색어를 입력해주세요.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
    } catch (err) {
      alert('로그아웃 실패');
    }
  };

  useEffect(() => {
    if (!keyword) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const url = `/api/search?type=${type}&keyword=${encodeURIComponent(keyword)}`;
        console.log('📡 요청 URL:', url);
        const res = await axios.get(url);
        console.log('✅ 응답 데이터:', res.data);
        setResults(res.data);
      } catch (e) {
        console.error('❌ 에러 발생:', e);
        setError('검색 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [keyword, type]);

  return (
    <>
      {/* ✅ 네비게이션 바 추가 */}
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
                onKeywordSelect={(kw) => {
                  setSearchInput(kw);
                  setIsSearchFocused(false);
                  navigate(`/search?type=${searchType}&keyword=${encodeURIComponent(kw)}`);
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
                <button className="nav-login-btn" onClick={() => navigate('/login')}>로그인</button>
                <Link to="/register">회원가입</Link>
              </>
            )}
            <Link to="/projects/new" className="project-btn">프로젝트 만들기</Link>
          </div>
        </div>
      </nav>

      {/* ✅ 검색 결과 콘텐츠 */}
      <div className="search-results-container">
        <h2 className="search-title">🔍 '{keyword}'에 대한 검색 결과</h2>
        {loading && <p>로딩 중...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && results.length === 0 && <p>검색 결과가 없습니다.</p>}

        <div className="card-grid">
          {results.map((item, index) => (
            <div
              className="card"
              key={item?.id || index}
              onClick={() => {
                if (item?.id) {
                  navigate(`/${searchType}-orders/${item.id}`);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-img-wrapper">
                <img
                  src={item?.imageUrl || '/default.jpg'}
                  alt={item?.title || '이미지'}
                  className="card-img"
                />
                {/* 찜하기 버튼 클릭시 카드 클릭 이벤트가 발생하지 않도록 막기 */}
                <button
                  className="wishlist-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  🤍
                </button>
              </div>
              <div className="card-info">
                <div className="price">
                  {item?.amountRaised !== undefined
                    ? `${item.amountRaised.toLocaleString()}원`
                    : '가격 정보 없음'}
                </div>
                <div className="title">{item?.title || '제목 없음'}</div>
                <div className="subtitle">
                  {item?.summary || item?.description || '설명 없음'}
                </div>
                <div className="meta">
                  <span className="company">{item?.companyName || '주식회사 여행사'}</span>
                  <span className="rating">⭐ {item?.rating || '0.0'}</span>
                </div>
                {item?.badges && (
                  <div className="badges">
                    {item.badges.map((badge, i) => (
                      <span className="badge" key={i}>{badge}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
