<template>
  <page-title-component :heading="heading" :subheading="subHeading" :icon="icon"></page-title-component>
  <notification-component v-model:notification="notification"></notification-component>

  <div class="chatgroup">
    <div class="chatgroup-sidebar">
      <div class="input-group new-chatgroup">
        <div class="input-group-prepend">
          <button type="button" class="btn btn-primary" @click="newChatgroup">New Chat</button>
        </div>
        <input v-model="newChatgroupName" placeholder="Enter New Group Name" name="new_chatgroup_name" type="text"
          class="form-control">
      </div>
      <div class="chatgroup-list">
        <button :key="chat.id" v-for="chat in chatGroups" :class="{ 'active': currentChat?.id == chat.id }"
          class="btn btn-outline-success sidebar-button" @click="selectChatGroup(chat)">
          {{ chat.name }}
          <i class="pe-7s-trash" @click.stop="deleteChatGroup(chat.id)"></i>
        </button>
      </div>
    </div>
    <div class="chatgroup-container">
      <div class="chatgroup-box">
        <template v-if="currentChat">
          <div v-for="(message, index) in currentChat.message" :key="message.id">
            <div v-if="index % 2 == 0" class="chatgroup-message">
              <img class="profile" width="40" height="40" src="@/assets/images/avatars/0.jpg" />
              <div class="message-content">{{ message.content }}</div>
              <i class="pe-7s-trash ml-auto" @click="deleteMessage(message.id)"></i>
            </div>
            <div v-else class="chatgroup-message">
              <img class="profile" width="40" height="40" src="@/assets/images/avatars/default.jpg" />
              <div class="message-content">{{ message.content }}</div>
              <i class="pe-7s-trash ml-auto" @click="deleteMessage(message.id)"></i>
            </div>
          </div>
        </template>
      </div>
      <div class="chat-input">
        <div class="input-group">
          <input v-model="userInput" placeholder="Enter your chat here" name="new_chat_message" type="text"
            class="form-control">
          <div class="input-group-append">
            <button type="button" class="btn btn-primary" @click="sendMessage">Send message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";
import NotificationComponent from "../../Layout/Components/NotificationComponent.vue";
import { apiService } from "../../supabase/apiService";

export default defineComponent({
  name: "ChatGroupPage",
  components: {
    PageTitleComponent,
    NotificationComponent
  },

  setup() {
    const heading = ref("Chatgroup");
    const subHeading = ref("Chatgroup demo");
    const icon = ref("pe-7s-chat icon-gradient bg-premium-dark");

    const currentChat = ref({
      id: null,
      message: []
    });
    const userInput = ref("");
    const chatGroups = ref([]);
    const notification = ref(null);
    const newChatgroupName = ref(null);

    const getChatgroupData = async () => {
      try {
        const result = await apiService.getChatgroupsWithMessage();
        if (!result.error) {
          chatGroups.value = result.items;
        } else {
          console.error("Error:", result.error);
        }
      } catch (error) {
        console.error("Error fetching chatgroups:", error);
      }
    };

    const selectChatGroup = (chat) => {
      currentChat.value = chat;
    };

    const deleteChatGroup = async (chatId) => {
      try {
        const result = await apiService.deleteChatgroup(chatId);
        chatGroups.value = chatGroups.value.filter(chat => chat.id !== chatId);
        notification.value = {
          title: "Success",
          content: "Chatgroup deleted successfully!",
          type: "success"
        };
      } catch (error) {
        notification.value = {
          title: "Error",
          content: `Error when deleting chatgroup: ${error.message}`,
          type: "danger"
        };
      }
    };

    const deleteMessage = async (messageId) => {
      try {
        const result = await apiService.deleteMessage(messageId);
        currentChat.value.message = currentChat.value.message.filter(m => m.id !== messageId);
        notification.value = {
          title: "Success",
          content: "Message deleted successfully!",
          type: "success"
        };
      } catch (error) {
        notification.value = {
          title: "Error",
          content: `Error when deleting Message: ${error.message}`,
          type: "danger"
        };
      }
    };

    const newChatgroup = async () => {
      if (newChatgroupName.value) {
        const newChatgroup = {
          name: newChatgroupName.value
        };

        try {
          await apiService.createChatgroup(newChatgroup);
          chatGroups.value.push(newChatgroup);
          newChatgroupName.value = null;
          notification.value = {
            title: "Success",
            content: "Created new chatgroup successfully!",
            type: "success"
          };
        } catch (error) {
          notification.value = {
            title: "Error",
            content: `Error when creating new chatgroup: ${error.message}`,
            type: "danger"
          };
        }
      } else {
        notification.value = {
          title: "Error",
          content: "Please Input New Chat Group Name.",
          type: "danger"
        };
      }

    };

    const sendMessage = async () => {
      if (currentChat.value && userInput.value.trim()) {
        const newMessage = {
          content: userInput.value,
          chatgroup_id: currentChat.value.id
        };

        try {
          await apiService.createMessage(newMessage);
          currentChat.value.message.push({ ...newMessage });
          userInput.value = "";
          notification.value = {
            title: "Success",
            content: "Message sent successfully!",
            type: "success"
          };
        } catch (error) {
          notification.value = {
            title: "Error",
            content: `Error when sending message: ${error.message}`,
            type: "danger"
          };
        }
      }
    };

    onMounted(() => {
      getChatgroupData();
    });

    return {
      heading,
      subHeading,
      icon,
      currentChat,
      userInput,
      chatGroups,
      notification,
      newChatgroupName,
      selectChatGroup,
      deleteChatGroup,
      newChatgroup,
      deleteMessage,
      sendMessage
    };
  }
});
</script>

<style scoped>
.chatgroup {
  padding-bottom: 10px;
  height: 100vh;
  display: flex;
}

.chatgroup-sidebar {
  flex: 1;
  height: 100%;
  border: 1px solid #69aa8a;
  overflow-y: auto;
}

.chatgroup-sidebar .new-chatgroup {
  margin-bottom: 10px;
}

.chatgroup-sidebar .sidebar-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.chatgroup-container {
  flex: 2;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.chatgroup-box {
  flex: 1;
  height: 100%;
  border: 1px solid #69aa8a;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.chatgroup-box .chatgroup-message {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding: 5px;
  color: white
}

.chatgroup-box .profile {
  border-radius: 50%;
  margin-right: 0.5rem;
}

.chat-input {
  margin-top: 1px;
}
</style>
