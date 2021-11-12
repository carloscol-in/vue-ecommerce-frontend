<template>
  <BasicLayout>
    <div class="login">
      <h2>Login</h2>

      <form class="ui form" @submit.prevent="login">
        <div class="ui negative message transition" :class="{ 'hidden': !showError }">
          <i class="close icon" @click="closeErrorMessage"></i>
          <div class="header">Invalid login</div>
          <p>Invalid username/password</p>
        </div>

        <div class="field">
          <input
            type="text"
            placeholder="Username"
            v-model="formData.identifier"
            :class="{ error: formError.identifier }"
          >
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Password"
            v-model="formData.password"
            :class="{ error: formError.password }"
          >
        </div>

        <button class="ui button primary fluid">Login</button>
      </form>

      <router-link :to="{ name: 'Register' }" :class="{ loading }">
        Create an account
      </router-link>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
import { loginApi } from '@/api/user';
import { setTokenApi, getTokenApi } from '@/api/token';

import BasicLayout from '@/layouts/BasicLayout.vue';

export default {
  name: 'Login',
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    let showError = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (token) router.push({ name: 'Home' });
    });

    const schemaForm = Yup.object().shape({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });

    const closeErrorMessage = () => {
      showError.value = false;
    };

    const login = async () => {
      formError.value = {};

      try {
        await schemaForm.validate(formData.value, { abortEarly: false });

        try {
          const response = await loginApi(formData.value);
          if (!response?.jwt) throw Error;
          setTokenApi(response.jwt);
          router.push({ name: 'Home' });
        } catch (error) {
          showError.value = true;
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
        showError.value = true;
      }
    };

    return {
      formData,
      formError,
      loading,
      schemaForm,
      showError,

      login,
      closeErrorMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  text-align: center;

  > h2 {
    margin: 50px 0 30px 0;
  }

  .ui.form {
    max-width: 300px !important;
    margin: 0 auto;
    margin-bottom: 10px;

    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
}
</style>
