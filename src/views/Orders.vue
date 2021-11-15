<template>
  <BasicLayout>
    <h1>My orders</h1>

    <p v-if="!orders">You have no orders yet.</p>

    <template v-if="orders">
      <div class="order" v-for="order in orders" :key="order.id">
        <div class="header">
          <span class="date">{{ formatDate(order.created_at) }}</span>
          <p>Id: {{ order.id }}</p>
          <p>Total: $ {{ order.total }}</p>
        </div>

        <div class="products">
          <div class="product" v-for="product in order.data" :key="product.id">
            <div>
              <img
                class="ui image"
                :src="appendEndpointToHost(product.image[0].url)"
                :alt="product.title"
              >
              <p>{{ product.title }}</p>
            </div>

            <div>
              {{ product.quantity }} x $ {{ product.price }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import 'moment/locale/es';
import BasicLayout from '@/layouts/BasicLayout.vue';
import { getOrdersApi } from '@/api/order';
import { getTokenApi } from '@/api/token';
import { appendEndpointToHost } from '@/utils/paths';

export default {
  name: 'Orders',
  components: {
    BasicLayout,
  },
  setup() {
    let orders = ref(null);

    onMounted(async () => {
      const token = getTokenApi();
      const { id } = jwtDecode(token);
      const response = await getOrdersApi(id);

      console.log(response);

      orders.value = response;
    });

    const formatDate = (date) => moment(date).format('L [a las] LT');

    return {
      orders,
      formatDate,
      appendEndpointToHost,
    };
  },
};
</script>

<style lang="scss" scoped>
.order {
  border: 1px solid #000;
  margin-top: 40px;
  margin-bottom: 20px;

  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    p {
      margin: 0;
    }

    span {
      position: absolute;
      top: -20px;
      left: 0;
      font-size: 12px;
    }
  }

  .products {
    border-top: 1px solid #000;

    .product {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 30px;

      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .ui.image {
      width: 50px;
    }
  }
}
</style>
