import React from "react";
import { FaHandsHelping, FaBirthdayCake, FaRegMoneyBillAlt, FaChartLine } from 'react-icons/fa';
import './About.css'; // 스타일시트 링크

const About = () => {
  return (
    <div className="about-container">
      {/* About Header */}
      <header className="about-header">
        <h1>꿈담 크라우드펀딩</h1>
        <p>당신의 작은 기부가 큰 변화를 만듭니다.</p>
      </header>

      {/* About Sections */}
      <section className="about-sections">
        <div className="about-card">
          <FaBirthdayCake className="about-icon" />
          <h2>서비스 소개</h2>
          <p>
            꿈담은 팬들이 함께 참여하여 아이돌의 특별한 순간을 기념하는 프로젝트를 실현하는 크라우드펀딩 플랫폼입니다.
            예를 들어, 팬들이 모여 아이돌의 생일을 축하하는 광고나 특별한 이벤트를 기획하고 이를 함께 만들어 나갈 수 있습니다.
          </p>
        </div>

        <div className="about-card">
          <FaHandsHelping className="about-icon" />
          <h2>어떻게 참여하나요?</h2>
          <ul>
            <li>1. 좋아하는 아이돌의 프로젝트를 찾아보세요.</li>
            <li>2. 참여하고 싶은 금액을 선택하세요.</li>
            <li>3. 펀딩이 완료되면 프로젝트가 현실화되는 모습을 지켜보세요!</li>
          </ul>
        </div>

        <div className="about-card">
          <FaRegMoneyBillAlt className="about-icon" />
          <h2>우리의 비전</h2>
          <p>
            꿈담은 팬들이 힘을 합쳐 아이돌의 특별한 순간을 축하하고 의미 있는 방법으로 기념할 수 있도록 돕습니다.
            작은 기부가 모여 대규모 프로젝트로 실현되는 과정을 경험하며, 팬들의 열정이 결실을 맺는 순간을 함께합니다.
          </p>
        </div>

        <div className="about-card">
          <FaChartLine className="about-icon" />
          <h2>성공적인 프로젝트</h2>
          <p>
            꿈담에서는 이미 여러 팬들의 참여로 성공적인 프로젝트가 이루어졌습니다. 예를 들어, 한 아이돌의 생일을 축하하는
            대규모 지하철 광고 프로젝트가 1000명의 팬들의 기부로 완성되었습니다. 작은 기부들이 모여 큰 변화를 이끌어낸 사례입니다.
          </p>
        </div>
      </section>

      {/* 참여 혜택 및 펀딩 옵션 */}
      <section className="about-sections">
        <div className="about-card">
          <FaHandsHelping className="about-icon" />
          <h2>펀딩 옵션</h2>
          <p>
            꿈담은 다양한 펀딩 옵션을 제공하여 참여자들에게 더 많은 선택지를 드립니다.
            팬들은 개인적인 기부 외에도 여러 가지 리워드를 선택하여 더 큰 기여를 할 수 있습니다.
          </p>
          <ul>
            <li>1. 일반 펀딩: 참여 금액에 따라 다양한 리워드를 제공합니다.</li>
            <li>2. VIP 펀딩: 특별한 혜택과 기념품을 제공합니다.</li>
            <li>3. 기업 후원: 기업들이 대규모로 참여하여 프로젝트를 지원할 수 있습니다.</li>
          </ul>
        </div>

        <div className="about-card">
          <FaChartLine className="about-icon" />
          <h2>투명한 펀딩 과정</h2>
          <p>
            꿈담은 투명하고 신뢰할 수 있는 펀딩 과정을 제공합니다. 모든 펀딩 내역은 실시간으로 업데이트되며,
            참여자들은 언제든지 프로젝트 진행 상황을 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="about-footer">
        <p>Copyright © 2025 꿈담 크라우드펀딩</p>
      </footer>
    </div>
  );
};

export default About;
