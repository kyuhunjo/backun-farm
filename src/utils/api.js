import axios from 'axios';

const getBaseUrl = () => {
  // 프로덕션 환경
  if (import.meta.env.PROD) {
    return 'https://hs-api.imjoe24.com/api'
  }
  
  // 개발 환경
  return '/api'
}

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 일출/일몰 API 호출 시에만 로그 출력
    if (config.url?.includes('sunrise')) {
      console.log(`[일출/일몰 API 요청] ${config.method?.toUpperCase()} ${config.url}`);
      if (config.params) {
        console.log('Parameters:', config.params);
      }
    }
    return config;
  },
  (error) => {
    if (error.config?.url?.includes('sunrise')) {
      console.error('[일출/일몰 API 요청 오류]', error);
    }
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 일출/일몰 API 응답 시에만 로그 출력
    if (response.config.url?.includes('sunrise')) {
      console.log(`[일출/일몰 API 응답] ${response.status}`);
      console.log('Data:', response.data);
    }
    return response;
  },
  (error) => {
    if (error.config?.url?.includes('sunrise')) {
      console.error('[일출/일몰 API 응답 오류]', error);
    }
    return Promise.reject(error);
  }
);

// 직매장 관련 API 함수들
export const storeAPI = {
  // 전체 직매장 목록 조회
  getAllStores() {
    return api.get('/local-food/stores');
  },

  // 지역별 직매장 검색
  getStoresByRegion(region, district) {
    return api.get('/local-food/stores/region', {
      params: {
        region,
        district
      }
    });
  },

  // 직매장 상세 정보 조회
  getStoreById(id) {
    return api.get(`/local-food/stores/${id}`);
  },

  // 직매장 검색
  searchStores(keyword) {
    return api.get('/local-food/stores/search', {
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

// Groq API 설정
export const groqApi = axios.create({
  baseURL: 'https://api.groq.com/openai/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY || ''}`
  }
});

export const chatWithAI = async (message, context = []) => {
  try {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error('Groq API 키가 설정되지 않았습니다.');
    }

    // 시스템 프롬프트 설정
    const systemMessage = {
      role: "system",
      content: `당신은 전라남도 화순군에 위치한 백운마을의 AI 도우미입니다.

백운마을 정보:
- 위치: 전라남도 화순군 청풍면 백운길
- 특징: 해발 400m의 고지대에 위치한 청정 산간마을
- 주요 작물: 고사리, 더덕, 곶감 등 산간 특산물
- 자연환경: 깨끗한 공기, 맑은 물, 울창한 산림으로 둘러싸인 전형적인 산촌마을
- 체험 프로그램: 농촌체험, 귀농체험, 산나물 채취, 곶감 만들기 등

마을의 특산물, 관광 정보, 직매장, 농산물, 체험 프로그램 등에 대해 친절하고 상세하게 안내해주세요.
항상 한국어로 응답하며, 존댓말을 사용합니다.
지역 특성과 계절성을 고려하여 적절한 정보를 제공해주세요.`
    };

    // 대화 히스토리 포맷팅
    const messages = [
      systemMessage,
      ...context.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text
      })),
      {
        role: "user",
        content: message
      }
    ];

    const response = await groqApi.post('/chat/completions', {
      model: 'llama-3.2-90b-vision-preview',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
      stream: false
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI 응답 오류:', error);
    throw new Error('AI 응답을 받아오는데 실패했습니다.');
  }
};

// 대기질 관련 API 함수들
export const airQualityAPI = {
  // 현재 대기질 정보 조회
  getCurrentAirQuality() {
    return api.get('air-quality/current');
  },

  // 전체 측정소 데이터 조회
  async getAllStations() {
    try {
      const response = await api.get('air-quality/all');
      return response.data;
    } catch (error) {
      console.error('전체 측정소 데이터 조회 중 오류:', error);
      throw error;
    }
  }
};

// 요양시설 관련 API 함수들
export const facilitiesAPI = {
  // 전체 시설 목록 조회
  async getAllFacilities() {
    try {
      const response = await api.get('/facilities');
      return response.data;
    } catch (error) {
      console.error('전체 시설 목록 조회 중 오류:', error);
      throw error;
    }
  },

  // 주변 시설 검색
  async searchNearbyFacilities(latitude, longitude, radius = 5) {
    try {
      const response = await api.get('/facilities/search', {
        params: { latitude, longitude, radius }
      });
      return response.data;
    } catch (error) {
      console.error('주변 시설 검색 중 오류:', error);
      throw error;
    }
  }
};

// 날씨 관련 API 함수들
export const weatherAPI = {
  // 현재 날씨 조회
  getCurrentWeather() {
    return api.get('weather/current');
  },

  // 날씨 예보 조회
  getForecast() {
    return api.get('weather/forecast');
  },

  // 일출/일몰 시간 조회
  getSunriseSunset: async (date) => {
    try {
      // 화순 좌표 (126.9833330, 35.0666660)
      const params = {
        longitude: '12659',  // 126도 59분
        latitude: '3503',    // 35도 3분
        locdate: date
      }
      const { data } = await api.get('/sunrise/current', { params })
      return data
    } catch (error) {
      console.error('일출/일몰 데이터 조회 실패:', error)
      throw error
    }
  }
};

// 농림축산식품부 뉴스 관련 API 함수들
export const newsAPI = {
  // 뉴스 목록 조회
  getNews: async () => {
    try {
      const response = await api.get('/mafra/news');
      return response.data;
    } catch (error) {
      console.error('농림축산식품부 뉴스 조회 실패:', error);
      throw error;
    }
  }
};

// 일손모집 관련 API 함수들
export const jobsAPI = {
  // 전체 일손모집 목록 조회
  getAllJobs() {
    return api.get('/jobs')
  },

  // 일손모집 등록
  createJob(jobData) {
    return api.post('/jobs', jobData)
  },

  // 일손모집 수정
  updateJob(id, jobData) {
    return api.put(`/jobs/${id}`, jobData)
  },

  // 일손모집 상태 변경
  updateJobStatus(id, status) {
    return api.patch(`/jobs/${id}/status`, { status })
  },

  // 일손모집 삭제
  deleteJob(id) {
    return api.delete(`/jobs/${id}`)
  }
}

const apiObject = {
  storeAPI,
  statsAPI,
  airQualityAPI,
  facilitiesAPI,
  weatherAPI,
  newsAPI,
  jobsAPI
};

export default apiObject;