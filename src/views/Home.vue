<template>
  <BasicLayout>
    <h1>Latest products</h1>
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
import { ref, onMounted } from 'vue';
import { getProducts } from '@/api/product';
import Product from '@/components/Product.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';

export default {
  name: 'Home',
  components: {
    BasicLayout,
    Product,
  },
  setup() {
    const products = ref(null);

    onMounted(async () => {
      const response = await getProducts(5, 0);
      products.value = response;
    });

    return {
      products,
    };
  },
};
</script>
