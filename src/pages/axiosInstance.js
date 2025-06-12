// src/api/axiosInstance.js
import axios from "axios";

let isRefreshing = false;
let refreshSubscribers = [];

// 토큰 갱신이 완료되면, 대기 중인 요청에 새로운 토큰을 전달하는 콜백 호출
const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// 토큰 갱신을 기다리는 요청들을 큐에 추가
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // 쿠키 기반 인증 사용 시 필요 (필요 없다면 false 또는 삭제)
});

// 요청 인터셉터: accessToken이 있으면 헤더에 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 Unauthorized 시 accessToken 갱신 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이며, 재시도가 아직 안된 요청인지 확인
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 리프레시 토큰이 없으면 바로 로그인 페이지로 이동
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(new Error("No refresh token available"));
      }

      // 이미 리프레시 토큰 갱신 중이면 대기열에 요청 추가
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // 리프레시 토큰 갱신 시도
      isRefreshing = true;
      try {
        const { data } = await axiosInstance.post("/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        onRefreshed(newAccessToken);

        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        console.error("Refresh token failed:", refreshError);
        // 리프레시 실패 시 로그인 페이지로 강제 이동
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
