<template>
    <div class="alert" :class="`alert-${notification.type}`">
        <div class="d-flex align-items-start">
            <div class="me-3">
            </div>
            <div class="flex-1">
                <h4 class="alert-heading" v-if="notification.title">{{ notification.title }}</h4>
                <p :class="{ 'mt-1': notification.title }">{{ notification.content }}</p>
            </div>
            <div class="ms-3">
                <button @click="closeNotification" type="button" class="btn-close" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: "NotificationComponent",

    props: {
      notification: {
        type: Object,
        require: false,

    },
    },
    methods: {
      closeNotification() {

      },
    },
  };
  </script>
