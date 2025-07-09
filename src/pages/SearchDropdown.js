// components/SearchDropdown.jsx
import React, { useState } from "react";
import "./SearchDropdown.css";

const categories = [
  {
    icon: "💻",
    name: "테크·가전",
    subcategories: [
      "테크·가전 전체",
      "생활가전",
      "주방가전",
      "스마트가전",
      "DIY",
      "엔터테인먼트가전",
      "웨어러블",
      "주변기기",
      "로봇",
      "App·Web",
    ],
  },
  {
    icon: "👗",
    name: "패션",
    subcategories: ["의류", "잡화", "신발", "패션소품"],
  },
  {
    icon: "💄",
    name: "뷰티",
    subcategories: ["스킨케어", "메이크업", "바디케어"],
  },
  {
    icon: "🏠",
    name: "홈·리빙",
    subcategories: ["인테리어", "청소·세탁", "생활용품"],
  },
  {
    icon: "🥾",
    name: "스포츠·아웃도어",
    subcategories: ["캠핑", "레저", "운동기구"],
  },
  {
    icon: "🍱",
    name: "푸드",
    subcategories: ["간식", "건강식품", "음료", "밀키트"],
  },
  {
    icon: "📚",
    name: "도서",
    subcategories: ["소설", "자기계발", "에세이"],
  },
  {
    icon: "🧑‍🏫",
    name: "전자책·클래스",
    subcategories: ["온라인 강의", "PDF", "디지털 콘텐츠"],
  },
  {
    icon: "🎨",
    name: "디자인",
    subcategories: ["포스터", "브랜딩", "굿즈 디자인"],
  },
  {
    icon: "🐶",
    name: "반려동물",
    subcategories: ["간식", "장난감", "용품"],
  },
  {
    icon: "🖌️",
    name: "아트",
    subcategories: ["회화", "조각", "디지털아트"],
  },
  {
    icon: "🎁",
    name: "캐릭터·굿즈",
    subcategories: ["굿즈", "캐릭터", "피규어"],
  },
  {
    icon: "🎬",
    name: "영화·음악",
    subcategories: ["OST", "DVD", "공연"],
  },
];

const SearchDropdown = ({ onClose }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="search-dropdown">
      {/* 추천 키워드 */}
      <div className="search-tags">
        {[
          "꿈담",
          "마감임박",
          "스토어BEST",
          "패션추천",
          "충전기",
          "건강식품",
          "스킨케어",
          "간식",
          "화장품",
        ].map((tag, i) => (
          <span key={i} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      {/* 본문 영역 */}
      <div className="search-body">
        {/* 최근 검색어 */}
        <div className="recent-search">
          <h4>최근 검색어</h4>
          <button className="clear-btn">전체삭제</button>
        </div>

        {/* 카테고리 */}
        <div className="category-list">
          <h4>카테고리</h4>
          {categories.map((cat, idx) => (
            <div key={idx} className="category-item">
              <div
                className="category-header"
                onClick={() => toggleCategory(idx)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
              </div>
              {openCategory === idx && (
                <div className="subcategory-list">
                  {cat.subcategories.map((sub, subIdx) => (
                    <div key={subIdx} className="subcategory-item">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="search-footer">
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SearchDropdown;
