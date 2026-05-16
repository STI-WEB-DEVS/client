import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStore = defineStore('order', () => {
  const orderCompleted = ref(0);

  const notifyOrderCompleted = () => {
    orderCompleted.value = Date.now();
  };

  return {
    orderCompleted,
    notifyOrderCompleted,
  };
});
