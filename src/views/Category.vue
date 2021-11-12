<template>
  <BasicLayout>
    <h1>Category</h1>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';

export default {
  name: 'Category',
  components: {
    BasicLayout,
  },
  watch: {
    $route(to) {
      console.log('to', to.params.category_slug);
    },
  },
  setup() {
    const category = ref('');
    const route = useRoute();

    onMounted(() => {
      category.value = route.params.category_slug;
    });

    return {};
  },
};
</script>

<style>

</style>
