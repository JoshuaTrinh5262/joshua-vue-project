<template>
  <page-title-component :heading="heading" :subheading="subheading" :icon="icon">
    <template v-slot:actions>
      <button type="button" @click="toggleModal" class="btn-shadow d-inline-flex align-items-center btn btn-primary">
        Add New Task
      </button>
    </template>
  </page-title-component>
  <notification-component v-model:notification="notification"></notification-component>
  <modal-component :title="'Add New Task'" :isOpen="showModal" @closeModal="toggleModal">
    <template #body>
      <div class="position-relative form-group">
        <label for="task_title">Task Title</label>
        <input name="task_title" id="task_title" placeholder="Task Title" type="text" v-model=currentTask.title
          class="form-control">
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="task_code">Task Code</label>
            <input name="task_code" id="task_code" placeholder="Task Code" type="text" v-model=currentTask.code
              class="form-control">
          </div>
        </div>
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="task_status">Task Status</label>
            <select name="select" id="task_status" class="form-control" v-model=currentTask.status>
              <option v-for="status in taskStatusOptions" :key="status">
                {{ status }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="task_status">Task Type</label>
            <select name="select" id="task_type" class="form-control" v-model=currentTask.type>
              <option v-for="status in taskTypeOptions" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="task_priority">Task Priority</label>
            <select name="task_priority" id="task_priority" class="form-control" v-model=currentTask.priority>
              <option v-for="priority in taskPriorityOptions" :key="priority" :value="priority">
                {{ priority }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="position-relative form-group">
        <label for="task_description">Task Description</label>
        <textarea rows="8" name="task_description" id="task_description" placeholder="Task Description" type="text"
          v-model=currentTask.description class="form-control"></textarea>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-primary" @click="toggleModal">Cancel</button>
      <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="handleSubmit"
        :normalText="'Add New Task'" />
    </template>
  </modal-component>
  <KanbanComponent :data="columns" @changeTaskStatus="updateTaskStatus"></KanbanComponent>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import KanbanComponent from "@/Pages/Kanban/KanbanComponent.vue";
import NotificationComponent from "@/Layout/Components/NotificationComponent.vue";
import ModalComponent from '@/Layout/Components/ModalComponent.vue';
import ButtonSpinner from "@/Layout/Components/ButtonSpinner.vue";
import { apiService } from "@/supabase/apiService";
import { TaskStatus, TaskPriority, TaskType } from "@/utils/enums";

export default defineComponent({
  name: "Kanban Page",

  components: {
    PageTitleComponent,
    KanbanComponent,
    NotificationComponent,
    ModalComponent,
    ButtonSpinner,
  },

  setup() {
    const heading = ref("Task");
    const subheading = ref("Task Page where I tracking my tasks.");
    const icon = ref("pe-7s-notebook icon-gradient bg-tempting-azure");

    const showModal = ref(false);
    const onSubmit = ref(false);
    const notification = ref(null)

    const currentPage = ref(0);
    const itemsPerPage = ref(20);
    const columns = ref([]);

    const taskStatusOptions = ref([]);
    const taskPriorityOptions = ref([]);
    const taskTypeOptions = ref([]);
    const currentTask = reactive({
      title: null,
      code: null,
      status: null,
      priority: null,
      type: null,
      description: null,
      assigned_to: "36e160b8-2dde-4793-a2f1-f2058bca0e46"
    });

    const getTasksData = async (newPage, newPageSize) => {
      const result = await apiService.getTasks(newPage, newPageSize);
      if (result) {
        columns.value = result;
      }
    };

    const getTaskStatus = () => {
      taskStatusOptions.value = TaskStatus;
    };

    const getTaskPriority = () => {
      taskPriorityOptions.value = TaskPriority;
    };

    const getTaskType = () => {
      taskTypeOptions.value = TaskType;
    };

    const createTask = async () => {
      try {
        await apiService.createTask(currentTask);
        cleanCurrentTask();
        toggleModal();
        onSubmit.value = false;
        notification.value = {
          title: "Success",
          content: "Task created successfully!",
          type: "success"
        };
        getTasksData();
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: "Error",
          content: `Error when submitting task: ${error}`,
          type: "danger"
        };
      }
    }

    const updateTaskStatus = async (updatedColumns, updatedTask) => {
      try {
        await apiService.updateTask({
          id: updatedTask.id,
          status: updatedColumns
        });

        notification.value = {
          title:
            "Success",
          content: `Changed Task with Id ${updatedTask.id} to ${updatedColumns}`,
          type: "success"
        };
      } catch (error) {
        onSubmit.value = false;
        notification.value = {
          title: "Error",
          content: `Error when update task: ${error}`,
          type: "danger"
        };
      }
    };

    const cleanCurrentTask = () => {
      Object.assign(currentTask, {
        title: null,
        code: null,
        status: null,
        priority: null,
        type: null,
        description: null,
        assigned_to: "36e160b8-2dde-4793-a2f1-f2058bca0e46"
      });

      if (currentTask.id) {
        delete currentTask.id;
      }
    };

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const handleSubmit = async () => {
      onSubmit.value = true;
      createTask();
    };

    onMounted(() => {
      getTasksData(currentPage.value, itemsPerPage.value);
      getTaskStatus();
      getTaskPriority();
      getTaskType();
    });

    return {
      heading,
      subheading,
      icon,
      showModal,
      onSubmit,
      notification,
      columns,
      taskStatusOptions,
      taskPriorityOptions,
      taskTypeOptions,
      currentTask,
      toggleModal,
      handleSubmit,
      updateTaskStatus,
    };
  },
});
</script>
