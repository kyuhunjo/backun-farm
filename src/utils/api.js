import axios from 'axios';

const isDev = import.meta.env.MODE === 'development';
const baseURL = isDev
  ? '/api'  // 개발 환경: Vite 프록시 사용
  : '/api'; // 배포 환경: Express 프록시 사용

console.log('=== API 설정 정보 ===');
console.log('API Mode:', import.meta.env.MODE);
console.log('API Base URL:', baseURL);
console.log('환경변수:', import.meta.env);
console.log('==================');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 타임아웃 설정
  timeout: 10000,
  // CORS 설정
  withCredentials: false
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('=== API 요청 상세 정보 ===');
    console.log('전체 URL:', config.baseURL + config.url);
    console.log('메소드:', config.method.toUpperCase());
    console.log('헤더:', config.headers);
    console.log('데이터:', config.data);
    console.log('========================');
    return config;
  },
  (error) => {
    console.error('API 요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('=== API 응답 상세 정보 ===');
    console.log('상태:', response.status);
    console.log('URL:', response.config.url);
    console.log('데이터:', response.data);
    console.log('========================');
    return response;
  },
  (error) => {
    console.error('=== API 에러 상세 정보 ===');
    if (error.response) {
      console.error('상태:', error.response.status);
      console.error('데이터:', error.response.data);
      console.error('헤더:', error.response.headers);
    } else if (error.request) {
      console.error('요청은 보냈으나 응답을 받지 못함:', error.request);
    } else {
      console.error('요청 설정 중 에러 발생:', error.message);
    }
    console.error('전체 에러 객체:', error);
    console.error('========================');
    return Promise.reject(error);
  }
);

export default api; 