import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FundingPlusDetails.css';

function RewardSelector({ rewards, onSelectReward }) {
  return (
    <div className="reward-box">
      <h2>🎁 리워드 선택</h2>
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className="reward-item"
          onClick={() => onSelectReward(reward.id)}
          style={{ cursor: 'pointer' }}
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
  const [item, setItem] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ 로그인 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // ✅ 로그인 상태 초기화
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    axios.get(`/api/funding-orders/${id}`)
      .then(response => {
        setItem(response.data);
        setLikes(response.data.likes || 0);
      })
      .catch(error => {
        console.error("프로젝트 상세 정보 요청 실패", error);
        alert("프로젝트 정보를 불러오는데 실패했습니다.");
      });

    axios.get(`/api/funding-orders/${id}/rewards`)
      .then(response => {
        setRewards(response.data);
      })
      .catch(error => {
        console.error("리워드 목록 요청 실패", error);
        alert("리워드 목록을 불러오는데 실패했습니다.");
      });
  }, [id]);

  const handleLogout = () => { // ✅ 로그아웃 함수 추가
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleLike = () => {
    if (liked) {
      alert("이미 찜한 프로젝트입니다!");
      return;
    }

    axios.post(`/api/funding-orders/${id}/like`)
      .then(() => {
        setLikes(prev => prev + 1);
        setLiked(true);
      })
      .catch(() => {
        alert("찜하기에 실패했습니다.");
      });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert("📋 페이지 링크가 복사되었습니다!"))
      .catch(() => alert("❌ 링크 복사에 실패했습니다."));
  };

  const handleRewardClick = (rewardId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }
    navigate(`/purchase?rewardId=${rewardId}`);
  };

  if (!item) return <div className="loading">로딩 중...</div>;

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
            <button>🔍</button>
          </div>
          <div className="nav-right">
            {/* ✅ 조건부 렌더링 */}
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="nav-link-btn">로그아웃</button>
                <a href="/mypage">마이페이지</a>
              </>
            ) : (
              <>
                <a href="/login">로그인</a>
                <a href="/signup">회원가입</a>
              </>
            )}
            <a href="/projects/new" className="project-btn">프로젝트 올리기</a>
          </div>
        </div>
      </nav>

      {/* 상세 페이지 본문 */}
      <main className="detail-container">
        <div className="left-image">
          <img src={item.imageUrl} alt={item.productName} />
        </div>

        <div className="right-content">
          <div className="tag">📦 프리오더 · 글로벌</div>
          <h1>{item.productName}</h1>
          <p className="short-desc">{item.shortDescription || '간단한 설명이 들어갑니다.'}</p>

          <div className="stats">
            <div>
              <strong className="highlight">{item.achievement}%</strong>
              <span>달성</span>
            </div>
            <div>
              <strong>{item.amountRaised.toLocaleString()}원</strong>
              <span>모금액</span>
            </div>
            <div>
              <strong>{item.daysLeft}일</strong>
              <span>남음</span>
            </div>
          </div>

          <button className="purchase-btn" onClick={() => alert("리워드를 선택해주세요.")}>
            예약 구매하기
          </button>

          <div className="support-note">
            {item.supporters}명이 지지서명 했어요
          </div>

          <button className="support-btn" onClick={() => alert("지지서명 기능 준비중입니다.")}>
            지지서명 하기
          </button>

          <div className="action-icons">
            <button onClick={handleLike} className="like-btn">
              💖 {likes}
            </button>
            <button onClick={handleShare} className="share-btn">
              🔗 공유
            </button>
          </div>

          <RewardSelector rewards={rewards} onSelectReward={handleRewardClick} />

          <div className="company-info">
            <div className="label">메이커</div>
            <div className="company-name">{item.companyName}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FreeOrderDetails;
