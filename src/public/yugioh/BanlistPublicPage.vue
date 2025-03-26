<template>
  <breadcrumb-component></breadcrumb-component>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title" for="selected_banlist">Selected Banlist</h3>
      <div class="form-inline">
        <div class="position-relative form-group">
          <select
            id="selected_banlist"
            v-model="selectedBanlist"
            class="form-control mr-2"
          >
            <option
              v-for="(banlist, index) in banlists"
              :key="index"
              :value="banlist.id"
            >
              {{ banlist.name }}
            </option>
          </select>
        </div>
        <button-spinner :isLoading="onSubmit" buttonClass="btn btn-primary" @click="getYugiohBanlistDetailData"
        :normalText="Submit" />
      </div>
    </div>
    <div v-if="banlistDetail.length == 0" class="card-body">
      Banlist is empty
    </div>
    <div
      v-else
      class="card-body"
      v-for="(detail, index) in banlistDetail"
      :key="index"
    >
      <h3 class="card-title">{{ index }} ({{ detail.length }})</h3>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(card, index) in detail"
          :key="index"
        >
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-3">
                <img
                  width="40"
                  height="60"
                  :src="'/photo-coming-soon-holder.png'"
                  :alt="card.yugioh_card?.name"
                />
              </div>
              <div class="widget-content-left" style="min-width: 250px">
                <div class="widget-heading">{{ card.yugioh_card?.name }}</div>
                <div class="widget-subheading">
                  {{ card.yugioh_card?.category }}
                </div>
              </div>
              <div class="widget-content-left">
                <p>{{ card.yugioh_card?.description }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import BreadcrumbComponent from "../../Layout/Components/BreadcrumbComponent.vue";
import ModalComponent from "../../Layout/Components/ModalComponent.vue";
import ButtonSpinner from "../../Layout/Components/ButtonSpinner.vue";
import { apiService } from "../../supabase/apiService";

export default defineComponent({
  name: "YugiohBanlistPublicPage",

  components: {
    BreadcrumbComponent,
    ModalComponent,
    ButtonSpinner,
  },

  setup() {
    const selectedBanlist = ref(1);
    const banlists = ref([]);
    const banlistDetail = ref([]);

    const getYugiohBanlistData = async () => {
      const result = await apiService.getYugiohBanlists();
      if (!result.error) {
        banlists.value = result;
      }
    };

    const getYugiohBanlistDetailData = async () => {
      const result = await apiService.getYugiohBanlistById(
        selectedBanlist.value
      );
      if (!result.error) {
        console.log(result);
        banlistDetail.value = result;
      }
    };
    onMounted(async () => {
      await getYugiohBanlistData();
    });

    return {
      selectedBanlist,
      banlists,
      banlistDetail,
      getYugiohBanlistDetailData,
    };
  },
});
</script>
