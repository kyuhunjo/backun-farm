import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const baseURL = isDevelopment ? '/api' : 'https://hs-api.imjoe24.com/api';

console.log('=== API 설정 ===');
console.log('Mode:', import.meta.env.MODE);
console.log('Base URL:', baseURL);
console.log('===============');

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Headers:', config.headers);
    if (config.data) {
      console.log('Data:', config.data);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    console.log('Data:', response.data);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error);
    return Promise.reject(error);
  }
);

// 직매장 관련 API 함수들
export const storeAPI = {
  // 전체 직매장 목록 조회
  getAllStores() {
    return api.get('/stores');
  },

  // 지역별 직매장 검색
  getStoresByRegion(region, district) {
    return api.get('/stores/region', {
      params: {
        region,
        district
      }
    });
  },

  // 직매장 상세 정보 조회
  getStoreById(id) {
    return api.get(`/stores/${id}`);
  },

  // 직매장 검색
  searchStores(keyword) {
    return api.get('/stores/search', {
      params: {
        keyword
      }
    });
  }
};

// 통계 관련 API 함수들
export const statsAPI = {
  // 지역별 통계 조회
  getRegionStats() {
    return api.get('/stats/region');
  }
};

export default api; 