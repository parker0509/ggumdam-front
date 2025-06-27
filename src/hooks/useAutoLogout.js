// src/hooks/useAutoLogout.js

import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export default function useAutoLogout() {
  useEffect(() => {
    console.log("✅ useAutoLogout 실행됨");
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expTime = decoded.exp * 1000; // ms 단위로 변환
      const currentTime = Date.now();
      const timeout = expTime - currentTime;

      if (timeout <= 0) {
        logout();
      } else {
        const timerId = setTimeout(() => {
          logout();
        }, timeout);

        // 컴포넌트 언마운트 시 타이머 클리어
        return () => clearTimeout(timerId);
      }
    } catch (err) {
      console.error("토큰 파싱 실패:", err);
      logout();
    }

    function logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("세션이 만료되어 로그아웃되었습니다.");
      window.location.href = "/login";
    }
  }, []);
}
