<template>
  <v-container>
    <div class="d-flex flex-column mb-6">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
          <h2 class="text-h5 font-weight-bold mb-0">일손 모집</h2>
        </div>
        <div class="d-flex align-center">
          <v-btn
            prepend-icon="mdi-refresh"
            color="grey"
            variant="tonal"
            class="me-3"
            :loading="isLoading"
            @click="fetchHelpers"
          >
            새로고침
          </v-btn>
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            @click="showEventModal = true"
          >
            일손 모집 등록
          </v-btn>
        </div>
      </div>
      <div class="d-flex align-center">
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          농가의 일손 모집 정보를 확인하고 신청할 수 있습니다.
        </p>
      </div>
    </div>

    <div class="d-flex justify-end mb-2">
      <v-chip
        v-if="events.length > 0"
        color="primary"
        variant="flat"
        size="small"
        class="font-weight-medium"
      >
        총 {{ currentMonthEvents.length }}개
      </v-chip>
    </div>

    <HelpersCalendar
      ref="calendar"
      :events="events"
      :loading="isLoading"
      @refresh="fetchHelpers"
      @submit="handleEventSubmit"
      @update-status="handleStatusUpdate"
      @delete="handleDelete"
      @update:month="handleMonthChange"
    >
      <template #title>
        <div class="d-flex align-center">
          <span class="text-h5">일손 모집</span>
          <v-chip
            color="primary"
            class="ml-4"
            size="small"
          >
            총 {{ totalEvents }}건
          </v-chip>
        </div>
      </template>
    </HelpersCalendar>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="bottom right"
      class="custom-snackbar"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <helpers-event-modal
      v-model="showEventModal"
      :event="editingEvent"
      :loading="isLoading"
      @submit="handleEventSubmit"
      @close="resetEventModal"
    />

    <!-- 삭제 확인 다이얼로그 -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">일손 모집 삭제</v-card-title>
        <v-card-text>
          정말 이 일손 모집을 삭제하시겠습니까?
          <br>
          삭제된 데이터는 복구할 수 없습니다.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="text"
            @click="showDeleteDialog = false"
          >
            취소
          </v-btn>
          <v-btn
            color="error"
            variant="tonal"
            :loading="isLoading"
            @click="confirmDelete"
          >
            삭제
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import HelpersCalendar from '@/components/HelpersCalendar.vue'
import HelpersEventModal from '@/components/HelpersEventModal.vue'
import { api } from '@/services/api'
import { useSnackbar } from '@/composables/useSnackbar'

const { snackbar, showSnackbar } = useSnackbar()
const calendar = ref(null)
const isLoading = ref(false)
const showEventModal = ref(false)
const editingEvent = ref(null)
const currentMonth = ref(new Date())
const events = ref([])
const showDeleteDialog = ref(false)
const deletingEventId = ref(null)

// 현재 월의 이벤트 개수를 계산하는 computed 속성
const currentMonthEvents = computed(() => {
  return events.value.filter(event => {
    const eventStart = new Date(event.startDate)
    return eventStart.getFullYear() === currentMonth.value.getFullYear() &&
           eventStart.getMonth() === currentMonth.value.getMonth()
  })
})

// 월 변경 핸들러
const handleMonthChange = (newMonth) => {
  currentMonth.value = newMonth
}

const fetchHelpers = async () => {
  try {
    isLoading.value = true
    const response = await api.get('/jobs')
    if (response.data.success && Array.isArray(response.data.data)) {
      events.value = response.data.data.map(job => ({
        id: job._id,
        title: job.title,
        startDate: job.startDate,
        endDate: job.endDate,
        location: job.location,
        numberOfPeople: job.numberOfPeople,
        dailyWage: job.dailyWage,
        details: job.details,
        status: job.status
      }))
      showSnackbar('일손 모집 정보가 갱신되었습니다.')
    }
  } catch (error) {
    console.error('API Error:', error)
    showSnackbar('일손 모집 정보를 불러오는데 실패했습니다.', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleEventSubmit = async (eventData) => {
  isLoading.value = true
  try {
    const endpoint = eventData.id ? `/jobs/${eventData.id}` : '/jobs'
    const method = eventData.id ? 'put' : 'post'
    
    const response = await api[method](endpoint, eventData)
    if (response.data.success) {
      showSnackbar(eventData.id ? '일손 모집이 수정되었습니다.' : '일손 모집이 등록되었습니다.')
      showEventModal.value = false
      editingEvent.value = null
      await fetchHelpers() // 목록 새로고침
    }
  } catch (error) {
    console.error('API Error:', error)
    showSnackbar('일손 모집 저장에 실패했습니다.', 'error')
  } finally {
    isLoading.value = false
  }
}

const resetEventModal = () => {
  showEventModal.value = false
  editingEvent.value = null
}

const handleStatusUpdate = async ({ id, status }) => {
  isLoading.value = true
  try {
    const response = await api.patch(`/jobs/${id}/status`, { status })
    if (response.data.success) {
      showSnackbar('모집 상태가 변경되었습니다.')
      await fetchHelpers() // 목록 새로고침
    }
  } catch (error) {
    console.error('API Error:', error)
    showSnackbar('모집 상태 변경에 실패했습니다.', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async (id) => {
  deletingEventId.value = id
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  try {
    isLoading.value = true
    const response = await api.delete(`/jobs/${deletingEventId.value}`)
    if (response.data.success) {
      showSnackbar('일손 모집이 삭제되었습니다.')
      await fetchHelpers()
    }
  } catch (error) {
    console.error('API Error:', error)
    showSnackbar('일손 모집 삭제에 실패했습니다.', 'error')
  } finally {
    isLoading.value = false
    showDeleteDialog.value = false
    deletingEventId.value = null
  }
}

// 컴포넌트 마운트 시 데이터 로드
fetchHelpers()
</script>

<style scoped>
.custom-snackbar {
  --v-snackbar-padding: 16px !important;
  --v-snackbar-min-width: 0 !important;
  --v-snackbar-max-width: none !important;
}

:deep(.v-snackbar__wrapper) {
  width: auto !important;
  max-width: none !important;
  min-width: 0 !important;
}

:deep(.v-snackbar__content) {
  padding: 8px 16px !important;
  width: auto !important;
  max-width: none !important;
  min-width: 0 !important;
}
</style> 