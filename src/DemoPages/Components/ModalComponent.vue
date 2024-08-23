<template>
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "ModalComponent",
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      title: {
      type: String,
      default: 'Default Title',
    },
    },
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
    },
  };
  </script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 500px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  max-width: 500px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  margin-top: 10px;
  text-align: right;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
  </style>