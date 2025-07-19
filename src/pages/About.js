import React from "react";
import { FaHandsHelping, FaLightbulb, FaRegMoneyBillAlt, FaChartLine } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* About Header */}
      <header className="about-header">
        <h1>꿈담 크라우드펀딩</h1>
        <p>아이디어를 현실로 만드는 가장 쉬운 방법</p>
      </header>

      {/* About Sections */}
      <section className="about-sections">
        <div className="about-card">
          <FaLightbulb className="about-icon" />
          <h2>서비스 소개</h2>
          <p>
            꿈담은 창작자, 스타트업, 사회적 프로젝트 등이 자금을 모아 아이디어를 실현할 수 있도록 돕는 크라우드펀딩 플랫폼입니다.
            누구나 프로젝트를 등록하고, 누구나 후원할 수 있으며, 세상에 긍정적인 변화를 만드는 데 함께할 수 있습니다.
          </p>
        </div>

        <div className="about-card">
          <FaHandsHelping className="about-icon" />
          <h2>어떻게 참여하나요?</h2>
          <ul>
            <li>1. 다양한 프로젝트 중 관심 있는 것을 찾아보세요.</li>
            <li>2. 펀딩 금액과 리워드를 선택하세요.</li>
            <li>3. 프로젝트가 목표를 달성하면 창작자가 아이디어를 실현합니다.</li>
          </ul>
        </div>

        <div className="about-card">
          <FaRegMoneyBillAlt className="about-icon" />
          <h2>우리의 비전</h2>
          <p>
            꿈담은 창의적인 아이디어가 자금 부족으로 사라지지 않도록, 누구나 공정하게 도전하고 실현할 수 있는 기회를 제공합니다.
            당신의 후원이 또 하나의 혁신을 만들어갑니다.
          </p>
        </div>

        <div className="about-card">
          <FaChartLine className="about-icon" />
          <h2>성공적인 프로젝트</h2>
          <p>
            이미 수많은 창작자와 기업들이 꿈담을 통해 자신의 프로젝트를 성공적으로 실현해 왔습니다.
            예를 들어, 지역 농부의 가공식품 브랜드가 500명의 후원으로 전국 유통망을 갖추게 되었습니다.
          </p>
        </div>
      </section>

      {/* 참여 혜택 및 펀딩 옵션 */}
      <section className="about-sections">
        <div className="about-card">
          <FaHandsHelping className="about-icon" />
          <h2>펀딩 옵션</h2>
          <p>
            꿈담은 다양한 방식의 참여 기회를 제공합니다.
            후원자는 리워드를 선택할 수도 있고, 순수 기부 형식으로도 참여할 수 있습니다.
          </p>
          <ul>
            <li>1. 리워드형 펀딩: 금액에 따라 제품이나 혜택을 제공합니다.</li>
            <li>2. 기부형 펀딩: 보상 없이 프로젝트를 순수 후원합니다.</li>
            <li>3. 기업 후원: 사회적 가치를 추구하는 기업이 프로젝트를 공식 후원합니다.</li>
          </ul>
        </div>

        <div className="about-card">
          <FaChartLine className="about-icon" />
          <h2>투명한 펀딩 과정</h2>
          <p>
            모든 프로젝트는 실시간으로 펀딩 진행 상황을 공개하며,
            후원자는 프로젝트 현황, 예산 사용 계획, 결과 보고 등을 쉽게 확인할 수 있습니다.
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
