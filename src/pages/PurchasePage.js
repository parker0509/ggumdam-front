import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../pages/axiosInstance";
import "./PurchasePage.css";

function PurchasePage() {
  const [searchParams] = useSearchParams();
  const rewardId = searchParams.get("rewardId");
  const [reward, setReward] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isDiscountChecked, setIsDiscountChecked] = useState(false);

  // 필수 동의 체크박스 상태
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  const discountAmount = 3000;

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      if (!rewardId) {
        alert("잘못된 접근입니다.");
        navigate("/");
        return;
      }

      try {
        const userRes = await axiosInstance.get("http://localhost:8005/api/user/me");
        setUser(userRes.data);

        const rewardRes = await axiosInstance.get(`http://localhost:8006/api/free-orders/rewards/${rewardId}`);
        setReward(rewardRes.data);
      } catch (error) {
        alert("정보 로딩 실패");
        navigate("/");
      }
    };

    fetchData();
  }, [rewardId, navigate]);

  const getTotalPrice = () => {
    const base = reward.price + reward.shippingFee;
    return isDiscountChecked ? base - discountAmount : base;
  };

  const handlePurchase = () => {
    // 필수 동의 체크 확인
    if (!agree1 || !agree2 || !agree3) {
      alert("결제 진행을 위해 모든 필수 동의사항에 동의해 주세요.");
      return;
    }

    const IMP = window.IMP;
    IMP.init("imp13765068");

    const totalAmount = getTotalPrice();

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: reward.title,
        amount: totalAmount,
        buyer_email: user.email,
        buyer_name: user.name,
      },
      async (rsp) => {
        if (rsp.success) {
          try {
            const orderRes = await axiosInstance.post("http://localhost:8010/api/orders", {
              userId: user.id,
              rewardId: reward.id,
              amount: totalAmount,
              recipient,
              phone,
              address,
              addressDetail,
            });

            const orderId = orderRes.data.id;

            await axiosInstance.post("http://localhost:8015/api/payments", {
              userId: user.id,
              orderId: orderId,
              rewardId: reward.id,
              amount: totalAmount,
              impUid: rsp.imp_uid,
            });

            alert("결제 완료!");
            navigate("/payment/success");
          } catch (err) {
            alert("서버 등록 실패");
          }
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  };

  if (!reward || !user) return <div className="loading">⏳ 로딩 중...</div>;

  const totalPrice = getTotalPrice();

  return (
    <div className="purchase-wrapper">
      <div className="purchase-left">
        <h2>주문 및 결제</h2>

        <div className="supporter-benefit">
          <div className="benefit-banner">
            <span className="club-badge">CLUB</span>
            <div className="benefit-text">
              <strong>서포터클럽 올인원 특별 혜택</strong>
              <p>3개월 무료체험으로 배송비 할인과 쿠폰팩 받기</p>
            </div>
            <button className="benefit-btn">즉시 할인 받기</button>
          </div>
        </div>

        <div className="product-summary">
          <h3>상품 정보</h3>
          <div className="product-info">
            <div className="product-detail">
              <span>{reward.title}</span>
              <span className="price">{reward.price.toLocaleString()}원</span>
            </div>
          </div>
          <input type="text" placeholder="주문 요청 사항을 입력하세요 (선택)" />
          <div className="privacy-notice">📦 배송 안내: 주말, 공휴일 제외 오전 10시 이전 주문건까지 당일발송이며, 1~2일 소요</div>
        </div>

        <div className="coupon-section">
          <h3>쿠폰</h3>
          <input type="text" value="사용 가능한 쿠폰 0장" disabled />
          <div className="coupon-list">
            <span>🖤 3개월 무료 체험으로 혜택받기</span>
            <button className="benefit-btn">받기</button>
          </div>
        </div>

        <div className="section">
          <h3>서포터 정보</h3>
          <p className="label">익명의 서포터 297</p>
          <p>{user.email}</p>
          <div className="phone-auth">
            <input type="text" placeholder="휴대폰 번호 입력" value={phone} onChange={e => setPhone(e.target.value)} />
            <button className="auth-btn">인증하기</button>
          </div>
          <input type="text" placeholder="특수문자 없이 숫자만 입력해 주세요." className="auth-code-input" />
        </div>

        <div className="section">
          <h3>배송 정보</h3>
          <button className="new-address-btn">신규 배송지 입력</button>
          <input type="text" placeholder="이름을 입력해주세요" value={recipient} onChange={e => setRecipient(e.target.value)} />
          <input type="text" placeholder="번호를 입력해주세요" value={phone} onChange={e => setPhone(e.target.value)} />
          <small className="privacy-notice">와디즈에서는 서포터님의 개인정보 보호를 위해 안심번호를 사용해요.</small>
          <div className="address-row">
            <input type="text" placeholder="우편번호" value={address} onChange={e => setAddress(e.target.value)} />
            <button className="find-address-btn">주소찾기</button>
          </div>
          <input type="text" placeholder="상세 주소 입력" value={addressDetail} onChange={e => setAddressDetail(e.target.value)} />
        </div>

        <div className="payment-methods">
          <h3>결제 수단</h3>
          <label>
            <input type="radio" name="pay-method" /> 간편결제
            <span className="highlight">(가정배달결제)</span>
          </label>
          <label>
            <input type="radio" name="pay-method" /> 신용/체크카드
            <span className="highlight">무이자 할부 안내</span>
          </label>
        </div>
      </div>

      <div className="purchase-right">
        <h3>결제 금액</h3>
        <div className="price-box">
          <div className="row"><span>상품금액</span><span>{reward.price.toLocaleString()}원</span></div>
          <div className="row"><span>배송비</span><span>{reward.shippingFee.toLocaleString()}원</span></div>
          <div className="row"><span>할인 금액</span><span className="discount">-{isDiscountChecked ? discountAmount.toLocaleString() : 0}원</span></div>

          <div className="row total">
            <strong>총 결제 금액</strong>
            <strong>{totalPrice.toLocaleString()}원</strong>
          </div>

          <div className="club-discount">
            <span className="club-badge">CLUB</span>
            <div>
              <p><strong>서포터클럽 올인원 특별 금액</strong></p>
              <small>3개월 무료체험으로 배송비 할인과 쿠폰팩 받기</small>
            </div>
            <div className="checkbox-line">
              <input
                type="checkbox"
                name="discount"
                checked={isDiscountChecked}
                onChange={() => setIsDiscountChecked(prev => !prev)}
              />{" "}
              <span>3,000원 즉시할인 적용</span>
              <div className="final-price">{totalPrice.toLocaleString()}원</div>
            </div>
          </div>
        </div>

        <div className="agreements">
          <label>
            <input
              type="checkbox"
              checked={agree1}
              onChange={() => setAgree1(prev => !prev)}
            /> 결제 진행 필수 동의
          </label>
          <label>
            <input
              type="checkbox"
              checked={agree2}
              onChange={() => setAgree2(prev => !prev)}
            /> 구매조건, 결제 진행 및 결제 대행 서비스 동의 (필수)
          </label>
          <label>
            <input
              type="checkbox"
              checked={agree3}
              onChange={() => setAgree3(prev => !prev)}
            /> 개인정보 제3자 제공 동의 (필수)
          </label>
        </div>

        <button className="pay-button" onClick={handlePurchase}>
          {totalPrice.toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
}

export default PurchasePage;
