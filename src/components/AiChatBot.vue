<template>
  <div class="chat-bot-container">
    <!-- 챗봇 토글 버튼 -->
    <v-btn
      class="chat-bot-toggle"
      color="primary"
      size="large"
      elevation="0"
      @click="toggleChat"
    >
      <v-icon size="20" class="chat-icon">{{ isOpen ? 'mdi-close' : 'mdi-message-text' }}</v-icon>
      <span class="toggle-text text-body-2 ms-2">백운마을 도우미</span>
    </v-btn>

    <!-- 챗봇 대화창 -->
    <v-card
      v-show="isOpen"
      class="chat-bot-window"
      elevation="8"
      theme="dark"
    >
      <v-toolbar
        color="primary"
        elevation="0"
        density="compact"
      >
        <v-icon size="20" class="me-2">mdi-message-text</v-icon>
        <span class="text-subtitle-2 font-weight-medium">백운마을 도우미</span>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="toggleChat"
        >
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="chat-messages pa-4" ref="messageContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message-bubble mb-3', message.isUser ? 'user-message' : 'bot-message', message.isLoading ? 'isLoading' : '', message.isError ? 'isError' : '']"
        >
          <div class="message-content">
            {{ message.text }}
          </div>
          <div class="message-time text-caption">
            {{ message.time }}
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="chat-input px-4 py-3">
        <v-text-field
          v-model="userInput"
          placeholder="메시지를 입력하세요..."
          variant="outlined"
          density="compact"
          hide-details
          bg-color="surface"
          class="chat-input-field"
          @keyup.enter="sendMessage"
        >
          <template v-slot:append-inner>
            <v-btn
              icon="mdi-send"
              variant="text"
              color="primary"
              size="small"
              :disabled="!userInput.trim() || isLoading"
              @click="sendMessage"
            >
              <v-icon size="18">mdi-send</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { chatWithAI } from '@/utils/api'

export default {
  name: 'AiChatBot',
  data() {
    return {
      isOpen: false,
      userInput: '',
      isLoading: false,
      contextSize: 5, // 기억할 대화 컨텍스트 수
      messages: []
    }
  },
  watch: {
    messages: {
      deep: true,
      handler() {
        this.scrollToBottomWithDelay()
      }
    }
  },
  computed: {
    // 최근 대화 컨텍스트 추출
    recentContext() {
      return this.messages.slice(-this.contextSize)
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        // 챗봇 창을 열 때 메시지 초기화
        this.messages = [{
          text: '안녕하세요! 백운마을 도우미입니다. 무엇을 도와드릴까요?',
          isUser: false,
          time: this.getCurrentTime()
        }]
        this.$nextTick(() => {
          this.scrollToBottomWithDelay()
        })
      }
    },
    getCurrentTime() {
      const now = new Date()
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return

      // 사용자 메시지 추가
      const userMessage = this.userInput
      this.messages.push({
        text: userMessage,
        isUser: true,
        time: this.getCurrentTime()
      })
      this.userInput = ''
      
      try {
        this.isLoading = true
        
        // AI 응답 대기 메시지
        const loadingMsgIndex = this.messages.push({
          text: '답변을 작성중입니다...',
          isUser: false,
          time: this.getCurrentTime(),
          isLoading: true
        }) - 1

        // AI 응답 요청 (컨텍스트 포함)
        const response = await chatWithAI(userMessage, this.recentContext)
        
        // 대기 메시지를 실제 응답으로 교체
        this.messages[loadingMsgIndex] = {
          text: response,
          isUser: false,
          time: this.getCurrentTime()
        }

        // 로컬 스토리지에 대화 내용 저장
        this.saveMessages()
      } catch (error) {
        // 오류 메시지 표시
        this.messages.push({
          text: '죄송합니다. 응답을 받아오는데 실패했습니다.',
          isUser: false,
          time: this.getCurrentTime(),
          isError: true
        })
      } finally {
        this.isLoading = false
        this.scrollToBottomWithDelay()
      }
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    scrollToBottomWithDelay() {
      this.$nextTick(() => {
        setTimeout(() => {
          const container = this.$refs.messageContainer
          if (container) {
            container.scrollTop = container.scrollHeight
          }
        }, 100)
      })
    },
    // 로컬 스토리지에 메시지 저장
    saveMessages() {
      try {
        localStorage.setItem('chatMessages', JSON.stringify(this.messages))
      } catch (e) {
        console.error('메시지 저장 실패:', e)
      }
    },
    // 로컬 스토리지에서 메시지 불러오기
    loadMessages() {
      try {
        const savedMessages = localStorage.getItem('chatMessages')
        if (savedMessages) {
          this.messages = JSON.parse(savedMessages)
        }
      } catch (e) {
        console.error('메시지 불러오기 실패:', e)
      }
    }
  },
  mounted() {
    // 컴포넌트 마운트 시 저장된 메시지 불러오기
    this.loadMessages()
  }
}
</script>

<style scoped>
.chat-bot-container {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  z-index: 9999;
}

.chat-bot-toggle {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 40px !important;
  min-width: 160px !important;
  letter-spacing: 0.5px;
  border: 1px solid rgba(var(--v-theme-primary), 0.2) !important;
  background: rgba(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.chat-bot-toggle:hover {
  background: rgba(var(--v-theme-primary), 0.15) !important;
  border-color: rgba(var(--v-theme-primary), 0.3) !important;
}

.toggle-text {
  font-weight: 500;
}

.chat-bot-window {
  position: absolute;
  bottom: 4rem;
  right: 0;
  width: 360px;
  height: 520px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 30, 30, 0.95) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  background: transparent;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}

.message-bubble {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  position: relative;
  font-size: 0.9rem;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.message-content {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}

.user-message {
  margin-left: auto;
  background: rgb(var(--v-theme-primary));
  color: white;
  border-bottom-right-radius: 4px;
}

.bot-message {
  margin-right: auto;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 0.7rem;
  margin-top: 4px;
  opacity: 0.7;
  text-align: right;
}

.chat-input {
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-input-field {
  border-radius: 8px;
}

.chat-input-field :deep(.v-field__outline) {
  opacity: 0.2;
}

.message-bubble.bot-message.isLoading {
  background: rgba(255, 255, 255, 0.05);
}

.message-bubble.bot-message.isError {
  background: rgba(var(--v-theme-error), 0.1);
  color: rgb(var(--v-theme-error));
}

@media (max-width: 600px) {
  .chat-bot-container {
    bottom: 5rem;
    right: 1rem;
  }

  .chat-bot-toggle {
    min-width: 140px !important;
  }

  .chat-bot-window {
    width: calc(100vw - 2rem);
    height: calc(100vh - 8rem);
    bottom: 4rem;
    right: 0;
  }
}
</style>