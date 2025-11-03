<template>
    <div class="timers-container">
        <div class="text-center pb-3">
            <h2 class="mb-3">Countdown Timers</h2>
            <button type="button" @click="toggleModal" class="btn btn-primary">
                Add Timer
            </button>
        </div>

        <modal-component title="Add Timer" :isOpen="showModal" @closeModal="toggleModal">
            <template #body>
                <div class="form">
                    <div class="position-relative form-group">
                        <label for="user_email">Timer name</label>
                        <input v-model="newTimerName" type="text" placeholder="Timer name" class="form-control" />
                    </div>
                    <div class="form-row">
                        <div class="col-md-4">
                            <div class="position-relative">
                                <label for="hours" class="">Hours</label>
                                <input name="hours" id="hours" type="number" class="form-control"
                                    v-model.number="newTimerHours">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="position-relative">
                                <label for="minutes" class="">Minutes</label>
                                <input name="minutes" id="minutes" type="number" class="form-control"
                                    v-model="newTimerMinutes">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="position-relative">
                                <label for="seconds" class="">Seconds</label>
                                <input name="seconds" id="seconds" type="number" class="form-control"
                                    v-model.number="newTimerSeconds">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button class="btn btn-primary" @click="toggleModal">Cancel</button>
                <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="addTimer"
                    normalText="Add New User" />
            </template>
        </modal-component>

        <div v-for="(timer, index) in timers" :key="index" class="timer card p-3 mb-3 shadow-sm">
            <h4>{{ timer.name }}</h4>

            <div class="time-left" :class="{ 'text-primary': timer.timeLeft <= 0 }">
                {{ formatTimeDisplay(timer.timeLeft) }}
            </div>

            <div class="progress mt-3">
                <div class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="{ width: (timer.timeLeft / timer.totalSeconds) * 100 + '%' }" role="progressbar"
                    :aria-valuenow="timer.timeLeft" aria-valuemin="0" :aria-valuemax="timer.totalSeconds">
                    {{ timer.timeLeft }}
                </div>
            </div>

            <div class="controls mt-2 d-flex flex-wrap gap-2">
                <button @click="toggleTimer(timer)" class="btn btn-primary">
                    {{ !timer.hasStarted ? "Start" : timer.isPaused ? "Resume" : "Pause" }}
                </button>
                <button @click="editTimer(timer)" class="btn btn-secondary">
                    Edit
                </button>
                <button @click="resetTimer(timer)" class="btn btn-warning">
                    Reset
                </button>
                <button @click="removeTimer(index)" class="btn btn-danger">
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue";
import ModalComponent from "@/Layout/Components/ModalComponent.vue";
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";

export default defineComponent({
    name: "Public Timer Page",

    components: {
        ModalComponent,
        ButtonSpinner
    },

    setup() {
        const showModal = ref(false);

        const timers = ref([]);
        const newTimerName = ref("");
        const newTimerHours = ref(0);
        const newTimerMinutes = ref(0);
        const newTimerSeconds = ref(0);
        let interval = null;

        function addTimer() {
            const totalSeconds =
                (newTimerHours.value * 3600) +
                (newTimerMinutes.value * 60) +
                newTimerSeconds.value;

            if (!newTimerName.value || totalSeconds <= 0) {
                alert("Please enter a valid name and duration.");
                return;
            }

            timers.value.push({
                name: newTimerName.value,
                totalSeconds,
                timeLeft: totalSeconds,
                isPaused: true,
                hasStarted: false,
                addMinutes: 0,
            });

            // reset form
            newTimerName.value = "";
            newTimerHours.value = 0;
            newTimerMinutes.value = 0;
            newTimerSeconds.value = 0;
            toggleModal();
        }

        function toggleTimer(timer) {
            if (!timer.hasStarted) {
                timer.hasStarted = true;
                timer.isPaused = false;
                startCountdown();
                return;
            }

            timer.isPaused = !timer.isPaused;
        }

        function startCountdown() {
            if (interval) return;

            interval = setInterval(() => {
                timers.value.forEach((timer) => {
                    if (timer.hasStarted && !timer.isPaused) {
                        timer.timeLeft--;
                    }
                });
            }, 1000);
        }

        function editTimer(timer) {
        }

        function resetTimer(timer) {
            timer.timeLeft = timer.totalSeconds;
            timer.isPaused = true;
            timer.hasStarted = false;
        }

        function removeTimer(index) {
            timers.value.splice(index, 1);

            if (timers.value.length === 0 && interval) {
                clearInterval(interval);
                interval = null;
            }
        }

        function formatTimeDisplay(timeLeft) {
            const isOvertime = timeLeft < 0;
            const absTime = Math.abs(timeLeft);

            const hours = Math.floor(absTime / 3600);
            const minutes = Math.floor((absTime % 3600) / 60);
            const seconds = absTime % 60;

            const formatted =
                (hours > 0 ? String(hours).padStart(2, "0") + ":" : "") +
                String(minutes).padStart(2, "0") +
                ":" +
                String(seconds).padStart(2, "0");

            return isOvertime ? `+${formatted}` : formatted;
        }

        const toggleModal = () => {
            showModal.value = !showModal.value;
        };

        function saveTimers() {
            localStorage.setItem("timers", JSON.stringify(timers.value));
        }

        function loadTimers() {
            const saved = localStorage.getItem("timers");
            if (saved) {
                try {
                    timers.value = JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to parse timers:", e);
                }
            }
        }

        watch(
            timers,
            () => {
                saveTimers();
            },
            { deep: true }
        );

        onMounted(() => {
            loadTimers();
            startCountdown();
        });

        onUnmounted(() => {
            if (interval) {
                clearInterval(interval);
            }
        });

        return {
            timers,
            newTimerName,
            newTimerHours,
            newTimerMinutes,
            newTimerSeconds,
            showModal,
            addTimer,
            toggleTimer,
            editTimer,
            resetTimer,
            removeTimer,
            formatTimeDisplay,
            toggleModal
        };
    },
});
</script>

<style scoped>
.timers-container {
    padding: 10px;
}

.timer {
    font-family: monospace;
    color: #fff;
    margin: auto;
    text-align: center;
    font-size: 10rem;
}

.progress {
    height: 40px;
    margin-top: 1rem;
}

.controls {
    margin-top: 2rem;
}

input {
    margin-right: 0.5rem;
}

button {
    margin-right: 0.5rem;
}
</style>
