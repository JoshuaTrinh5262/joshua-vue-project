<!-- <template>
  <div>
    <label class="mb-2 mt-4 block px-2 text-sm font-medium" v-if="label">
      {{ label }}
    </label>
    <button
      :class="modelValue ? 'bg-indigo-600' : 'bg-gray-200'"
      class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      @click="toggle"
      role="switch"
      :aria-checked="modelValue"
    >
      <span
        :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
        aria-hidden="true"
        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
      ></span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      require: false,
    },
    modelValue: {
      type: Boolean,
      require: true,
    },
  },
  methods: {
  }

  setup(props, { emit }) {
    const toggleState = ref(props.modelValue);

    const toggle = () => {
      toggleState.value = !toggleState.value;
      emit("update:modelValue", toggleState.value);
    };

    watchEffect(() => {
      toggleState.value = props.modelValue;
    });

    return {
      toggleState,
      toggle,
    };
  },
};
</script> -->