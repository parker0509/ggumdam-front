import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goalAmount: "",
    imageUrl: "",
    tags: "", // 태그는 문자열로 입력받고, 나중에 배열로 변환
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 토큰을 주석 처리한 부분
    /*
    const token = localStorage.getItem("token"); // ✅ 로그인 후 저장된 토큰 가져오기
    const tagsArray = formData.tags.split(",").map(tag => tag.trim()); // 태그 배열로 변환
    */

    try {
      const response = await axios.post(
        "http://localhost:8006/api/projects",
        {
          name: formData.name,
          description: formData.description,
          goalAmount: formData.goalAmount,
          imageUrl: formData.imageUrl,
          tags: formData.tags.split(",").map(tag => tag.trim()), // 태그 배열로 변환
        },
        {
          // 주석 처리된 토큰 헤더 부분
          /*
          headers: {
            Authorization: `Bearer ${token}`, // ✅ 토큰을 Authorization 헤더에 포함
          },
          */
        }
      );

      console.log("프로젝트 등록 성공:", response.data);
      alert("프로젝트가 성공적으로 등록되었습니다.");
      navigate("/"); // 등록 후 홈으로 이동 (원하는 경로로 바꿔도 됨)
    } catch (error) {
      console.error("프로젝트 등록 오류:", error);
      alert("프로젝트 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">새 프로젝트 만들기</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label">프로젝트 이름</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">설명</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">목표 금액 (원)</label>
          <input
            type="number"
            className="form-control"
            name="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">이미지 URL (선택)</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">태그</label>
          <input
            type="text"
            className="form-control"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="태그를 쉼표로 구분해서 입력"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          프로젝트 등록
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
