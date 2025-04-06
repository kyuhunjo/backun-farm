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

// Groq API 설정
export const groqApi = axios.create({
  baseURL: 'https://api.groq.com/openai/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY || ''}`
  }
});

// API 키 확인 로깅
console.log('Groq API Key 설정 여부:', !!import.meta.env.VITE_GROQ_API_KEY);

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

export default api;