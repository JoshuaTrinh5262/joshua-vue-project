<template>
    <div class="datetime-picker">
      <label for="date">Date:</label>
      <input type="date" v-model="date" @input="updateDateTime" />
  
      <label for="time">Time:</label>
      <input type="time" v-model="time" @input="updateDateTime" />
  
      <div v-if="formattedDateTime">
        Selected Date and Time: {{ formattedDateTime }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        date: '',
        time: '',
        formattedDateTime: '',
      };
    },
    methods: {
      updateDateTime() {
        if (this.date && this.time) {
          this.formattedDateTime = `${this.date} ${this.time}`;
        } else {
          this.formattedDateTime = '';
        }
        this.$emit('input', this.formattedDateTime);
      },
    },
  };
  </script>
  
  <style scoped>
  .datetime-picker {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  label {
    margin-right: 10px;
  }
  
  input {
    padding: 5px;
    font-size: 14px;
  }
  
  div {
    margin-top: 10px;
    font-weight: bold;
  }
  </style>