# 백운마을 귀농체험

화순군 백운마을의 귀농 체험 프로그램을 소개하는 웹사이트입니다.

## 기술 스택

- Vue 3
- Vuetify 3
- Vue Router
- Vite
- Express
- OpenWeatherMap API

## 환경 설정

### 로컬 개발 환경

1. 프로젝트 클론 및 종속성 설치
```bash
# 프로젝트 클론
git clone [repository-url]

# 종속성 설치
npm install
```

2. 환경 변수 설정
```bash
# .env.example 파일을 .env로 복사
cp .env.example .env

# .env 파일에 OpenWeatherMap API 키 설정
# WEATHER_API_KEY=your_api_key_here
```

3. 개발 서버 실행
```bash
# 백엔드 서버 실행 (첫 번째 터미널)
node server.js

# 프론트엔드 개발 서버 실행 (두 번째 터미널)
npm run dev
```

### 프로덕션 배포

프로덕션 환경에서는 Jenkins를 통해 배포되며, 환경 변수는 Jenkins Credentials에서 관리됩니다.

1. Jenkins Credentials 설정
   - `WEATHER_API_KEY`: OpenWeatherMap API 키
   - Jenkinsfile에서 자동으로 환경 변수를 주입

2. 배포
```bash
# 프로덕션 빌드
npm run build
```

## 주요 기능

- 귀농 준비 가이드
- 지역별 정보 제공
- 실시간 날씨 정보
- 성공 사례 소개
- 문의하기
- 관련 기관 링크

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── views/          # 페이지 컴포넌트
├── router/         # 라우팅 설정
├── plugins/        # Vuetify 설정
└── App.vue         # 루트 컴포넌트
```

## 라이선스

MIT License 