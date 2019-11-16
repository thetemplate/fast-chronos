<template>
  <div>
    <base-header class="pb-6 content__title content__title--calendar">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 mt-3 mt-lg-0 text-lg-right">
          <a
            href="#"
            @click.prevent="prev"
            class="fullcalendar-btn-prev btn btn-sm btn-default"
          >
            <i class="fas fa-angle-left"></i>
          </a>
          <a
            href="#"
            @click.prevent="next"
            class="fullcalendar-btn-next btn btn-sm btn-default"
          >
            <i class="fas fa-angle-right"></i>
          </a>
          <base-button
            class="btn btn-sm btn-default"
            :class="{ active: defaultView === 'resourceTimelineMonth' }"
            @click="changeView('resourceTimelineMonth')"
          >
            Month
          </base-button>
          <base-button
            class="btn btn-sm btn-default"
            :class="{ active: defaultView === 'listDay' }"
            @click="changeView('listDay')"
          >
            Week
          </base-button>
          <base-button
            class="btn btn-sm btn-default"
            :class="{ active: defaultView === 'resourceTimelineDay' }"
            @click="changeView('resourceTimelineDay')"
          >
            Day
          </base-button>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <!-- Fullcalendar -->
          <div class="card card-calendar">
            <!-- Card header -->
            <div class="card-header">
              <!-- Title -->
              <h5 class="h3 mb-0">Calendar</h5>
            </div>
            <!-- Card body -->
            <div class="card-body p-0 card-calendar-body">
              <full-calendar
                :resources="resources"
                :events="calendarEvents"
                scrollTime="08:00:00"
                maxTime="22:00:00"
                minTime="08:00:00"
                resourceAreaWidth="15%"
                :now="now"
                :plugins="calendarPlugins"
                editable="true"
                droppable="true"
                contentHeight="auto"
                :selectable="true"
                :selectHelper="true"
                ref="fullCalendar"
                class="calendar"
                :defaultView="defaultView"
                schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                @dateClick="handleDateClick"
                @select="handleSelect"
              ></full-calendar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import timelinePlugin from "@fullcalendar/timeline";
import resourceCommonPlugin from "@fullcalendar/resource-common";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import {CALENDAR_COLOR} from "@/util/settings";


/*  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
*/

export default {
  name: "resource-timeline",
  layout: "DashboardLayout",
  components: {
    FullCalendar
  },
  data: function() {
    return {
      calendarPlugins: [
        // plugins must be defined in the JS
        //dayGridPlugin,
        //timeGridPlugin,
        timelinePlugin,
        //resourceCommonPlugin,
        listPlugin,
        interactionPlugin,
        resourceTimelinePlugin
      ],
      defaultView: "resourceTimelineDay",
      now: "2019-08-07",
      resourceColumns: [
        {
          labelText: 'Courts',
          field: 'title'
        },
        {
          labelText: 'Occupancy',
          field: 'occupancy'
        }
    ],
      resources: [
        { id: "a", title: "Court 1", occupancy: 4, eventColor: CALENDAR_COLOR.blue },
        { id: "b", title: "Court 2", occupancy: 4, eventColor: CALENDAR_COLOR.green },
        { id: "c", title: "Court 3", occupancy: 4, eventColor: CALENDAR_COLOR.purple },
        { id: "d", title: "Court 4", occupancy: 4, eventColor: CALENDAR_COLOR.orange },
        { id: "e", title: "Court 5", occupancy: 4, eventColor: CALENDAR_COLOR.pink }
      ],
      calendarEvents: [
        {
          id: "1",
          resourceId: "a",
          start: "2019-08-07T08:00:00",
          end: "2019-08-07T17:00:00",
          title: "event 1"
        },
        {
          id: "5",
          resourceId: "b",
          start: "2019-08-07T08:00:00",
          end: "2019-08-07T17:00:00",
          title: "event 1"
        },
        {
          id: "2",
          resourceId: "c",
          start: "2019-08-07T05:00:00",
          end: "2019-08-07T22:00:00",
          title: "event 2"
        },
        {
          id: "3",
          resourceId: "d",
          start: "2019-08-06",
          end: "2019-08-08",
          title: "event 3"
        },
        {
          id: "4",
          resourceId: "e",
          start: "2019-08-07T03:00:00",
          end: "2019-08-07T10:00:00",
          title: "event 4"
        },
        {
          id: "5",
          resourceId: "f",
          start: "2019-08-07T00:30:00",
          end: "2019-08-07T02:30:00",
          title: "event 5"
        }
      ]
    };
  },
  methods: {
    calendarApi() {
      return this.$refs.fullCalendar.getApi();
    },
    changeView(viewType) {
      this.defaultView = viewType;
      this.calendarApi().changeView(viewType);
    },
    next() {
      this.calendarApi().next();
    },
    prev() {
      this.calendarApi().prev();
    },

    handleDateClick(arg) {
      if (confirm("Would you like to add an event to " + arg + " ?")) {
        console.log("HandleClick");
      }
    },

    handleSelect(arg) {
      if (confirm("Did you select " + arg + " ?")) {
        console.log(
          "Confirmed :" +
            arg.startStr +
            " end - " +
            arg.endStr +
            " resource - " +
            arg.resource.id
        );
        this.calendarEvents.push({
          // add new event data
          title: "New Event",
          start: arg.startStr,
          end: arg.endStr,
          eventColor: "bg-danger",
          className: "bg-red",
          resourceId: arg.resource.id
        });
      }
    },
    onEventClick({ el, event }) {
      console.log("Event : " + event);
      this.model = {
        title: event.title,
        className: event.classNames ? event.classNames.join(" ") : "",
        start: event.start,
        end: event.end,
        description:
          "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
      };
      this.showEditModal = true;
    },
    saveEvent() {
      if (this.model.title) {
        let event = {
          ...this.model,
          allDay: true
        };
        this.calendarEvents.push(JSON.parse(JSON.stringify(event)));

        this.model = {
          title: "",
          eventColor: "bg-danger",
          start: "",
          end: ""
        };
      }
      this.showAddModal = false;
    },
    editEvent() {
      let index = this.calendarEvents.findIndex(
        e => e.title === this.model.title
      );
      if (index !== -1) {
        this.calendarEvents.splice(index, 1, this.model);
      }
      this.showEditModal = false;
    },
    deleteEvent() {
      let index = this.calendarEvents.findIndex(
        e => e.title === this.model.title
      );
      if (index !== -1) {
        this.calendarEvents.splice(index, 1);
      }
      this.showEditModal = false;
    }
  }
};
</script>
<style lang="scss">
//@import "~/assets/css/vendors/_fullcalendar_timeline.css";
//@import "@fullcalendar/core/main.css";
//@import '@fullcalendar/daygrid/main.css';
//@import '@fullcalendar/timegrid/main.css';
//@import "~/assets/sass/core/vendors/_fullcalendar.scss";
//@import '@fullcalendar/resource-timeline/main.css';
//@import '@fullcalendar/timeline/main.css';
</style>
