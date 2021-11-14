<template>
  <BasicLayout>
    <h1>{{ categoryCap }}</h1>
    <div class="ui grid">
      <article
        class="sixten wide mobile eight wide tablet four wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product" />
      </article>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import { getProductCategory } from '@/api/product';

import BasicLayout from '@/layouts/BasicLayout.vue';
import Product from '@/components/Product.vue';

export default {
  name: 'Category',
  components: {
    BasicLayout,
    Product,
  },
  watch: {
    $route(to) {
      this.populateProducts(to.params.category_slug);
    },
  },
  setup() {
    const products = ref(null);
    const category = ref('');
    const { params } = useRoute();

    const populateProducts = async (categorySlug) => {
      category.value = categorySlug;
      const response = await getProductCategory(categorySlug, 5, 0);
      products.value = response;
    };

    onMounted(async () => {
      category.value = params.category_slug;
      populateProducts(category.value);
    });

    const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());

    let categoryCap = computed(() => {
      let result = capitalize(category.value);
      return result;
    });

    return {
      category,
      products,
      categoryCap,
      populateProducts,
    };
  },
};
</script>

<style>

</style>
