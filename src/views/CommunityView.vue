<template>
  <v-container>
    <h2 class="text-h4 font-heading mb-6">커뮤니티</h2>

    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="1">
          <v-card-title class="text-h5 font-heading">
            공지사항
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              class="font-body"
              to="/community/notices"
            >
              더보기
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list lines="two">
              <v-list-item
                v-for="notice in notices"
                :key="notice.id"
                :title="notice.title"
                :subtitle="notice.date"
                class="font-body"
              >
                <template v-slot:prepend>
                  <v-icon
                    :color="notice.important ? 'error' : 'primary'"
                    :icon="notice.important ? 'mdi-alert-circle' : 'mdi-bell'"
                  ></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">
            자유게시판
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              class="font-body"
              to="/community/board"
            >
              더보기
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list lines="two">
              <v-list-item
                v-for="post in posts"
                :key="post.id"
                class="font-body"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-comment-text"></v-icon>
                </template>
                <v-list-item-title>{{ post.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ post.author }} | {{ post.date }} | 댓글 {{ post.comments }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">
            질문과 답변
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              class="font-body"
              to="/community/qna"
            >
              더보기
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list lines="two">
              <v-list-item
                v-for="qna in qnas"
                :key="qna.id"
                class="font-body"
              >
                <template v-slot:prepend>
                  <v-icon
                    :color="qna.answered ? 'success' : 'warning'"
                    :icon="qna.answered ? 'mdi-check-circle' : 'mdi-help-circle'"
                  ></v-icon>
                </template>
                <v-list-item-title>{{ qna.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ qna.author }} | {{ qna.date }} | 답변 {{ qna.answers }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="1">
          <v-card-title class="text-h5 font-heading">
            커뮤니티 가이드
          </v-card-title>
          <v-card-text class="font-body">
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-information</v-icon>
                </template>
                <v-list-item-title>게시판 이용 안내</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-shield-check</v-icon>
                </template>
                <v-list-item-title>커뮤니티 규칙</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-frequently-asked-questions</v-icon>
                </template>
                <v-list-item-title>자주 묻는 질문</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">
            이달의 모임
          </v-card-title>
          <v-card-text class="font-body">
            <v-list density="compact">
              <v-list-item
                v-for="meeting in meetings"
                :key="meeting.id"
              >
                <template v-slot:prepend>
                  <v-icon color="primary">{{ meeting.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ meeting.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ meeting.date }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">
            문의하기
          </v-card-title>
          <v-card-text class="font-body">
            <p class="text-body-1">
              커뮤니티 이용에 관한 문의사항이 있으시면 아래로 연락해 주세요.
            </p>
            <v-list density="compact" class="mt-4">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-phone</v-icon>
                </template>
                <v-list-item-title>061-1234-5678</v-list-item-title>
                <v-list-item-subtitle>평일 09:00-18:00</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-email</v-icon>
                </template>
                <v-list-item-title>community@baekun.kr</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CommunityView',
  data() {
    return {
      notices: [
        {
          id: 1,
          title: '2024년 귀농 지원 사업 신청 안내',
          date: '2024-01-15',
          important: true
        },
        {
          id: 2,
          title: '마을 주민 정기 모임 일정 변경 안내',
          date: '2024-01-10',
          important: true
        },
        {
          id: 3,
          title: '겨울철 농기계 관리 교육 안내',
          date: '2024-01-05',
          important: false
        }
      ],
      posts: [
        {
          id: 1,
          title: '마을 장터에서 있었던 즐거운 일',
          author: '김농부',
          date: '2024-01-14',
          comments: 5
        },
        {
          id: 2,
          title: '귀농 1년차 도전기',
          author: '이새내기',
          date: '2024-01-13',
          comments: 8
        },
        {
          id: 3,
          title: '우리 마을 풍경 사진 공유합니다',
          author: '박사진',
          date: '2024-01-12',
          comments: 12
        }
      ],
      qnas: [
        {
          id: 1,
          title: '귀농 정착 지원금 신청 절차가 궁금합니다',
          author: '최귀농',
          date: '2024-01-14',
          answers: 2,
          answered: true
        },
        {
          id: 2,
          title: '겨울철 하우스 관리 방법 문의',
          author: '정농부',
          date: '2024-01-13',
          answers: 1,
          answered: true
        },
        {
          id: 3,
          title: '농지 구입시 주의사항이 궁금합니다',
          author: '강준비',
          date: '2024-01-12',
          answers: 0,
          answered: false
        }
      ],
      meetings: [
        {
          id: 1,
          title: '귀농인 모임',
          date: '매주 토요일 오전 10시',
          icon: 'mdi-account-group'
        },
        {
          id: 2,
          title: '농산물 품평회',
          date: '1월 20일 오후 2시',
          icon: 'mdi-fruit-cherries'
        },
        {
          id: 3,
          title: '마을 정기 모임',
          date: '1월 25일 오후 7시',
          icon: 'mdi-home-group'
        }
      ]
    }
  }
}
</script> 