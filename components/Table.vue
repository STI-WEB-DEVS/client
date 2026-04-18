<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
              :class="[col.align === 'right' ? 'text-right' : 'text-left', col.headerClass]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="(row, index) in rows"
            :key="row.id || index"
            class="transition hover:bg-gray-50"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="whitespace-nowrap px-6 py-4 text-sm"
              :class="[
                col.align === 'right' ? 'text-right' : 'text-left',
                col.rowClass || (col.key === 'id' ? 'font-medium text-gray-900' : 'text-gray-700')
              ]"
            >
              <slot :name="`cell(${col.key})`" :value="row[col.key]" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>

          <tr v-if="!rows?.length">
            <td :colspan="columns.length" class="px-6 py-10 text-center text-sm text-gray-500">
              {{ emptyMessage || 'No data found.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="$slots.footer" class="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  headerClass?: string;
  rowClass?: string;
}

defineProps<{
  columns: Column[];
  rows: any[];
  emptyMessage?: string;
}>();
</script>
