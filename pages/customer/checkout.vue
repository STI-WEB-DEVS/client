<script setup>
import ProductService from '~/api/product/ProductService';
import { cartService } from '~/api/cart/CartService';
const route = useRoute()

definePageMeta({
    layout: 'customer'
})

const product = ref(null)
const checkoutItems = ref([])
const quantity = ref(1)
const isLoading = ref(true)

const user = ref({
    name: (typeof window !== 'undefined' ? localStorage.getItem('_name') : '') || 'Valued Customer',
    email: (typeof window !== 'undefined' ? localStorage.getItem('_email') : '') || 'john@example.com'
})

const totalPrice = computed(() => {
    if (checkoutItems.value.length > 0) {
        return checkoutItems.value.reduce((total, item) => {
            return total + (parseFloat(item.price || 0) * item.quantity)
        }, 0).toFixed(2)
    }
    if (!product.value) return '0.00'
    return (parseFloat(product.value.price || 29) * quantity.value).toFixed(2)
})

onMounted(async () => {
    const productId = route.query.id

    try {
        if (productId) {
            const productService = ProductService.getInstance();
            const response = await productService.show(productId);
            product.value = response.data || response;
            checkoutItems.value = []
        } else {
            checkoutItems.value = cartService.items.filter(item => item.selected)
            product.value = null
        }
    } catch (error) {
        console.error('Error loading checkout details:', error);
    } finally {
        isLoading.value = false
    }
})

const handlePlaceOrder = () => {
    const items = checkoutItems.value.length > 0
        ? checkoutItems.value.map(item => ({ product_uuid: item.uuid || item.id, quantity: item.quantity }))
        : [{ product_uuid: product.value?.uuid || product.value?.id, quantity: quantity.value }]

    const payload = {
        customer_uuid: typeof window !== 'undefined' ? localStorage.getItem('_uuid') : null,
        items: items
    }

    console.log('BUILD PAYLOAD:', JSON.stringify(payload, null, 2));
    alert('Order payload has been logged to the console!');
}
</script>

<template>
    <div class="max-w-4xl mx-auto">
        <PageHeader title="Checkout" description="Review your order and complete your purchase." />

        <div v-if="isLoading" class="py-12 text-center">
            <p class="text-gray-500 animate-pulse">Loading order details...</p>
        </div>

        <div v-else-if="product || checkoutItems.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-8">
            <div class="space-y-8">
                <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Icon name="heroicons:user" class="text-indigo-600" />
                        Customer Information
                    </h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold uppercase text-gray-500 tracking-wider">Full
                                Name</label>
                            <p class="text-gray-900 font-medium">{{ user.name }}</p>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase text-gray-500 tracking-wider">Email
                                Address</label>
                            <p class="text-gray-900 font-medium">{{ user.email }}</p>
                        </div>
                    </div>
                </section>

                <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Icon name="heroicons:credit-card" class="text-indigo-600" />
                        Payment Method
                    </h2>
                    <p class="text-sm text-gray-600">Payment integration will go here (Stripe, PayPal, etc.)</p>
                </section>
            </div>

            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
                <h2 class="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                <div class="space-y-4 pb-6 border-b border-gray-200 max-h-[400px] overflow-y-auto">
                    <div v-if="product" class="flex gap-4">
                        <div class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img :src="product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'"
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-sm text-gray-900">{{ product.name }}</h3>
                            <p class="text-xs text-gray-500">Qty: {{ quantity }} x ${{ product.price || '29.00' }}</p>
                        </div>
                    </div>

                    <div v-for="item in checkoutItems" :key="item.uuid || item.id" class="flex gap-4">
                        <div
                            class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                            <img :src="item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'"
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-sm text-gray-900">{{ item.name }}</h3>
                            <p class="text-xs text-gray-500">Qty: {{ item.quantity }} x ${{ item.price || '29.00' }}</p>
                        </div>
                    </div>
                </div>

                <div class="py-6 space-y-4 border-b border-gray-200">
                    <div v-if="product" class="flex justify-between items-center">
                        <span class="text-gray-600">Quantity</span>
                        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button @click="quantity > 1 && quantity--"
                                class="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                            <span class="px-4 py-1 bg-white font-medium">{{ quantity }}</span>
                            <button @click="quantity++" class="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal</span>
                        <span class="font-medium text-gray-900">₱{{ totalPrice }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Shipping</span>
                        <span class="text-green-600 font-medium">Free</span>
                    </div>
                </div>

                <div class="py-6 flex justify-between items-center border-b border-gray-200">
                    <span class="text-lg font-bold text-gray-900">Total</span>
                    <span class="text-2xl font-bold text-indigo-600">₱{{ totalPrice }}</span>
                </div>

                <button @click="handlePlaceOrder"
                    class="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-transform active:scale-95 shadow-lg">
                    Place Order
                </button>
            </div>
        </div>

        <div v-else class="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300 mt-8">
            <Icon name="heroicons:shopping-cart" size="48" class="mx-auto text-gray-300 mb-4" />
            <h2 class="text-xl font-bold text-gray-900">Your checkout session is empty.</h2>
            <NuxtLink to="/customer/shop" class="mt-4 inline-block text-indigo-600 font-bold hover:underline">
                Return to Shop
            </NuxtLink>
        </div>
    </div>
</template>