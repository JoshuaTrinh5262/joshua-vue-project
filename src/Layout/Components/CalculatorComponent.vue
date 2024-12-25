<template>
  <div class="calculator">
    <div class="w-full rounded m-1 p-3 text-end lead fw-bold text-white bg-vue-dark">
      {{ calculatorValue || 0 }}
    </div>

    <div class="row g-0">
      <div class="col-3" v-for="btn in calcBtns" :key="btn">
        <div class="lead text-white text-center m-1 py-3 bg-vue-dark rounded btn-hover"
          :class="{ 'bg-vue-green': ['C', '*', '/', '+', '-', '=', '%'].includes(btn) }" @click="action(btn)">
          {{ btn }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CalculatorComponent",
  props: {
    msg: String
  },

  setup() {
    const calculatorValue = ref("");
    const calcBtns = ref(["C", "%", "=", "+", 7, 8, 9, "-", 4, 5, 6, "*", 1, 2, 3, "/", 0, "."]);
    const operators = ref(null);
    const prevCalcVal = ref("");

    const action = (btn) => {
      if (!isNaN(btn) || btn === ".") {
        calculatorValue.value += btn + "";
      }

      if (btn === "C") {
        calculatorValue.value = "";
      }

      if (btn === "%") {
        calculatorValue.value = (calculatorValue.value / 100) + "";
      }

      if (["/", "+", "-", "*"].includes(btn)) {
        operators.value = btn;
        prevCalcVal.value = calculatorValue.value;
        calculatorValue.value = "";
      }

      if (btn === "=") {
        calculatorValue.value = eval(
          prevCalcVal.value + operators.value + calculatorValue.value
        );
        prevCalcVal.value = "";
        operators.value = null;
      }
    };

    return {
      calculatorValue,
      calcBtns,
      action
    };
  }
});
</script>

<style scoped>
.calculator {
  max-width: 400px;
  margin: 50px auto;
  background-color: #234;
  padding: 1rem;
}

.bg-vue-dark {
  background: #31475e;
}

.btn-hover:hover {
  cursor: pointer;
  background: #3D5875;
}

.bg-vue-green {
  background: #3fb984;
}
</style>
