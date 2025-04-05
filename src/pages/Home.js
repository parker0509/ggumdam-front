import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Project from "./Project"; // ✅ 추가

const Home = () => {
  return (
    <>
      {/* 네비게이션 바 */}
     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2">
       <div className="container d-flex justify-content-between align-items-center">
         <Link className="navbar-brand fw-bold" to="/">CrowdFund</Link>
         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                 aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNav">
           <ul className="navbar-nav me-auto gap-3">
             <li className="nav-item"><Link className="nav-link" to="/about">소개</Link></li>
             <li className="nav-item"><Link className="nav-link" to="/projects">프로젝트 둘러보기</Link></li>
           </ul>
           <ul className="navbar-nav d-flex align-items-center gap-2">
             <li className="nav-item"><Link className="nav-link btn btn-primary text-white px-3" to="/create-project">프로젝트 만들기</Link></li>
             <li className="nav-item"><Link className="nav-link" to="/login">로그인</Link></li>
           </ul>
         </div>
       </div>
     </nav>

      {/* Hero Section */}
      <section className="hero d-flex flex-column align-items-center justify-content-center text-center py-5">
        <h1 className="fw-bold">당신의 아이디어를 현실로</h1>
        <p className="mt-2">크라우드 펀딩을 통해 꿈을 실현하세요.</p>
        <Link to="/projects" className="btn btn-primary mt-3 px-4 py-2">프로젝트 시작하기</Link>
      </section>

      {/* ✅ 프로젝트 목록 컴포넌트 추가 */}
      <Project />

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center p-3 mt-5">
        <p>&copy; 2024 CrowdFund. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;
