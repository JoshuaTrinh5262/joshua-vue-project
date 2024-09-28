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
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  name: "DateTimePicker",

  setup(props, { emit }) {
    const date = ref("");
    const time = ref("");

    const formattedDateTime = computed(() => {
      if (date.value && time.value) {
        return `${date.value} ${time.value}`;
      }
      return "";
    });

    const updateDateTime = () => {
      emit("input", formattedDateTime.value);
    };

    watch(formattedDateTime, updateDateTime);

    return {
      date,
      time,
      formattedDateTime,
      updateDateTime,
    };
  },
});
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
