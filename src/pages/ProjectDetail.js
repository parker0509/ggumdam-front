import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Project.css";

const ProjectDetail = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/projects/${id}`)
      .then((response) => setProject(response.data))
      .catch((error) => console.error("프로젝트 정보를 불러오는 중 오류 발생:", error));
  }, [id]);

  if (!project) return <p className="loading">프로젝트 정보를 불러오는 중...</p>;

  return (
    <div className="project-detail">
      <h2>{project.name}</h2>
      <img src={project.imageUrl || "https://via.placeholder.com/600"} alt={project.name} className="detail-image" />
      <p>{project.description}</p>
      <p className="goal">목표 금액: {project.goalAmount.toLocaleString()} 원</p>
      <p className="raised">현재 모금액: {project.raisedAmount.toLocaleString()} 원</p>
      <p className="status">상태: {project.status}</p>
    </div>
  );
};

export default ProjectDetail;
