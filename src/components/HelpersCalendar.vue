<template>
  <div class="calendar">
    <div class="calendar-header d-flex align-center justify-space-between mb-4">
      <v-btn icon="mdi-chevron-left" variant="text" @click="previousMonth"></v-btn>
      <h2 class="text-h5">{{ currentMonthYear }}</h2>
      <v-btn icon="mdi-chevron-right" variant="text" @click="nextMonth"></v-btn>
    </div>

    <div class="calendar-container">
      <div class="calendar-weekdays">
        <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
      </div>

      <div class="calendar-grid">
        <div
          v-for="date in calendarDays"
          :key="date.date"
          class="calendar-day"
          :class="{
            'is-past': isPast(date.date),
            'is-today': isToday(date.date),
            'is-other-month': date.isOtherMonth
          }"
          @click="showEventsForDate(date)"
        >
          <div class="day-header">
            <span class="day-number">{{ date.dayOfMonth }}</span>
            <v-chip
              v-if="date.events.length > 0"
              size="x-small"
              color="primary"
              class="event-count"
            >
              {{ date.events.length }}
            </v-chip>
          </div>
          <div class="day-content">
            <div
              v-for="event in date.events"
              :key="event.id"
              class="event-indicator"
              :class="[getEventStatusClass(event.status)]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 날짜별 이벤트 목록 모달 -->
    <v-dialog v-model="showEventListModal" max-width="600">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold d-flex align-center justify-space-between pa-4">
          {{ selectedDateFormatted }}
          <v-btn
            icon="mdi-close"
            size="small"
            variant="text"
            @click="showEventListModal = false"
          ></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <v-list v-if="selectedDateEvents.length > 0" class="py-2">
            <v-list-item
              v-for="event in selectedDateEvents"
              :key="event.id"
              :title="event.title"
              :subtitle="event.location"
              @click="showEventDetails(event)"
              class="my-2 rounded-lg"
              hover
            >
              <template #prepend>
                <v-avatar
                  :color="getEventStatusColor(event.status)"
                  :class="getEventStatusClass(event.status)"
                  size="42"
                  class="me-3"
                >
                  <v-icon color="white" size="small">
                    {{ getEventStatusIcon(event.status) }}
                  </v-icon>
                </v-avatar>
              </template>
              <template #title>
                <div class="d-flex align-center mb-1">
                  <span class="text-subtitle-1 font-weight-medium">{{ event.title }}</span>
                  <v-chip
                    size="small"
                    :color="getEventStatusColor(event.status)"
                    class="ms-2"
                    variant="tonal"
                  >
                    {{ event.status }}
                  </v-chip>
                </div>
              </template>
              <template #subtitle>
                <div class="d-flex flex-column">
                  <div class="d-flex align-center text-body-2 text-medium-emphasis mb-1">
                    <v-icon size="small" color="grey" class="me-1">mdi-map-marker</v-icon>
                    {{ event.location }}
                  </div>
                  <div class="d-flex align-center text-body-2">
                    <div class="me-3 d-flex align-center">
                      <v-icon size="small" color="grey" class="me-1">mdi-account-multiple</v-icon>
                      <span>{{ event.numberOfPeople }}명</span>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon size="small" color="grey" class="me-1">mdi-currency-krw</v-icon>
                      <span>{{ formatCurrency(event.dailyWage) }}원</span>
                    </div>
                  </div>
                </div>
              </template>
              <template #append>
                <v-icon color="grey">mdi-chevron-right</v-icon>
              </template>
            </v-list-item>
          </v-list>
          <v-alert
            v-else
            type="info"
            variant="tonal"
            class="ma-4 text-center text-subtitle-1 font-weight-medium"
            icon="mdi-calendar-alert"
            color="grey-darken-1"
          >
            등록된 일손 모집 정보가 없습니다
          </v-alert>
        </v-card-text>
        <v-divider v-if="selectedDateEvents.length > 0"></v-divider>
        <v-card-actions v-if="selectedDateEvents.length > 0" class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="tonal"
            @click="showEventListModal = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 이벤트 상세 정보 모달 -->
    <v-dialog v-model="selectedOpen" max-width="600">
      <v-card v-if="selectedEvent">
        <v-card-title class="text-h5 font-weight-bold d-flex align-center justify-space-between">
          {{ selectedEvent.title }}
          <v-btn
            icon="mdi-pencil"
            size="small"
            @click="editEvent"
          ></v-btn>
        </v-card-title>
        <v-card-text>
          <div class="d-flex flex-column">
            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="grey-darken-1" class="me-2">mdi-calendar</v-icon>
              <span>{{ formatDateRange(selectedEvent.startDate, selectedEvent.endDate) }}</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="grey-darken-1" class="me-2">mdi-map-marker</v-icon>
              <span>{{ selectedEvent.location }}</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="grey-darken-1" class="me-2">mdi-account-multiple</v-icon>
              <span>필요 인원: {{ selectedEvent.numberOfPeople }}명</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="grey-darken-1" class="me-2">mdi-currency-krw</v-icon>
              <span>일당: {{ formatCurrency(selectedEvent.dailyWage) }}원</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" color="grey-darken-1" class="me-2">mdi-phone</v-icon>
              <span>문의 전화: 010-3674-6655</span>
            </div>
            <div class="text-body-1">{{ selectedEvent.details }}</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            variant="outlined"
            prepend-icon="mdi-delete"
            @click="deleteEvent"
          >
            삭제
          </v-btn>
          <v-menu v-if="selectedEvent.status !== '모집완료'">
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                variant="outlined"
                class="me-2"
                v-bind="props"
              >
                상태 변경
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-if="selectedEvent.status !== '모집중'"
                @click="updateEventStatus('모집중')"
              >
                <v-list-item-title>모집중</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="selectedEvent.status !== '모집완료'"
                @click="updateEventStatus('모집완료')"
              >
                <v-list-item-title>모집완료</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="selectedEvent.status !== '진행중'"
                @click="updateEventStatus('진행중')"
              >
                <v-list-item-title>진행중</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="tonal"
            @click="selectedOpen = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <helpers-event-modal
      v-model="showEventModal"
      :event="editingEvent"
      :loading="loading"
      @submit="handleEventSubmit"
      @close="() => {
        showEventModal = false
        editingEvent.value = null
      }"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HelpersEventModal from './HelpersEventModal.vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh', 'submit', 'update-status', 'delete', 'update:month'])

