<template>
  <BasicLayout>
    <h2>We're at home</h2>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getProducts } from '@/api/product';
import BasicLayout from '@/layouts/BasicLayout.vue';

export default {
  name: 'Home',
  components: {
    BasicLayout,
  },
  setup() {
    let products = ref(null);
    let next = ref(0);

    onMounted(async () => {
      const response = await getProducts(5, 0);
      next.value = response.next;
      products.value = response;
    });

    return {
      products,
    };
  },
};
</script>
