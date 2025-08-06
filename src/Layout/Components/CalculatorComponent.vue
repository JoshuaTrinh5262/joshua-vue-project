<template>
  <div class="calculator">
    <div class="display">
      {{ calculatorValue || 0 }}
    </div>

    <div class="btn-row">
      <div class="btn-col" v-for="btn in calcBtns" :key="btn">
        <div class="button"
          :class="{ 'operator': ['C', '*', '/', '+', '-', '=', '%'].includes(btn) }"
          @click="action(btn)">
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

