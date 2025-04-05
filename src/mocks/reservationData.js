export const reservationData = {
  programs: [
    {
      id: 1,
      name: '더덕 송편 만들기',
      description: '마을 특산물인 더덕으로 맛있는 송편을 만들어봅니다.',
      capacity: 25,
      remaining: 5,
      price: 30000,
      duration: '2시간',
      schedule: '매주 토요일 10:00',
      instructor: '김영희 선생님',
      requirements: '특별한 준비물 없음',
      status: 'active'
    },
    {
      id: 2,
      name: '고추장 담그기',
      description: '전통 방식으로 고추장을 담그는 방법을 배웁니다.',
      capacity: 20,
      remaining: 8,
      price: 50000,
      duration: '3시간',
      schedule: '매주 일요일 14:00',
      instructor: '박철수 선생님',
      requirements: '앞치마',
      status: 'active'
    },
    {
      id: 3,
      name: '도라지 캐기 체험',
      description: '직접 도라지를 캐고 손질하는 방법을 배웁니다.',
      capacity: 15,
      remaining: 0,
      price: 25000,
      duration: '2시간',
      schedule: '매주 토요일 15:00',
      instructor: '이상철 선생님',
      requirements: '장화, 장갑',
      status: 'full'
    }
  ],
  
  upcomingSessions: [
    {
      programId: 1,
      date: '2024-01-20',
      time: '10:00',
      participants: 20,
      waitlist: 2
    },
    {
      programId: 2,
      date: '2024-01-21',
      time: '14:00',
      participants: 12,
      waitlist: 0
    }
  ],
  
  statistics: {
    totalParticipants: 450,
    averageSatisfaction: 4.8,
    popularPrograms: [
      { id: 1, name: '더덕 송편 만들기', participantCount: 200 },
      { id: 2, name: '고추장 담그기', participantCount: 150 },
      { id: 3, name: '도라지 캐기 체험', participantCount: 100 }
    ]
  }
} 