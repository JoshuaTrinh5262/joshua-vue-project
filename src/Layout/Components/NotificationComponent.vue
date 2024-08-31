<template>
  <div v-if="notification !== null" class="notification" :class="`alert-${notification.type}`">
    <div class="notification-heading">
      <div class="notification-title">{{ notification.title }}</div>
      <button @click="closeNotification" class="close">
        <span>&times;</span>
      </button>
    </div>
    <div class="notification-content">{{ notification.content }}</div>
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
  watch: {
    notification(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.closeNotification();
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.notification {
  border-radius: 5px;
  padding: 6px;
  min-width: 300px;
  position: fixed;
  top: 70px;
  right: 10px;
  z-index: 25;
  transform: translateX(100%);
  animation: slide-in 0.1s forwards;
}

.notification .notification-heading .notification-title {
  font-size: 1.25rem;
}

.notification .notification-content {
  padding: 5px;
}

.close {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.notification-heading {
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

.notification-heading .close {
  margin-left: auto;
  padding: 0;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
