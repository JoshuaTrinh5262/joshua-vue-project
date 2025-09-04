<template>
  <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
  <tabs-component>
    <tab-component title="Detail">
      <div v-if="product">
        <div class="form">
          <div class="position-relative form-group">
            <label for="id">Product Id</label>
            <input name="id" id="id" type="text" v-model=product.id class="form-control" disabled>
          </div>
          <div class="position-relative form-group">
            <label for="name">Name</label>
            <input name="name" id="name" type="text" v-model=product.name class="form-control" disabled>
          </div>
          <div class="position-relative form-group">
            <label for="category">Category</label>
            <select name="category" id="category" v-model=product.category class="form-control" disabled>
              <option value="structure_deck">Structure Deck</option>
              <option value="starter_deck">Starter Deck</option>
              <option value="prize_card">Prize Card</option>
              <option value="tactical_try_deck">Tactical Try Deck</option>
              <option value="dual_set">Dual Set</option>
              <option value="booster_pack">Booster Pack</option>
            </select>
          </div>
          <div class="position-relative form-group">
            <label for="prefix">Prefix</label>
            <input name="prefix" id="prefix" placeholder="prefix" type="text" v-model=product.prefix
              class="form-control" disabled>
            <small class="text-danger"></small>
          </div>
          <div class="position-relative form-group">
            <label for="release_date">Release Date</label>
            <input name="release_date" id="release_date" placeholder="Release Date" type="date"
              v-model=product.release_date class="form-control" disabled>
          </div>
          <div class="position-relative form-group">
            <label for="format">Format</label>
            <input name="format" id="format" placeholder="Format" type="text" v-model=product.format
              class="form-control" disabled>
          </div>
          <div class="position-relative form-group">
            <label for="created_at">created At</label>
            <input name="created_at" id="created_at" type="text" v-model=product.created_at class="form-control"
              disabled>
          </div>
          <div class="position-relative form-group">
            <button class="btn btn-primary mr-2">Edit</button>

            <button class="btn btn-primary mr-2">Cancel</button>
            <button class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </tab-component>
    <tab-component title="Card List">
      <div v-if="product">
        <div class="position-relative form-group">
          <button v-if=!editMode class="btn btn-primary mr-2" @click="toggleEditMode">Edit</button>
          <div v-else>
            <button class="btn btn-success mr-2" @click="handleSubmit">Save</button>
            <button class="btn btn-warning" @click="toggleEditMode">Cancel</button>
          </div>
        </div>
        <div class="position-relative form-group">
          <label for="number_of_cards">Number Of Cards</label>
          <input name="number_of_cards" id="number_of_cards" type="number" v-model=product.number_of_cards
            class="form-control" :disabled="!editMode">
        </div>
        {{product.card_list}}
        <!-- <div class="position-relative form-group">
          <label for="card_list">Card List</label>
          <textarea name="card_list" id="card_list" v-model= rows="10" class="form-control"
            :disabled="!editMode"></textarea>
        </div> -->
      </div>
    </tab-component>
  </tabs-component>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";
import TabsComponent from "@/Layout/Components/Tabs/TabsComponent.vue";
import TabComponent from "@/Layout/Components/Tabs/TabComponent.vue";
import { apiService } from "@/supabase/apiService";
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "ProductDetailPage",

  components: {
    PageTitleComponent,
    TabsComponent,
    TabComponent
  },


  setup() {
    const heading = ref("Product Detail");
    const subheading = ref("Product Detail Page");
    const icon = ref("pe-7s-portfolio icon-gradient bg-tempting-azure");
    const route = useRoute();

    const product = ref(null);

    const editMode = ref(false);

    const fetchProduct = async (id) => {
      try {
        const response = await apiService.getYugiohProductById(id);
        product.value = response;
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    onMounted(async () => {
      const id = route.params.id;
      await fetchProduct(id);
    });

    const toggleEditMode = () => {
      console.log("toggle");
      editMode.value = !editMode.value;
    };

    const handleSubmit = () => {
      console.log("submit");
    };

    onMounted(async () => {
      const id = route.params.id;
      await fetchProduct(id);
    });
  
    return {
      heading,
      subheading,
      icon,
      product,
      editMode,
      toggleEditMode,
      handleSubmit
    };
  },
});
</script>
