<template>
  <Login />
</template>

<script setup lang="ts">
import Login from '~/components/Login.vue';

definePageMeta({
  layout: false
})

import { ref } from 'vue';
import { AuthService } from '~/api/auth/AuthService';

const email = ref('');
const password = ref('');
const token = ref('');
const error = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {

  error.value = '';
  isLoading.value = true;

  try {
    if (token.value) {
      localStorage.setItem('_token', token.value);
    } else {
      const authService = new AuthService();
      const response = await authService.login(email.value, password.value);
      if (response?.token) {
        localStorage.setItem('_token', response.token);
        localStorage.setItem('_uuid', response.user.uuid);
        localStorage.setItem('_role', response.user.role);

        if (response.user.role === 'customer') {
          return await navigateTo('/customer/order');
        }
      }
    }

    await navigateTo('/admin/dashboard');
  } catch (err: any) {
    error.value = err?.message || '';
  } finally {
    isLoading.value = false;
  }
};
</script>