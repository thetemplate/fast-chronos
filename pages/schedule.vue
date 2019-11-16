<template>
  <div>
      
    <div>
      <client-only>
        <resource-timeline></resource-timeline>
      </client-only>
    </div>

  </div>
</template>
<script>
  
  export default {
    layout: 'DashboardLayout',
    components: {
    }
  }
</script>

<style lang="scss">
    @import "@fullcalendar/core/main.css";
    @import '@fullcalendar/daygrid/main.css';
    @import '@fullcalendar/timegrid/main.css';
    @import '@fullcalendar/resource-timeline/main.css';
    @import '@fullcalendar/timeline/main.css';
    @import "~/assets/sass/core/vendors/_fullcalendar.scss";
</style>
