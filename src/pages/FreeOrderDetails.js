import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FreeOrderDetails.css';
import './Nav.css'
import { useParams, useNavigate, Link } from 'react-router-dom';

function FreeOrderDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [rewards, setRewards] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    // 프로젝트 상세 정보 가져오기
    axios.get(`http://localhost:9000/api/free-orders/${id}`)
      .then(response => {
        setItem(response.data);
        setLikes(response.data.likes || 0);
      })
      .catch(error => {
        console.error("프로젝트 상세 정보 요청 실패", error);
      });

    // 리워드 목록 가져오기
    axios.get(`http://localhost:9000/api/free-orders/${id}/rewards`)
      .then(response => {
        setRewards(response.data);
      })
      .catch(error => {
        console.error("리워드 목록 요청 실패", error);
      });
  }, [id]);

  const handleLike = () => {
    if (liked) {
      alert("이미 찜한 프로젝트입니다!");
      return;
    }
    axios.post(`http://localhost:9000/api/free-orders/${id}/like`)
      .then(() => {
        setLikes(prev => prev + 1);
        setLiked(true);
      })
      .catch(() => {
        alert("찜하기에 실패했습니다.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  function RewardSelector({ rewards }) {
    const handleRewardClick = (rewardId) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다!");
        navigate("/login");
        return;
      }
      // 로그인 상태면 구매 페이지로 이동
      navigate(`/purchase?rewardId=${rewardId}`);
    };

    return (
      <div className="reward-box">
        <h2>🎁 리워드 선택</h2>
        {rewards.map(reward => (
          <div
            key={reward.id}
            className="reward-item"
            onClick={() => handleRewardClick(reward.id)}
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

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("📋 페이지 링크가 복사되었습니다!");
    }).catch(() => {
      alert("❌ 링크 복사에 실패했습니다.");
    });
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

          <button className="purchase-btn">예약 구매하기</button>

          <div className="support-note">
            {item.supporters}명이 지지서명 했어요
          </div>

          <button className="support-btn">지지서명 하기</button>

          <div className="action-icons">
            <button onClick={handleLike} className="like-btn">
              💖 {likes}
            </button>
            <button onClick={handleShare} className="share-btn">
              🔗 공유
            </button>
          </div>

          {/* 리워드 선택 UI */}
          <RewardSelector rewards={rewards} />

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
