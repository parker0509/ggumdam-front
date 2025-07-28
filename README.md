
## 🎨 프론트엔드 - 꿈담(Ggumdam-Front)
 
 <img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/4f466b04-4d10-4848-a956-3d9130123892" />
 <img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/83214442-9e67-423f-a9a3-692382b2ad7d" />



---

## 🛠️ 기술 스택

* **React**: 컴포넌트 기반 UI 라이브러리 활용
* **React Router DOM**: SPA(Single Page Application) 라우팅 처리
* **Axios**: 백엔드 API 통신
* **CSS Modules**: 페이지별 스타일링 격리 및 관리
* **JWT**: 로그인 상태 및 사용자 인증 유지
* **LocalStorage**: 사용자 토큰(Token) 저장

--

### 🔐 인증 관련

* `Login.js`, `LoginModal.js`: 로그인 기능 구현 및 JWT 토큰 저장
* `Register.js`: 회원가입 처리
* `axiosInstance.js`: 토큰이 필요한 요청에 대해 **Axios 인터셉터를 활용하여 자동 헤더 처리**

### 🏠 메인 & 검색

* `Home.js`, `HomeSliderSection.js`: 메인 페이지 슬라이더 구성
* `SearchDropdown.js`, `SearchResults.js`: **자동완성 검색 드롭다운 및 결과 페이지 구현**
<img width="908" height="487" alt="image" src="https://github.com/user-attachments/assets/67c5f51e-19a2-4dd5-93a2-1d346cff6882" />

### 🎁 펀딩/리워드

* `FreeOrder.js`, `FreeOrderDetails.js`: 프리오더 상품 상세 및 주문
* `FundingPlus.js`, `FundingPlusDetails.js`: 추가 펀딩형 상품 상세
* `PurchasePage.js`: 리워드 구매 결제 페이지
 
<img width="1048" height="633" alt="image" src="https://github.com/user-attachments/assets/7eda6118-fb75-4f77-87d2-09b7c79e8624" />

---

## 🌟 핵심 기능 및 기여 포인트

### ✅ 검색 API 통합

* 백엔드와 연동하여 **실시간 검색 결과 자동완성 기능**을 구현했습니다.
* 키워드 기반으로 `SearchResults` 페이지와 연동하여 검색 경험을 강화했습니다.

<img width="1000" height="600" alt="image" src="https://github.com/user-attachments/assets/a4624058-7d37-4538-946f-7c44b9cec058" />


### ✅ JWT 기반 로그인 유지

* **Axios 인터셉터를 사용하여 AccessToken을 모든 요청에 자동으로 주입**하도록 설정했습니다.
* 사용자의 로그인 여부에 따라 **찜하기/공유하기 버튼의 노출을 제어**했습니다.

<img width="1000" height="600" alt="image" src="https://github.com/user-attachments/assets/97fddebd-9c90-4722-bf4e-ad72493b21a8" />


### ✅ 찜하기, 공유하기 UI 구현

* 좋아요 버튼 및 **카카오 공유 연동**을 준비했습니다.

### ✅ 페이지 스타일링

* **컴포넌트 단위로 `.css` 파일을 분리**하여 스타일의 독립성을 확보하고 유지보수 편의성을 높였습니다.

---

## 🧠 회고

이 프로젝트에서 저는 **React 기반의 구조화된 컴포넌트 설계와 페이지별 상태 관리에 집중**했습니다. 또한, **RESTful API 설계에 맞춰 사용자 요청 흐름을 자연스럽게 연결**했으며, 특히 **검색과 결제 흐름을 유저 중심으로 설계하여 실제 사용성과 만족도를 고려**했습니다. 프론트엔드와 백엔드 연동 과정에서는 실시간 상태 변화(찜하기, 결제 등)를 고려해 **비동기 처리를 명확하게 분리**한 점도 큰 성과였습니다.

