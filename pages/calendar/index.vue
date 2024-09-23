<template>
  <div class="flex align-items justify-content-between mt-5 mb-3">
    <h2 class="text-xl">{{ $t('calendar') }}</h2>
  </div>
  <div class="card">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        themeSystem: 'standard',
        // businessHours: true,
        weekends: false,
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
          {
            title: 'Standup Metting',
            start: new Date(new Date().setDate(new Date().getDate() + 1)),
            end: new Date(new Date().setDate(new Date().getDate() + 2)),
            color: '#F1416C',
            description: 'First Lecture'
          },
          {
            title: 'Sprint Planning',
            start: new Date(new Date().setDate(new Date().getDate() + 3)),
            end: new Date(new Date().setDate(new Date().getDate() + 4)),
            color: '#00A3FF',
            description: 'Second Lecture'
          }
        ]
      }
    };
  }
};
</script>

<style>
.fc-event-title {
  white-space: pre-wrap;
}
</style>
