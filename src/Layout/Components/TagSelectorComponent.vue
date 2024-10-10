<template>
    <div class="tag-container">
        <div class="tags">
            <div v-if="selected.length === 0">No selected value.</div>
            <span v-for="item in selected" :key="item.id" class="tag">
                {{ item.name }}
                <button class="remove-tag" @click="removeItem(item)">x</button>
            </span>
        </div>
        <input type="text" placeholder="Search..." v-model="searchQuery" class="form-control search-input" />
        <select @change="updateSelectedItems" multiple class="form-control">
            <option v-for="item in filteredItems" :key="item.id" :value="item.id">
                {{ item.name }}
            </option>
        </select>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';

export default defineComponent({
    name: 'TagSelector',
    props: {
        items: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: Array,
            default: () => [],
        },
    },
    setup(props, { emit }) {
        const selected = ref([...props.modelValue]);
        const searchQuery = ref('');

        const filteredItems = computed(() => {
            return props.items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        });

        const isSelected = (item) => {
            return selected.value.some(selectedItem => selectedItem.id === item.id);
        };

        const removeItem = (item) => {
            selected.value = selected.value.filter(i => i.id !== item.id);
            emit('update:modelValue', selected.value);
        };

        const updateSelectedItems = (event) => {
            const selectedOptions = Array.from(event.target.selectedOptions);
            selectedOptions.forEach(option => {
                const itemId = option.value;
                const item = props.items.find(i => i.id === itemId);

                if (item) {
                    if (isSelected(item)) {
                        selected.value = selected.value.filter(i => i.id !== item.id);
                    } else {
                        selected.value.push(item);
                    }
                }
            });

            emit('update:modelValue', selected.value);
        };

        watch(() => props.modelValue, (newVal) => {
            selected.value = [...newVal];
        }, { immediate: true });

        return {
            selected,
            searchQuery,
            filteredItems,
            removeItem,
            updateSelectedItems,
            isSelected,
        };
    },
});
</script>


<style scoped>
.tag-container {
    margin-top: 10px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
}

.tag {
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    display: flex;
    align-items: center;
}

.remove-tag {
    background: none;
    border: none;
    color: white;
    margin-left: 5px;
    cursor: pointer;
}
</style>