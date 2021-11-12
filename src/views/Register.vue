<template>
  <BasicLayout>
    <div class="register">
      <h2>User registration</h2>

      <form @submit.prevent="register" class="ui form">
        <div class="field">
          <input
            type="text"
            placeholder="User name"
            v-model="formData.username"
            :class="{ error: formError.username }"
          >
        </div>
        <div class="field">
          <input
            type="email"
            placeholder="email@example.com"
            v-model="formData.email"
            :class="{ error: formError.email}"
          >
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Password"
            v-model="formData.password"
            :class="{ error: formError.password}"
          >
        </div>

        <button
          class="ui button fluid primary"
          type="submit"
          :class="{ loading }"
        >
          Create user
        </button>
      </form>

      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';
import { registerApi } from '@/api/user';
import { getTokenApi } from '@/api/token';

import BasicLayout from '@/layouts/BasicLayout.vue';

export default {
  name: 'Register',
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (token) router.push({ name: 'Home' });
    });

    const schemaForm = Yup.object().shape({
      username: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    });

    const register = async () => {
      formError.value = {};

      try {
        await schemaForm.validate(formData.value, { abortEarly: false });

        try {
          await registerApi(formData.value);
          router.push({ name: 'Login' });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }
    };

    return {
      formData,
      formError,
      schemaForm,
      loading,

      register,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  text-align: center;

  > h2 {
    margin: 50px 0 30px 0;
  }

  .ui.form {
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 10px;

    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
}
</style>
