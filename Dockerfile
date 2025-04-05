# Build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

# Node.js 설치
RUN apk add --update nodejs npm

# 작업 디렉토리 설정
WORKDIR /app

# 서버 의존성 설치
COPY package*.json ./
RUN npm install express compression helmet node-fetch

# 빌드된 파일과 서버 설정 파일 복사
COPY --from=build-stage /app/dist ./dist
COPY server.js ./

# 환경변수 설정
ENV PORT=8083
ENV NODE_ENV=production

# 포트 노출
EXPOSE 8083

# 서버 실행
CMD ["node", "server.js"] 