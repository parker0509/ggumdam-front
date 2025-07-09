import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeSliderSection.css";

const HomeSliderSection = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4; // 한 페이지에 4개 카드

  const nextSlide = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(projects.length / cardsPerPage) - 1 ? prev + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentPage((prev) =>
      prev > 0 ? prev - 1 : Math.ceil(projects.length / cardsPerPage) - 1
    );
  };

  useEffect(() => {
    axios
      .get("/api/funding-orders")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.error("데이터 로딩 실패", err));
  }, []);

  return (
    <section className="dream-slider-section">
      <div className="dream-slider-text">
        <h2>
          꿈담을 통해<br />
          <span>전시를 홍보하다</span>
        </h2>
        <p>
          꿈담은 새로운 도전을 만드는 모든 분들을 <strong>메이커</strong>라고
          부릅니다
        </p>
      </div>

      <div className="dream-slider-wrapper">
        <button className="arrow left" onClick={prevSlide}>
          ‹
        </button>

        <div className="slider-container-wrapper">
          <div
            className="slider-container"
            style={{
              transform: `translateX(-${currentPage * (100 / cardsPerPage)}%)`,
            }}
          >
            {Array.from({
              length: Math.ceil(projects.length / cardsPerPage),
            }).map((_, pageIndex) => {
              const startIdx = pageIndex * cardsPerPage;
              const pageItems = projects.slice(startIdx, startIdx + cardsPerPage);

              return (
                <div className="slider-page" key={pageIndex}>
                  {pageItems.map((project, idx) => (
                    <div className="slider-card" key={idx}>
                      <img
                        src={project.imageUrl || "/images/default.jpg"}
                        alt={project.productName}
                      />
                      <div className="overlay">
                        <div className="card-info">
                          <small>{project.productName}</small>
                          <h3>
                            {project.goalAmount
                              ? project.goalAmount + " 참여해보세요!"
                              : project.participants + "명 참여"}
                          </h3>
                          <p>{project.shortDescription || "간단한 설명 문구"}</p>

                          <div className="tags">
                            {(project.tags || "")
                              .split(",")
                              .map((tag, i) => (
                                <span key={i}>#{tag.trim()}</span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <button className="arrow right" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="dots">
        {Array.from({ length: Math.ceil(projects.length / cardsPerPage) }).map(
          (_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(idx)}
            ></span>
          )
        )}
      </div>
    </section>
  );
};

export default HomeSliderSection;
