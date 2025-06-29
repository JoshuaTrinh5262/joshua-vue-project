<template>
  <div class="timer">
    <div v-if="timeLeft > 0">
      <span>{{ formattedTime }}</span>
    </div>
    <div v-else-if="timeLeft === 0 && hasStarted">
      <span>Time's up!</span>
    </div>

    <div class="progress mt-3">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        :style="{ width: (timeLeft / totalSeconds) * 100 + '%' }"
        role="progressbar"
        :aria-valuenow="timeLeft"
        aria-valuemin="0"
        :aria-valuemax="totalSeconds"
      >
        {{ timeLeft }}
      </div>
    </div>

    <div class="controls">
      <input
        type="number"
        v-model.number="inputMinutes"
        min="1"
        placeholder="Minutes"
      />
      <button @click="setTimer" class="btn btn-primary">Set Timer</button>
      <button @click="pause" class="btn btn-secondary">
        {{ isPaused ? "Resume" : "Pause" }}
      </button>
      <button @click="reset" class="btn btn-danger">Reset</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent, onUnmounted } from "vue";

export default defineComponent({
  name: "TimerComponent",
  emits: ["finished"],

  setup(_, { emit, expose }) {
    const inputMinutes = ref(1);
    const timeLeft = ref(0);
    const totalSeconds = ref(0);
    const hasStarted = ref(false);
    const isPaused = ref(false);
    let timer = null;

    const formattedTime = computed(() => {
      const h = Math.floor(timeLeft.value / 3600)
        .toString()
        .padStart(2, "0");
      const m = Math.floor((timeLeft.value % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const s = (timeLeft.value % 60).toString().padStart(2, "0");
      return `${h}:${m}:${s}`;
    });

    const tick = () => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(timer);
        emit("finished");
      }
    };

    const setTimer = () => {
      if (inputMinutes.value < 1) return;
      clearInterval(timer);
      totalSeconds.value = inputMinutes.value * 60;
      timeLeft.value = totalSeconds.value;
      hasStarted.value = true;
      start();
    };

    const start = () => {
      clearInterval(timer);
      timer = setInterval(tick, 1000);
    };

    const pause = () => {
      if (isPaused.value) {
        // Resume
        start();
        isPaused.value = false;
      } else {
        // Pause
        clearInterval(timer);
        isPaused.value = true;
      }
    };
    const reset = () => {
      clearInterval(timer);
      timeLeft.value = totalSeconds.value;
    };

    onUnmounted(() => {
      clearInterval(timer);
    });

    expose({ start, pause, reset, setTimer });

    return {
      inputMinutes,
      timeLeft,
      totalSeconds,
      formattedTime,
      setTimer,
      start,
      pause,
      reset,
      hasStarted,
      isPaused
    };
  },
});
</script>

<style scoped>
.timer {
  font-family: monospace;
  font-size: 2rem;
  color: #e76f51;
  margin: auto;
  text-align: center;
}

.progress {
  height: 30px;
  margin-top: 1rem;
}

.controls {
  margin-top: 2rem;
}

input {
  width: 100px;
  padding: 0.4rem;
  margin-right: 0.5rem;
}
button {
  margin-right: 0.5rem;
}
</style>
