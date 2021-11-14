<template>
  <div class="cart-dimmer" :class="{ 'open': showCart }" @click="closeCart"></div>
  <div class="cart" :class="{ 'open': showCart }">
    <div>
      <CartHeader :closeCart="closeCart" />
      <CartBody :products="products" :reloadCartFn="reloadCartFn" />
    </div>

    <CartFooter v-if="products" :products="products" :closeCart="closeCart" />
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';

import { getProductsCartApi } from '@/api/cart';

import CartHeader from './Header.vue';
import CartBody from './Body.vue';
import CartFooter from './Footer.vue';

export default {
  name: 'Cart',
  components: {
    CartHeader,
    CartFooter,
    CartBody,
  },
  setup() {
    let reloadCart = ref(false);
    const products = ref(null);
    const store = useStore();
    const showCart = computed(() => store.state.showCart);

    const closeCart = () => {
      store.commit('toggleShowCart', false);
    };

    const getProductsOnCart = async () => {
      products.value = await getProductsCartApi();
    };

    watchEffect(async () => {
      if (!showCart.value) return;
      // eslint-disable-next-line no-unused-expressions
      reloadCart.value;
      await getProductsOnCart();
    });

    const reloadCartFn = () => {
      reloadCart.value = !reloadCart.value;
    };

    return {
      showCart,
      closeCart,
      products,

      reloadCartFn,
      getProductsOnCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateX(150%);
  transition: all 0.6s ease;

  &.open {
    transform: translateX(0);
  }
}
.cart-dimmer {
  opacity: 0;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  position: fixed;
  background-color: #000;
  transition: all 0.5s ease;

  &.open {
    opacity: 0.7;
    width: 100%;
  }
}
</style>
