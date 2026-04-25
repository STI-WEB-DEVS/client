<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="header in headers" :key="header.key"
              class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
              :class="[header.align === 'right' ? 'text-right' : 'text-left']">
              {{ header.label }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 bg-white">
          <template v-if="items && items.length">
            <tr v-for="(item, index) in items" :key="item.id || index" class="transition hover:bg-gray-50">
              <td v-for="header in headers" :key="header.key"
                class="whitespace-nowrap px-6 py-4 text-sm"
                :class="[
                  header.align === 'right' ? 'text-right' : 'text-left',
                  header.class || 'text-gray-700'
                ]">
                <slot :name="`cell(${header.key})`" :item="item" :value="item[header.key]">
                  {{ item[header.key] ?? 'N/A' }}
                </slot>
              </td>
            </tr>
          </template>

          <tr v-else>
            <td :colspan="headers.length" class="px-6 py-10 text-center text-sm text-gray-500">
              {{ emptyMessage || 'No records found.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer (Optional) -->
    <div v-if="meta" class="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <p class="text-sm text-gray-500">
        Showing
        <span class="font-medium text-gray-900">{{ meta.from ?? 0 }}</span>
        to
        <span class="font-medium text-gray-900">{{ meta.to ?? 0 }}</span>
        of
        <span class="font-medium text-gray-900">{{ meta.total ?? 0 }}</span>
        {{ resourceName || 'records' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Header {
  label: string;
  key: string;
  align?: 'left' | 'right';
  class?: string;
}

defineProps<{
  headers: Header[];
  items: any[];
  meta?: {
    from: number;
    to: number;
    total: number;
  };
  resourceName?: string;
  emptyMessage?: string;
}>();
</script>
