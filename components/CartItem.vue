<script setup>
import { cartService } from '~/api/cart/CartService';
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const removeFromCart = (id) => cartService.remove(id)
const updateQuantity = (id, delta) => cartService.updateQuantity(id, delta)
const toggleSelection = (id) => cartService.toggleSelection(id)
</script>

<template>
    <div
        class="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative"
        :class="{ 'opacity-50 grayscale-[0.5]': !item.selected }">

        <button @click="removeFromCart(item.uuid || item.id)"
            class="absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500 transition-all rounded-lg"
            title="Remove Item">
            <Icon name="heroicons:trash" size="20" />
        </button>

        <div class="flex items-center gap-4">
            <!-- Selection Checkbox -->
            <div class="flex items-center justify-center p-2">
                <input 
                    type="checkbox" 
                    :checked="item.selected"
                    @change="toggleSelection(item.uuid || item.id)"
                    class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-colors"
                >
            </div>

            <div class="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                <img :src="item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'"
                    class="w-full h-full object-cover" :alt="item.name" />
            </div>
        </div>

        <div class="flex-1 text-center sm:text-left">
            <h3 class="text-lg font-bold text-gray-900">{{ item.name }}</h3>
            <p class="text-sm text-gray-500 mt-1 line-clamp-1">{{ item.description || 'Premium Quality' }}</p>
            <p class="text-indigo-600 font-bold mt-2">₱{{ item.price || '29.00' }}</p>
        </div>

        <div class="flex flex-col items-center sm:items-end gap-4">
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <button @click="updateQuantity(item.uuid || item.id, -1)"
                    class="px-3 py-1 hover:bg-gray-200 text-gray-600 transition-colors">-</button>
                <span
                    class="px-4 py-1 font-bold text-gray-900 bg-white border-x border-gray-200 min-w-[40px] text-center">
                    {{ item.quantity }}
                </span>
                <button @click="updateQuantity(item.uuid || item.id, 1)"
                    class="px-3 py-1 hover:bg-gray-200 text-gray-600 transition-colors">+</button>
            </div>
        </div>
    </div>
</template>