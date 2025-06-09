import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import About from './pages/About'; // About 페이지 import
import FreeOrder from "./pages/FreeOrder"; // 위치에 따라 수정
import FreeOrderDetails from './pages/FreeOrderDetails'; // 상세 컴포넌트 추가
import PurchasePage from './pages/PurchasePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/about" element={<About />} /> {/* 수정된 부분 */}
        <Route path="/freeOrder" element={<FreeOrder />} />
        <Route path="/free-orders/:id" element={<FreeOrderDetails />} />
        <Route path="/purchase" element={<PurchasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
