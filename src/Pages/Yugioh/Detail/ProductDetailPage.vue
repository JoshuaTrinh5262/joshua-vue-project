<template>
  <page-title-component :heading="heading" :subheading="subheading" :icon="icon"></page-title-component>
  <tabs-component>
    <tab-component title="Detail">
        <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
  </div>
      {{ product }}
    </tab-component>
    <tab-component title="Card List">
    </tab-component>
  </tabs-component>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
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

    return {
      heading,
      subheading,
      icon,
      product,
    };
  },
});
</script>
