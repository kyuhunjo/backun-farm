import axios from 'axios'

const getBaseUrl = () => {
  // 프로덕션 환경
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_BASE_URL || 'https://api.backun-farm.com/api'
  }
  
  // 개발 환경
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const port = '3000'
  return `${protocol}//${hostname}:${port}/api`
}

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10초 타임아웃 설정
})

// 요청 인터셉터 추가
api.interceptors.request.use(
  config => {
    // 요청 전에 수행할 작업
    return config
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => response,
  error => {
    let errorMessage = '서버와의 통신에 실패했습니다.'
    
    if (!error.response) {
      // 네트워크 오류 또는 서버 응답 없음
      errorMessage = '네트워크 연결을 확인해주세요.'
    } else {
      // HTTP 상태 코드에 따른 메시지
      switch (error.response.status) {
        case 400:
          errorMessage = '잘못된 요청입니다.'
          break
        case 401:
          errorMessage = '인증이 필요합니다.'
          break
        case 403:
          errorMessage = '접근이 거부되었습니다.'
          break
        case 404:
          errorMessage = '요청한 데이터를 찾을 수 없습니다.'
          break
        case 500:
          errorMessage = '서버 오류가 발생했습니다.'
          break
      }
    }
    
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    })
    
    return Promise.reject({
      ...error,
      userMessage: errorMessage
    })
  }
) 