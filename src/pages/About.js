import React from "react";
import { FaHandsHelping, FaBirthdayCake, FaRegMoneyBillAlt } from 'react-icons/fa';
import "./About.css"; // 스타일시트 링크

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>우리의 크라우드펀딩 서비스</h1>
        <p>당신의 작은 기부가 큰 변화를 만듭니다.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <FaBirthdayCake className="section-icon" />
          <h2>서비스 소개</h2>
          <p>
            우리 서비스는 다양한 아이돌 이벤트를 위한 크라우드펀딩 플랫폼입니다.
            예를 들어, 팬들이 모여 아이돌의 생일을 축하하는 지하철 광고를 기획하고,
            그 비용을 펀딩하여 현실화하는 프로젝트입니다.
          </p>
        </section>

        <section className="about-section">
          <FaHandsHelping className="section-icon" />
          <h2>어떻게 참여하나요?</h2>
          <ul>
            <li>1. 좋아하는 아이돌의 프로젝트를 찾아보세요.</li>
            <li>2. 참여하고 싶은 금액을 선택하세요.</li>
            <li>3. 펀딩 완료 후, 프로젝트가 실현되는 모습을 함께 지켜보세요!</li>
          </ul>
        </section>

        <section className="about-section">
          <FaRegMoneyBillAlt className="section-icon" />
          <h2>우리의 비전</h2>
          <p>
            팬들이 힘을 합쳐, 아이돌의 특별한 순간을 기념할 수 있는 의미 있는 방법을 제공합니다.
            작은 기부가 모여 더 큰 프로젝트로 실현되며, 팬들의 열정이 결과로 이어집니다.
          </p>
        </section>
      </div>

      <div className="about-footer">
        <p>Copyright © 2025 우리 크라우드펀딩</p>
      </div>
    </div>
  );
};

export default About;
