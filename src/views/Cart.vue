<template>
  <BasicLayout>
    <h1>Cart</h1>

    <table class="ui celled table" v-if="products">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>{{ product.quantity }}</td>
          <td>$ {{ product.price }}</td>
          <td style="text-align: center">
            <i class="close icon" @click="deleteAllProductCart(product.slug)"></i>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            Total:
          </td>
          <td colspan="2">$ {{ getTotal() }}</td>
        </tr>
      </tbody>
    </table>

    <button
      class="ui button primary fluid"
      v-if="products"
      @click="createOrder"
    >
      Create order
    </button>

    <h3 v-if="!products">There's no products in your cart.</h3>
  </BasicLayout>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import jwtDecode from 'jwt-decode';
import BasicLayout from '@/layouts/BasicLayout.vue';
import { getProductsCartApi, removeAllProductCartApi, removeCartApi } from '@/api/cart';
import { createOrderApi } from '@/api/order';
import { getTokenApi } from '@/api/token';

export default {
  name: 'Cart',
  components: {
    BasicLayout,
  },
  setup() {
    let products = ref(null);
    let reloadCart = ref(false);
    const router = useRouter();

    watchEffect(async () => {
      // eslint-disable-next-line no-unused-expressions
      reloadCart.value;
      const response = await getProductsCartApi();
      products.value = response;
    });

    const getTotal = () => {
      let totalTemp = 0;

      products.value.forEach((product) => {
        totalTemp += product.price * product.quantity;
      });

      return totalTemp.toFixed(2);
    };

    const deleteAllProductCart = (slug) => {
      removeAllProductCartApi(slug);
      reloadCart.value = !reloadCart.value;
    };

    const createOrder = async () => {
      const token = getTokenApi();
      const { id } = jwtDecode(token);
      console.log(id);

      const data = {
        user: id,
        total: getTotal(),
        data: products.value,
      };

      try {
        await createOrderApi(data);
        removeCartApi();
        router.push({ name: 'Orders' });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      products,
      getTotal,
      createOrder,
      deleteAllProductCart,
    };
  },
};
</script>

<style>

</style>
