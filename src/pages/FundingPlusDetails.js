import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SearchDropdown from '../pages/SearchDropdown'; // 필요없으면 삭제해도 됨
import './FundingPlusDetails.css';
import './Nav.css';  // nav.css 경로에 맞게 수정

function RewardSelector({ rewards, selectedRewardId, onSelectReward }) {
  return (
    <div className="reward-box">
      <h2>🎁 리워드 선택</h2>
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className={`reward-item ${selectedRewardId === reward.id ? 'selected' : ''}`}
          onClick={() => onSelectReward(reward.id)}
        >
          <div className="reward-header">
            <span className="price">{reward.price.toLocaleString()}원</span>
            <span className="stock">현재 {reward.remaining}개 남음</span>
          </div>
          <div className="reward-title">{reward.title}</div>
          <div className="reward-desc">{reward.desc}</div>
          <div className="reward-meta">
            <div>배송비: {reward.shippingFee.toLocaleString()}원</div>
            <div>발송 시작일: {reward.deliveryDate}</div>
            <div>제한 수량: {reward.limit}개</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FreeOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [selectedRewardId, setSelectedRewardId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    axios.get(`/api/funding-orders/${id}`)
      .then(res => {
        setItem(res.data);
        setLikes(res.data.likes || 0);
      })
      .catch(() => alert("프로젝트 정보를 불러오는데 실패했습니다."));

    axios.get(`/api/funding-orders/${id}/rewards`)
      .then(res => setRewards(res.data))
      .catch(() => alert("리워드 목록을 불러오는데 실패했습니다."));
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleLike = () => {
    if (liked) return alert("이미 찜한 프로젝트입니다!");
    axios.post(`/api/funding-orders/${id}/like`)
      .then(() => {
        setLiked(true);
        setLikes(likes + 1);
      })
      .catch(() => alert("찜하기에 실패했습니다."));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert("📋 링크가 복사되었습니다!"))
      .catch(() => alert("❌ 링크 복사 실패"));
  };

  const handlePurchaseClick = () => {
    if (!selectedRewardId) return alert("리워드를 선택해주세요.");
    const token = localStorage.getItem("accessToken");
    if (!token) return navigate("/login");
    navigate(`/purchase?rewardId=${selectedRewardId}`);
  };

  if (!item) return <div className="loading">로딩 중...</div>;

  return (
    <>
      {/* 네비게이션 */}
        <nav className="custom-navbar">
          <div className="nav-container">
            <div className="nav-left">
              <Link to="/" className="logo">꿈담</Link>
              <ul className="nav-menu">
                <li><Link to="/upcoming">오픈예정</Link></li>
                <li><Link to="/fundplus">펀딩 +</Link></li>
                <li><Link to="/freeorder">프리오더</Link></li>
                <li><Link to="/more">더보기 ▾</Link></li>
              </ul>
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

      {/* 상세 본문 */}
      <main className="detail-container">
        <div className="left-image">
          <img src={item.imageUrl} alt={item.productName} />
        </div>

        <div className="right-content">
          <div className="tag">📦 프리오더 · 글로벌</div>
          <h1>{item.productName}</h1>
          <p className="short-desc">{item.shortDescription || '간단한 설명이 들어갑니다.'}</p>

          <div className="stats">
            <div><strong className="highlight">{item.achievement}%</strong><span>달성</span></div>
            <div><strong>{item.amountRaised.toLocaleString()}원</strong><span>모금액</span></div>
            <div><strong>{item.daysLeft}일</strong><span>남음</span></div>
          </div>

          <button className="purchase-btn" onClick={handlePurchaseClick}>
            예약 구매하기
          </button>

          <div className="support-note">{item.supporters}명이 지지서명 했어요</div>
          <button className="support-btn" onClick={() => alert("지지서명 기능 준비중입니다.")}>
            지지서명 하기
          </button>

          <div className="action-icons">
            <button onClick={handleLike}>💖 {likes}</button>
            <button onClick={handleShare}>🔗 공유</button>
          </div>

          <RewardSelector
            rewards={rewards}
            selectedRewardId={selectedRewardId}
            onSelectReward={setSelectedRewardId}
          />

          <div className="company-info">
            <div className="label">메이커</div>
            <div className="company-name">{item.companyName}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default FreeOrderDetails;
