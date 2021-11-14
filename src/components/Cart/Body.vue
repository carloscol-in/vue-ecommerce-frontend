<template>
  <div class="cart-body" v-if="products">
    <div class="product" v-for="product in products" :key="product.id">
      <img
        class="ui image fluid"
        :src="appendEndpointToHost(product.image[0].url)"
        :alt="product.name"
      >
      <div class="info">
        <p>{{ product.title }}</p>

        <div class="price">
          <p>$ {{ product.price }}</p>
          <div class="quantity">
            <button
              class="ui button primary"
              size="large"
              @click="decreaseProductCart(product.slug)"
            >-</button>
            <p>{{ product.quantity }}</p>
            <button
              class="ui button primary"
              size="large"
              @click="increaseProductCart(product.slug)"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appendEndpointToHost } from '@/utils/paths';
import { addProductCartApi, removeProductCartApi } from '@/api/cart';

export default {
  name: 'CartBody',
  props: {
    products: {
      type: Array,
    },
    reloadCartFn: {
      type: Function,
    },
  },
  setup(props) {
    const increaseProductCart = (slug) => {
      addProductCartApi(slug);
      props.reloadCartFn();
    };
    const decreaseProductCart = (slug) => {
      removeProductCartApi(slug);
      props.reloadCartFn();
    };
    return {
      increaseProductCart,
      decreaseProductCart,
      appendEndpointToHost,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-body {
  padding: 20px 10px;
  overflow-y: scroll;
  height:calc(100vh - 50px - 90px)
  &::-webkit-scrollbar {
    display: none;
  }

  .product {
    display: flex;
    align-items: center;

    .ui.image.fluid {
      width: 100px;
      object-fit: contain;
    }

    .info {
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }

    .price {
      display: flex;
      justify-content: space-between;

      p {
        margin: 0;
      }
    }

    .quantity {
      display: flex;
      align-items: center;

      p {
        margin: 0 10px;
      }

      button {
        padding: 4px 10px;
      }
    }
  }
}
</style>
