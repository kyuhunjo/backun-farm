<template>
  <v-dialog v-model="show" max-width="600">
    <v-card class="event-modal">
      <v-card-title class="pa-6 pb-2">
        <span class="text-h5 font-weight-bold">{{ isEdit ? '일정 수정' : '새로운 일정' }}</span>
      </v-card-title>
      
      <v-card-text class="pa-6 pt-4">
        <v-form ref="form" v-model="isValid" @submit.prevent="handleSubmit">
          <div class="mb-8">
            <div class="text-subtitle-2 font-weight-medium mb-3">기본 정보</div>
            <v-text-field
              v-model="eventData.title"
              label="제목"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              :rules="[v => !!v || '제목을 입력해주세요']"
              class="mb-4 single-field"
            ></v-text-field>

            <div class="field-group">
              <v-text-field
                v-model="eventData.startDate"
                label="시작일"
                type="date"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                :rules="[v => !!v || '시작일을 선택해주세요']"
                class="date-field"
              ></v-text-field>
              <v-text-field
                v-model="eventData.endDate"
                label="종료일"
                type="date"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                :rules="[v => !!v || '종료일을 선택해주세요']"
                class="date-field"
              ></v-text-field>
            </div>
          </div>

          <div class="mb-8">
            <div class="text-subtitle-2 font-weight-medium mb-3">근무 정보</div>
            <v-text-field
              v-model="eventData.location"
              label="장소"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              :rules="[v => !!v || '장소를 입력해주세요']"
              class="mb-4 single-field"
            ></v-text-field>

            <div class="field-group">
              <v-text-field
                v-model.number="eventData.numberOfPeople"
                label="필요 인원"
                type="number"
                min="1"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                :rules="[
                  v => !!v || '필요 인원을 입력해주세요',
                  v => v > 0 || '1명 이상 입력해주세요'
                ]"
                class="number-field"
              >
                <template v-slot:append-inner>
                  <span class="text-medium-emphasis">명</span>
                </template>
              </v-text-field>
              <v-text-field
                v-model.number="eventData.dailyWage"
                label="일당"
                type="number"
                min="0"
                step="1000"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                :rules="[
                  v => !!v || '일당을 입력해주세요',
                  v => v >= 0 || '0원 이상 입력해주세요'
                ]"
                class="number-field"
              >
                <template v-slot:append-inner>
                  <span class="text-medium-emphasis">원</span>
                </template>
              </v-text-field>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-subtitle-2 font-weight-medium mb-3">상세 정보</div>
            <v-textarea
              v-model="eventData.details"
              label="상세 설명"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              rows="3"
              no-resize
              class="description-field"
            ></v-textarea>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>
      
      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          variant="text"
          @click="handleClose"
          class="me-2"
        >
          취소
        </v-btn>
        <v-btn
          color="primary"
          @click="handleSubmit"
          :loading="loading"
          variant="elevated"
        >
          {{ isEdit ? '수정' : '등록' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  event: {
    type: Object,
    default: () => null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit', 'close'])

const form = ref(null)
const isValid = ref(false)
const show = ref(false)

const isEdit = computed(() => !!props.event?.id)

const eventData = ref({
  title: '',
  startDate: '',
  endDate: '',
  location: '',
  numberOfPeople: '',
  dailyWage: '',
  details: '',
  status: '모집중'
})

watch(() => props.modelValue, (newVal) => {
  show.value = newVal
})

watch(() => show.value, (newVal) => {
  emit('update:modelValue', newVal)
})

watch(() => props.event, (newVal) => {
  if (newVal) {
    const { ...rest } = newVal
    eventData.value = { ...rest }
  } else {
    eventData.value = {
      title: '',
      startDate: '',
      endDate: '',
      location: '',
      numberOfPeople: '',
      dailyWage: '',
      details: '',
      status: '모집중'
    }
  }
}, { immediate: true })

const resetForm = () => {
  eventData.value = {
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    numberOfPeople: '',
    dailyWage: '',
    details: '',
    status: '모집중'
  }
}

const handleClose = () => {
  resetForm()
  emit('close')
}

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  
  emit('submit', { ...eventData.value })
  handleClose()
}
</script>

<style scoped>
.event-modal :deep(.v-field) {
  border-radius: 8px;
}

.event-modal :deep(.v-field__input) {
  padding: 8px 12px;
  min-height: 40px;
}

.event-modal :deep(.v-label) {
  font-size: 0.875rem;
  opacity: 0.7;
}

.event-modal .single-field {
  width: 100%;
}

.event-modal .field-group {
  display: flex;
  width: 100%;
  gap: 24px;
  align-items: flex-start;
}

.event-modal .field-group + .field-group {
  margin-top: 24px;
}

.event-modal .date-field,
.event-modal .number-field {
  flex: 1;
  min-width: 0;
  align-self: flex-start;
}

.event-modal :deep(.v-input) {
  align-self: flex-start;
}

.event-modal :deep(.v-input__control) {
  height: auto;
  min-height: 40px;
}

.event-modal :deep(.v-field) {
  border-radius: 8px;
  height: auto;
  min-height: 40px;
}

.event-modal :deep(.v-field__field) {
  height: auto;
  min-height: 40px;
}

.event-modal :deep(.v-field__input) {
  padding: 8px 12px;
  height: auto;
  min-height: 40px;
}

.event-modal :deep(.v-field__outline) {
  height: 100%;
}

.event-modal :deep(.v-messages) {
  min-height: 0;
  padding-top: 4px;
}

.event-modal .date-field :deep(.v-field__input) {
  min-height: 40px;
}

.event-modal .date-field :deep(input[type="date"]) {
  position: relative;
  z-index: 1;
  padding-right: 32px;
  min-height: 40px;
}

.event-modal .date-field :deep(input[type="date"]::-webkit-calendar-picker-indicator) {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.7;
}

.event-modal .number-field :deep(.v-field__input) {
  padding-right: 48px;
  min-height: 40px;
}

.event-modal .number-field :deep(.v-field__append-inner) {
  padding: 0;
  margin: 0;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.event-modal .number-field :deep(.v-field__append-inner span) {
  font-size: 0.875rem;
  opacity: 0.7;
}

.event-modal .number-field :deep(input[type="number"]) {
  -moz-appearance: textfield;
}

.event-modal .number-field :deep(input[type="number"]::-webkit-outer-spin-button),
.event-modal .number-field :deep(input[type="number"]::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

.event-modal .description-field {
  width: 100%;
  min-height: 120px;
}
</style> 