const weekDays = ['일', '월', '화', '수', '목', '금', '토']
const currentDate = ref(new Date())
const selectedEvent = ref(null)
const selectedOpen = ref(false)
const showEventModal = ref(false)
const editingEvent = ref(null)
const showEventListModal = ref(false)
const selectedDateEvents = ref([])

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
})

const selectedDateFormatted = computed(() => {
  if (!selectedDateEvents.value.length) return ''
  const date = new Date(selectedDateEvents.value[0].startDate)
  return date.toLocaleDateString('ko-KR', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  
  // 이전 달의 날짜 추가
  const firstDayOfWeek = firstDay.getDay()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push({
      date,
      dayOfMonth: date.getDate(),
      isOtherMonth: true,
      events: getEventsForDate(date)
    })
  }
  
  // 현재 달의 날짜 추가
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      dayOfMonth: i,
      isOtherMonth: false,
      events: getEventsForDate(date)
    })
  }
  
  // 다음 달의 날짜 추가
  const lastDayOfWeek = lastDay.getDay()
  for (let i = 1; i < 7 - lastDayOfWeek; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      date,
      dayOfMonth: date.getDate(),
      isOtherMonth: true,
      events: getEventsForDate(date)
    })
  }
  
  return days
})

const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

const getEventsForDate = (date) => {
  return props.events.filter(event => {
    const eventStart = new Date(event.startDate)
    const eventEnd = new Date(event.endDate)
    const currentDate = new Date(date)
    
    // 시간 부분을 제거하고 날짜만 비교
    eventStart.setHours(0, 0, 0, 0)
    eventEnd.setHours(0, 0, 0, 0)
    currentDate.setHours(0, 0, 0, 0)
    
    return currentDate >= eventStart && currentDate <= eventEnd
  })
}

