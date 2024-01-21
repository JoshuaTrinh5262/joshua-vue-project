<!-- <template>
  <div>
    <label class="mb-2 mt-4 block px-2 text-sm font-medium" v-if="label">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      @input="updateModelValue"
      :type="type"
      class="block w-full rounded-lg bg-zinc-200 p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-zinc-800 dark:placeholder-zinc-400 dark:focus:ring-blue-600"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    modelValue: String,
  },
  methods: {
    updateModelValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script> -->