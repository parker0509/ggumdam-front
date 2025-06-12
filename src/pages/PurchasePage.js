import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// axios 대신 직접 만든 axiosInstance 사용
import axiosInstance from '../pages/axiosInstance';
import './PurchasePage.css';

function PurchasePage() {
  const [searchParams] = useSearchParams();
  const rewardId = searchParams.get("rewardId");
  const [reward, setReward] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // accessToken 변수명은 localStorage에 맞게
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      if (!rewardId) {
        alert("잘못된 접근입니다. 리워드 정보가 없습니다.");
        navigate("/");
        return;
      }

      try {
        // axiosInstance는 인터셉터에서 자동으로 토큰 헤더 추가함
        const userRes = await axiosInstance.get("http://localhost:8005/api/user/me");
        setUser(userRes.data);

        const rewardRes = await axiosInstance.get(`http://localhost:8006/api/free-orders/rewards/${rewardId}`);
        setReward(rewardRes.data);

        // 토큰 콘솔 출력 (debug 용)
        console.log("현재 accessToken:", accessToken);

      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        alert("정보를 불러오지 못했습니다.");
        navigate("/");
      }
    };

    fetchData();
  }, [rewardId, navigate]);

  const handlePurchase = () => {
    alert(`"${reward.title}" 리워드를 구매합니다!`);
    // 결제 페이지 또는 성공 페이지로 이동 처리 필요
  };

  if (!reward || !user) return <div className="loading">로딩 중...</div>;

  return (
    <div className="purchase-page">
      <h1>🎁 리워드 구매</h1>

      <div className="reward-summary">
        <h2>{reward.title}</h2>
        <p>{reward.desc}</p>
        <ul>
          <li>가격: {reward.price.toLocaleString()}원</li>
          <li>배송비: {reward.shippingFee.toLocaleString()}원</li>
          <li>예상 발송일: {reward.deliveryDate}</li>
          <li>남은 수량: {reward.remaining}개</li>
        </ul>
      </div>

      <div className="user-summary">
        <h3>주문자 정보</h3>
        <p>이름: {user.name}</p>
        <p>이메일: {user.email}</p>
      </div>

      <button className="confirm-btn" onClick={handlePurchase}>
        ✅ 구매하기
      </button>
    </div>
  );
}

export default PurchasePage;
