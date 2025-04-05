# Step 1: Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# Vue.js 애플리케이션 빌드
RUN npm run build

# Step 2: Run Stage (Express.js 사용)
FROM node:18-alpine
WORKDIR /app

# Express.js 의존성 설치
COPY package.json ./
RUN npm install express compression helmet

# 빌드된 파일과 서버 설정 파일 복사
COPY --from=builder /app/dist ./dist
COPY server.js ./

# SSL 인증서를 위한 디렉토리 생성
RUN mkdir -p /etc/nginx/ssl

# 포트 노출
EXPOSE 80 443

# 서버 실행
ENV NODE_ENV=production
CMD ["node", "server.js"]

# 프로덕션 스테이지
FROM nginx:stable-alpine as production-stage

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물을 nginx의 서비스 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 기본 에러 페이지 생성
RUN echo "<!DOCTYPE html><html><head><title>Error</title></head><body><h1>Server Error</h1><p>Sorry, something went wrong.</p></body></html>" > /usr/share/nginx/html/50x.html

# 80, 443 포트 노출
EXPOSE 80 443

# nginx 실행
CMD ["nginx", "-g", "daemon off;"] 