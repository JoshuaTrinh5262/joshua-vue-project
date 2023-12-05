<template>
    <div v-if="notification !== null" class="alert notification" :class="`alert-${notification.type}`">
        <div class="d-flex align-items-start">
            <div class="flex-1">
                <h4 class="alert-heading" v-if="notification.title">{{ notification.title }}</h4>
                <p :class="{ 'mt-1': notification.title }">{{ notification.content }}</p>
            </div>
            <button @click="closeNotification" class="close">
              <span>x</span>
            </button>
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
    data() {
      return {
      };
    },

    methods: {
      closeNotification() {
        this.$emit('update:notification', null);
      },
    },

    mounted() {
      setTimeout(() => {
        this.closeNotification();
      }, 6000);
    },

  };
  </script>

<style scoped>
  .notification {
    position: fixed;
    top: 70px;
    right: 50px;
    z-index: 1050;
  }
</style>