const showEventsForDate = (dateInfo) => {
  selectedDateEvents.value = dateInfo.events.map(event => ({
    ...event,
    startDate: formatDateToYYYYMMDD(event.startDate),
    endDate: formatDateToYYYYMMDD(event.endDate)
  }))
  showEventListModal.value = true
}

const showEventDetails = (event) => {
  selectedEvent.value = {
    ...event,
    startDate: formatDateToYYYYMMDD(event.startDate),
    endDate: formatDateToYYYYMMDD(event.endDate)
  }
  showEventListModal.value = false
  selectedOpen.value = true
}

const getEventStatusClass = (status) => {
  switch (status) {
    case '모집중':
      return 'status-open'
    case '모집완료':
      return 'status-closed'
    case '진행중':
      return 'status-in-progress'
    default:
      return 'status-default'
  }
}

const getEventStatusColor = (status) => {
  const colorSets = {
    '모집중': 'primary',
    '모집완료': 'success',
    '진행중': 'warning',
    'default': 'grey'
  }

  return colorSets[status] || colorSets.default
}

const getEventStatusIcon = (status) => {
  switch (status) {
    case '모집중':
      return 'mdi-account-multiple-plus'
    case '모집완료':
      return 'mdi-check-circle'
    case '진행중':
      return 'mdi-progress-clock'
    default:
      return 'mdi-help-circle'
  }
}

const isPast = (date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

const isToday = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
  emit('update:month', newDate)
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
  emit('update:month', newDate)
}

// 초기 월 설정
onMounted(() => {
  emit('update:month', currentDate.value)
})

const editEvent = () => {
  editingEvent.value = { 
    ...selectedEvent.value,
    startDate: formatDateToYYYYMMDD(selectedEvent.value.startDate),
    endDate: formatDateToYYYYMMDD(selectedEvent.value.endDate)
  }
  selectedOpen.value = false
  showEventModal.value = true
}

const formatDateRange = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  const options = { 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  }
  
  return `${startDate.toLocaleDateString('ko-KR', options)} ~ ${endDate.toLocaleDateString('ko-KR', options)}`
}

const formatCurrency = (value) => {
  return value.toLocaleString('ko-KR')
}

const handleEventSubmit = async (updatedEventData) => {
  try {
    emit('submit', updatedEventData)
    showEventModal.value = false
    editingEvent.value = null
    selectedEvent.value = null
  } catch (error) {
    console.error('이벤트 수정 중 오류 발생:', error)
  }
}

const updateEventStatus = (status) => {
  emit('update-status', { id: selectedEvent.value.id, status })
  selectedOpen.value = false
}

const deleteEvent = () => {
  emit('delete', selectedEvent.value.id)
  selectedOpen.value = false
}
</script>

<style scoped>
.calendar {
  width: 100%;
  background: transparent;
}

.calendar-container {
  width: 100%;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), 0.7);
  padding: 8px 0;
  text-transform: uppercase;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  padding: 8px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.calendar-day:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.calendar-day.is-past {
  opacity: 0.5;
}

.calendar-day.is-today {
  background-color: rgba(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary));
}

.calendar-day.is-other-month {
  opacity: 0.3;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.day-number {
  font-weight: 500;
}

.event-count {
  font-size: 11px;
}

.day-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 2px;
}

.event-indicator {
  width: 100%;
  height: 4px;
  border-radius: 2px;
}

.status-open {
  background-color: rgb(var(--v-theme-primary));
}

.status-closed {
  background-color: rgb(var(--v-theme-success));
}

.status-in-progress {
  background-color: rgb(var(--v-theme-warning));
}

.status-default {
  background-color: rgb(var(--v-theme-grey));
}

@media (max-width: 960px) {
  .weekday {
    font-size: 12px;
    padding: 4px 0;
  }
  
  .calendar-day {
    padding: 4px;
  }
  
  .day-number {
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .calendar-header {
    margin-bottom: 8px;
  }
  
  .weekday {
    font-size: 11px;
  }
  
  .calendar-day {
    padding: 2px;
  }
  
  .day-number {
    font-size: 11px;
  }
  
  .event-count {
    font-size: 10px;
  }
  
  .event-title {
    font-size: 10px;
  }
}
</style> 