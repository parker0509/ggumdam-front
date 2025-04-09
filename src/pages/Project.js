import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Project.css"; // 스타일 적용

const Project = () => {
  const [projects, setProjects] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem("token"); // 👉 저장된 JWT 토큰 꺼내오기

      axios.get("http://localhost:8080/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`, // 👉 Authorization 헤더에 토큰 추가
        },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("프로젝트 데이터를 불러오는 중 오류 발생:", error));
    }, []);

  return (
    <div className="project-container">
      <div className="project-header">
        <h2 className="project-title">프로젝트 목록</h2>
        <Link to="/create-project" className="create-button">+ 프로젝트 만들기</Link>
      </div>

      <div className="project-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.imageUrl || "https://via.placeholder.com/300"} alt={project.name} className="project-image" />
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="goal">목표 금액: {project.goalAmount.toLocaleString()} 원</p>
                <Link to={`/projects/${project.id}`} className="details-button">자세히 보기</Link>
              </div>
            </div>
          ))
        ) : (
          <p>등록된 프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Project;
