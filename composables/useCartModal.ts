import { ref } from 'vue'

const isOpen = ref(false)

export const useCartModal = () => {
  const openCartModal = () => {
    isOpen.value = true
  }

  const closeCartModal = () => {
    isOpen.value = false
  }

  return {
    isCartModalOpen: isOpen,
    openCartModal,
    closeCartModal,
  }
}