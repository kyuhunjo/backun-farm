<template>
  <div
    class="calendar-day"
    :class="{
      'past': isPast,
      'today': isToday,
      'other-month': isOtherMonth
    }"
  >
    <div class="day-header d-flex justify-space-between align-center">
      <span class="date-label">{{ dayOfMonth }}</span>
      <span v-if="events.length" class="event-count">{{ events.length }}</span>
    </div>
    <div class="events-container">
      <div
        v-for="event in events"
        :key="event.id"
        class="event"
        :style="{ backgroundColor: event.color + '20' }"
        @click="$emit('click:event', $event, event)"
      >
        <div class="d-flex align-center">
          <v-icon size="small" :color="event.color" class="me-1">
            {{ event.icon || 'mdi-account-group' }}
          </v-icon>
          <span class="event-title">{{ event.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dayOfMonth: {
    type: Number,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  },
  isPast: {
    type: Boolean,
    default: false
  },
  isToday: {
    type: Boolean,
    default: false
  },
  isOtherMonth: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click:event'])
</script>

<style scoped>
.calendar-day {
  aspect-ratio: 1;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 100%;
}

.calendar-day:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-1px);
}

.calendar-day.past {
  opacity: 0.7;
}

.calendar-day.today {
  background-color: rgb(var(--v-theme-surface-variant));
  border: 1px solid rgba(var(--v-theme-primary), 0.3);
}

.calendar-day.other-month {
  opacity: 0.5;
}

.day-header {
  margin-bottom: 4px;
}

.date-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.87);
}

.event-count {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-size: 0.7rem;
  padding: 1px 4px;
  border-radius: 8px;
  min-width: 18px;
  text-align: center;
}

.events-container {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.event {
  border-radius: 4px;
  padding: 4px;
  margin: 2px 0;
  font-size: 0.75rem;
  line-height: 1.2;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  cursor: pointer;
}

.event:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  transform: translateY(-1px);
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .calendar-day {
    padding: 4px;
  }

  .date-label {
    font-size: 0.75rem;
  }

  .event {
    padding: 2px 4px;
    font-size: 0.7rem;
  }

  .event-count {
    font-size: 0.65rem;
    padding: 0 2px;
    min-width: 16px;
  }

  .event :deep(.v-icon) {
    font-size: 14px;
  }
}
</style> 