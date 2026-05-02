<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const formatCurrency = (amount) => {
  return '₱' + Number(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-bold text-gray-900">Order #{{ order.uuid.split('-')[0].toUpperCase() }}</h3>
        <p class="text-sm text-gray-500">{{ new Date(order.created_at).toLocaleString() }}</p>
      </div>
      <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Placed</span>
    </div>

    <table class="w-full text-sm text-left text-gray-700 border-t border-gray-100">
      <thead class="text-xs text-gray-500 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-2">Product ID</th>
          <th class="px-4 py-2 text-right">Qty</th>
          <th class="px-4 py-2 text-right">Unit Price</th>
          <th class="px-4 py-2 text-right">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.items" :key="item.product_id" class="border-t border-gray-100">
          <td class="px-4 py-2">{{ item.product_id }}</td>
          <td class="px-4 py-2 text-right">{{ item.quantity }}</td>
          <td class="px-4 py-2 text-right">{{ formatCurrency(item.unit_price) }}</td>
          <td class="px-4 py-2 text-right font-medium">{{ formatCurrency(item.subtotal) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border-t border-gray-200 bg-gray-50">
          <td colspan="3" class="px-4 py-2 text-right font-semibold text-gray-900">Total</td>
          <td class="px-4 py-2 text-right font-bold text-gray-900">{{ formatCurrency(order.total_amount) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
