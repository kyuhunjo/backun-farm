# Build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine as production-stage
WORKDIR /app

# 프론트엔드 서버 의존성 설치
COPY package*.json ./
RUN npm ci --production

# 빌드된 파일 복사
COPY --from=build-stage /app/dist ./dist
COPY server.js ./

# 환경변수 설정
ENV PORT=8083
ENV NODE_ENV=production

# 포트 노출
EXPOSE 8083

# 서버 실행
CMD ["node", "server.js"]