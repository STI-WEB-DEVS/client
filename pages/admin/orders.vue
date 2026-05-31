```vue
<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#0d0608] p-8">

      <!-- HEADER -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">
          Orders
        </h1>

        <p class="mt-2 text-sm text-gray-400">
          View all customer orders
        </p>
      </div>

      <!-- ORDERS TABLE -->
      <div
        class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div
          class="flex items-center justify-between border-b border-white/10 px-6 py-5"
        >
          <h2 class="font-semibold text-white">
            Customer Orders
          </h2>

          <span
            class="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300"
          >
            {{ orders.length }} Order(s)
          </span>
        </div>

        <!-- LOADING -->
        <div
          v-if="loading"
          class="p-12 text-center text-gray-400"
        >
          Loading orders...
        </div>

        <!-- EMPTY -->
        <div
          v-else-if="orders.length === 0"
          class="p-12 text-center text-gray-400"
        >
          No orders yet.
        </div>

        <!-- ORDERS -->
        <ul
          v-else
          class="divide-y divide-white/5"
        >
          <li
            v-for="order in orders"
            :key="order.uuid"
            class="flex items-center justify-between px-6 py-5 transition hover:bg-white/5"
          >
            <div class="flex items-center gap-4">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold"
                style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
              >
                #
              </div>

              <div>
                <p class="font-semibold text-white">
                  Order #{{ order.id }}
                </p>

                <p class="mt-1 text-xs text-gray-500 break-all">
                  {{ order.uuid }}
                </p>

                <p class="mt-1 text-xs text-gray-400">
                  {{
                    new Date(order.created_at).toLocaleDateString(
                      'en-PH',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }
                    )
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4">

              <span
                class="text-lg font-bold text-red-400"
              >
                ₱{{
                  Number(order.total_amount).toLocaleString(
                    'en-PH',
                    {
                      minimumFractionDigits: 2
                    }
                  )
                }}
              </span>

              <button
                @click="viewOrder(order)"
                class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 hover:bg-white/10"
              >
                View
              </button>

              <button
                @click="deleteOrder(order.uuid)"
                class="rounded-xl px-4 py-2 text-xs font-semibold text-white"
                style="background:linear-gradient(135deg,#b91c1c,#ef4444)"
              >
                Delete
              </button>

            </div>
          </li>
        </ul>
      </div>

      <!-- VIEW MODAL -->
      <div
        v-if="viewModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      >
        <div
          class="w-full max-w-xl rounded-3xl border border-white/10 bg-[#12090c] p-8 shadow-2xl"
        >

          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-xl font-bold text-white">
              Order Details
            </h3>

            <button
              @click="viewModal = false"
              class="text-2xl text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          <div class="space-y-5">

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Order ID
              </p>

              <p class="mt-1 text-white font-semibold">
                #{{ selected?.id }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                UUID
              </p>

              <p class="mt-1 break-all text-gray-300">
                {{ selected?.uuid }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Customer ID
              </p>

              <p class="mt-1 text-white">
                {{ selected?.customer_id }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Total Amount
              </p>

              <p class="mt-1 text-2xl font-bold text-red-400">
                ₱{{
                  Number(selected?.total_amount).toLocaleString(
                    'en-PH',
                    {
                      minimumFractionDigits: 2
                    }
                  )
                }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Date Ordered
              </p>

              <p class="mt-1 text-gray-300">
                {{
                  selected
                    ? new Date(
                        selected.created_at
                      ).toLocaleDateString(
                        'en-PH',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }
                      )
                    : ''
                }}
              </p>
            </div>

            <!-- ITEMS -->
            <div v-if="selected?.order_items?.length">
              <p
                class="mb-3 text-xs uppercase tracking-wider text-gray-500"
              >
                Ordered Items
              </p>

              <div
                class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div
                  v-for="(item, i) in selected.order_items"
                  :key="i"
                  class="flex items-center justify-between"
                >
                  <div>
                    <p class="text-sm text-white">
                      {{ item.product?.name || 'Product' }}
                    </p>

                    <p class="text-xs text-gray-500">
                      Quantity: {{ item.quantity }}
                    </p>
                  </div>

                  <span
                    class="font-semibold text-red-400"
                  >
                    ₱{{
                      Number(
                        item.unit_price *
                        item.quantity
                      ).toLocaleString(
                        'en-PH',
                        {
                          minimumFractionDigits: 2
                        }
                      )
                    }}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <button
            @click="viewModal = false"
            class="mt-8 w-full rounded-2xl py-3 font-semibold text-white"
            style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
          >
            Close
          </button>

        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const orders = ref<any[]>([]);
const loading = ref(true);
const viewModal = ref(false);
const selected = ref<any>(null);

const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem("_token");

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const data = await $fetch<any>("orders", { baseURL: runtimeConfig.public.apiBaseURL, headers });
    orders.value = data.data || data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const viewOrder = (order: any) => {
  selected.value = order;
  viewModal.value = true;
};

const deleteOrder = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this order?")) return;
  try {
    await $fetch(`orders/${uuid}`, {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: "DELETE",
      headers,
    });
    await fetchOrders();
  } catch (e: any) {
    alert("Failed to delete order.");
  }
};

onMounted(fetchOrders);
</script>