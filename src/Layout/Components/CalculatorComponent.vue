<template>
  <div class="calculator">
    <!-- Calculator Result -->
    <div class="w-full rounded m-1 p-3 text-end lead fw-bold text-white bg-vue-dark">
      {{ calculatorValue || 0}}
    </div>  

    <!-- Calculator Buttons -->
    <div class="row g-0">
      <div class="col-3" v-for="btn in calcBtns" :key="btn">
        <div 
        class="lead text-white text-center m-1 py-3 bg-vue-dark rounded btn-hover"
        :class="{'bg-vue-green': ['C', '*', '/', '+', '-', '=', '%'].includes(btn)}"
        @click="action(btn)"
          >
          {{ btn }}
        </div>
      </div>
    </div>
  </div>    
</template>


<script>
export default {
  name: "CalculatorComponent",
  props: {
    msg: String
  },

  data() {
    return {
      calculatorValue: "",
      calcBtns: ["C", "%", "=", "+", 7, 8, 9,"-", 4, 5, 6,"*", 1, 2, 3, "/", 0, "."],
      operators: null,
      prevCalcVal: ""
    }
  }, 
  methods: {
    action(btn) {
      if(!isNaN(btn) || btn === ".")
      {
        this.calculatorValue += btn +"";
      }

      if (btn === "C") {
        this.calculatorValue = "";
      }

      if (btn === "%") {
        this.calculatorValue = this.calculatorValue / 100 + "";
      }

      if (["/", "+", "-", "*"].includes(btn)) {
        this.operators = btn
        this.prevCalcVal = this.calculatorValue
        this.calculatorValue = ""
      }

      if (btn === "=") {
          this.calculatorValue = eval(
            this.prevCalcVal + this.operators + this.calculatorValue
            );
          this.prevCalcVal = "";
          this.operators = null;
      }
    }
  },
}
</script>

<style scoped>
.calculator {
  max-width: 400px;
  margin: 50px auto;
  background-color: #234;
  padding: 1rem;
}
.bg-vue-dark{
  background: #31475e;
}

.btn-hover:hover{
  cursor: pointer;
  background: #3D5875;
}

.bg-vue-green{
  background: #3fb984 ;
}
</style>