<template>
  <div class="ui secondary menu">
    <div class="ui container">
      <div class="left menu">
        <router-link class="item" to="/">
          <img src="../assets/logo.png" alt="ecommerce" class="ui small image">

        </router-link>

        <template v-for="category in categories" :key="category.id">
          <router-link class="item" :to="`/c/${category.slug}`">
            {{ category.title }}
          </router-link>
        </template>
      </div>

      <div class="right menu">
        <router-link class="item" to="/login" v-if="!token">
          Iniciar sesion
        </router-link>
        <template v-if="token">
          <!-- <router-link class="item" :to="{ name: 'Order' }">Orders</router-link> -->
          <router-link class="item" :to="{ name: 'Orders' }">Orders</router-link>

          <span class="ui item cart">
            <i class="shopping cart icon" @click="openCart"></i>
          </span>

          <span class="ui item logout" @click="logout">
            <i class="sign-out icon"></i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { getCategoriesApi } from '@/api/category';
import { getTokenApi, deleteTokenApi } from '@/api/token';

export default {
  name: 'Menu',
  setup() {
    let categories = ref([]);
    const router = useRouter();
    const token = getTokenApi();
    const store = useStore();

    onMounted(async () => {
      const response = await getCategoriesApi();
      categories.value = response;
    });

    const logout = () => {
      deleteTokenApi();

      router.push({ name: 'Login' });
    };

    const openCart = () => {
      store.commit('toggleShowCart', true);
    };

    return {
      token,
      logout,
      categories,
      openCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.menu.secondary {
  background-color: #16202b;

  .item {
    color: #fff;

    &:hover {
      color: #1fa1f1;
    }
  }

  .menu.left {
    width: 50%;
    .ui.image {
      width: 40px;
    }
  }

  .menu.right {
    width: 50%;
    justify-content:flex-end;

    .logout,
    .cart {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
