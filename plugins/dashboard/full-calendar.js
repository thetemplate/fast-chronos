// We initialize calendar components here since they don't have SSR support.
// We will render them on the client only by making this plugin ssr:false
import Vue from 'vue'
import BigCalendar from '@/components/pages/calendar/BigCalendar'
import ResourceTimeline from '@/components/pages/calendar/ResourceTimeline'
import CalendarWidget from '@/components/widgets/CalendarWidget'
Vue.component(BigCalendar.name, BigCalendar)
Vue.component(CalendarWidget.name, CalendarWidget)
Vue.component(ResourceTimeline.name, ResourceTimeline)
