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
        class="chat-title-bar pa-0"
        elevation="0"
        height="48"
      >
        <div class="d-flex align-center px-4 w-100">
          <v-avatar
            color="primary-lighten-1"
            class="chat-avatar"
            size="28"
          >
            <v-icon size="16">mdi-message-text</v-icon>
          </v-avatar>
          <span class="chat-title ms-2">백운마을 도우미</span>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            class="close-button"
            @click="toggleChat"
          >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>

      <v-card-text class="chat-messages-container">
        <div class="messages-scroll" ref="messageContainer">
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
      contextSize: 5,
      messages: []
    }
  },
  watch: {
    messages: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.messages = [{
          text: '안녕하세요! 화순군 청풍면 백운마을 도우미입니다. 무엇을 도와드릴까요?',
          isUser: false,
          time: this.getCurrentTime()
        }]
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    },
    getCurrentTime() {
      const now = new Date()
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return

      const userMessage = this.userInput
      this.messages.push({
        text: userMessage,
        isUser: true,
        time: this.getCurrentTime()
      })
      this.userInput = ''
      this.scrollToBottom()

      try {
        this.isLoading = true
        
        const loadingMsgIndex = this.messages.push({
          text: '답변을 작성중입니다...',
          isUser: false,
          time: this.getCurrentTime(),
          isLoading: true
        }) - 1
        this.scrollToBottom()

        const response = await chatWithAI(userMessage, this.recentContext)
        
        this.messages[loadingMsgIndex] = {
          text: response,
          isUser: false,
          time: this.getCurrentTime()
        }
        this.scrollToBottom()
      } catch (error) {
        this.messages.push({
          text: '죄송합니다. 응답을 받아오는데 실패했습니다.',
          isUser: false,
          time: this.getCurrentTime(),
          isError: true
        })
        this.scrollToBottom()
      } finally {
        this.isLoading = false
      }
    }
  },
  computed: {
    recentContext() {
      return this.messages.slice(-this.contextSize)
    }
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
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 30, 30, 0.95) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.chat-messages-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  padding: 0 !important;
}

.messages-scroll {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.message-bubble {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  position: relative;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    left: 1rem;
  }

  .chat-bot-toggle {
    min-width: 140px !important;
  }

  .chat-bot-window {
    position: fixed;
    top: 1rem;
    bottom: 5rem;
    left: 1rem;
    right: 1rem;
    width: auto;
    height: auto;
    max-height: calc(100vh - 6rem);
  }
}

.chat-title-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(to right, rgba(var(--v-theme-primary), 0.2), rgba(var(--v-theme-primary), 0.1)) !important;
}

.chat-avatar {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.chat-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
}

.close-button {
  margin-right: -8px;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.close-button:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1) !important;
}
</style>