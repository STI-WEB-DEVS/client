<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="emit('close')" />

        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <h2 class="text-lg font-semibold text-gray-900">Edit Product</h2>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-5">

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input v-model="form.name" type="text" required
                class="w-full rounded-lg border border-gray-300 px-4 py-3" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input v-model="form.price" type="number" step="0.01" required
                class="w-full rounded-lg border border-gray-300 px-4 py-3" />
            </div>


            <div class="flex justify-end gap-3 mt-8">
              <button type="button" @click="emit('close')"
                class="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>

              <button type="submit" :disabled="loading"
                class="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{
  open: boolean
  uuid: string
}>()

const emit = defineEmits<{ (e: 'close'): void; (e: 'updated'): void }>()

const form = ref({
  name: '',
  price: '',
})

const loading = ref(false)

// ✅ FIX: use watch instead of onMounted (important for modals)
watch(() => props.open, async (val) => {
  if (!val || !props.uuid) return

  try {
    const res = await productService.show(props.uuid)
    const data = res.data ?? res

    form.value = {
      name: data.name || '',
      price: data.price || '',
    }
  } catch (err) {
    console.error(err)
  }
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await productService.update(props.uuid, form.value)
    emit('updated')
    emit('close')
  } catch (err: any) {
    alert(err.message || 'Failed to update product')
  } finally {
    loading.value = false
  }
}
</script>