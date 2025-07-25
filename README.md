🎨 프론트엔드 소개 - 꿈담(ggumdam-front)
꿈담은 창작자와 소비자가 함께 만들어가는 크라우드 펀딩 기반 웹 플랫폼입니다. 프론트엔드는 사용자 경험 중심으로 구성되었으며, React 기반으로 페이지별 컴포넌트 구조를 명확히 분리하여 유지보수성과 확장성을 고려해 개발했습니다.

🛠 기술 스택
React: 컴포넌트 기반 UI 라이브러리

React Router DOM: SPA 라우팅 처리

Axios: 백엔드 API 통신

CSS Modules: 페이지별 스타일링 관리

JWT: 로그인 상태 및 인증 유지

LocalStorage: 사용자 토큰 저장

📁 폴더 구조 및 주요 컴포넌트
/src/pages/ 디렉토리 기준 주요 페이지별 구성은 다음과 같습니다:

🔐 인증 관련
Login.js, LoginModal.js: 로그인 기능, JWT 토큰 저장

Register.js: 회원가입 처리

axiosInstance.js: 토큰이 필요한 요청에 대해 Axios 인터셉터로 자동 헤더 처리

🏠 메인 & 검색
Home.js, HomeSliderSection.js: 메인 슬라이더 구성

SearchDropdown.js, SearchResults.js: 자동완성 검색 드롭다운 및 결과 페이지 구현

🎁 펀딩/리워드
FreeOrder.js, FreeOrderDetails.js: 프리오더 상품 상세 및 주문

FundingPlus.js, FundingPlusDetails.js: 추가 펀딩형 상품 상세

PurchasePage.js: 리워드 구매 결제 페이지

👤 마이페이지 및 기타
Project.js, ProjectDetail.js, CreateProject.js: 창작자 프로젝트 생성/관리

Cart.js: 장바구니 기능

🌟 핵심 기능 및 기여 포인트
✅ 검색 API 통합

백엔드와 연동하여 실시간 검색 결과 자동완성 구현

키워드 기반 SearchResults 페이지 연동

✅ JWT 기반 로그인 유지

Axios 인터셉터로 AccessToken 자동 주입

로그인 여부에 따라 찜하기/공유하기 노출

✅ 찜하기, 공유하기 UI 구현

Wadiz 스타일에 맞춘 레이아웃

좋아요 버튼 및 카카오 공유 연동 준비

✅ 페이지 스타일링

Wadiz를 레퍼런스로 사용자 친화적 UI 구현

컴포넌트 단위로 .css 분리하여 유지보수 편의성 확보

🧠 회고
React 기반의 구조화된 컴포넌트 설계와 페이지별 상태 관리에 집중했습니다. 또한 RESTful API 설계에 맞춰 사용자 요청 흐름을 자연스럽게 연결했고, 검색과 결제 흐름을 유저 중심으로 설계해 실제 사용성과 만족도를 고려했습니다.
프론트와 백엔드 연동 과정에서 실시간 상태 변화(찜하기, 결제 등)를 고려해 비동기 처리를 명확하게 분리한 점도 큰 성과였습니다.
