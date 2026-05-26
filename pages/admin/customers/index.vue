<template>
        <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-10 sm:px-6 lg:px-8">

            <div class="mx-auto max-w-7xl">

                <div class="mb-8 overflow-hidden rounded-3xl bg-[#0f2573] p-8 shadow-xl">
                    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-sm font-bold uppercase tracking-widest text-blue-200">
                                Customer Management
                            </p>

                            <h1 class="mt-2 text-4xl font-black text-white">
                                Customers
                            </h1>

                            <p class="mt-3 max-w-2xl text-blue-100">
                                Manage customer records, contact details, and profile information in one place.
                            </p>
                        </div>

                        <button @click="openAddModal"
                            class="rounded-2xl bg-white px-6 py-4 font-black text-[#0f2573] shadow-lg transition hover:scale-105 hover:bg-blue-50">
                            + Add Customer
                        </button>
                    </div>
                </div>

                <div class="mb-8 rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                    <div class="flex items-center gap-3">
                        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
                            🔍
                        </div>

                        <input v-model="search" type="text" placeholder="Search by name, email, or phone..."
                            class="w-full border-0 bg-transparent px-2 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                    </div>
                </div>

                <div v-if="pending" class="text-center py-12 text-[#0f2573] font-bold">
                    Loading customer data...
                </div>

                <div v-else-if="filteredCustomers.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <div v-for="customer in filteredCustomers" :key="customer.id"
                        class="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                        <div class="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50"></div>

                        <div class="relative">
                            <div class="mb-5 flex items-center gap-4">
                                <div
                                    class="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0f2573] text-2xl font-black text-white shadow">
                                    {{ getInitials(customer.name) }}
                                </div>

                                <div>
                                    <h2 class="text-xl font-black text-gray-900">
                                        {{ customer.name }}
                                    </h2>

                                    <p class="text-sm font-medium text-gray-400">
                                        Customer ID: {{ customer.id }}
                                    </p>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <div class="rounded-2xl bg-slate-50 p-4">
                                    <p class="text-xs font-bold uppercase tracking-wide text-gray-400">
                                        Email
                                    </p>

                                    <p class="mt-1 break-words text-sm font-semibold text-gray-700">
                                        {{ customer.email }}
                                    </p>
                                </div>

                                <div class="rounded-2xl bg-slate-50 p-4">
                                    <p class="text-xs font-bold uppercase tracking-wide text-gray-400">
                                        Phone
                                    </p>

                                    <p class="mt-1 text-sm font-semibold text-gray-700">
                                        {{ customer.phone }}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6 flex gap-3">
                                <button @click="editCustomer(customer)"
                                    class="flex-1 rounded-2xl bg-blue-100 px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-200">
                                    Edit
                                </button>

                                <button @click="openDeleteModal(customer)"
                                    class="flex-1 rounded-2xl bg-red-100 px-4 py-3 text-sm font-black text-red-700 transition hover:bg-red-200">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                    <div
                        class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
                        👤
                    </div>

                    <h3 class="text-2xl font-black text-gray-900">
                        No customers found
                    </h3>

                    <p class="mt-2 text-gray-500">
                        Try changing your search or add a new customer.
                    </p>
                </div>

            </div>

            <div v-if="showModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
                <div class="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

                    <div class="bg-[#0f2573] px-8 py-6">
                        <h2 class="text-2xl font-black text-white">
                            {{ isEditing ? 'Edit Customer' : 'Add Customer' }}
                        </h2>

                        <p class="mt-1 text-sm text-blue-100">
                            {{ isEditing ? 'Update existing customer details.' : 'Create a new customer record.' }}
                        </p>
                    </div>

                    <div class="space-y-5 p-8">
                        <div>
                            <label class="mb-2 block text-sm font-bold text-gray-700">
                                Customer Name
                            </label>

                            <input v-model="form.name" type="text" placeholder="Enter customer name"
                                class="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-[#0f2573] focus:bg-white focus:ring-4 focus:ring-blue-100" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-bold text-gray-700">
                                Email Address
                            </label>

                            <input v-model="form.email" type="email" placeholder="Enter email address"
                                class="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-[#0f2573] focus:bg-white focus:ring-4 focus:ring-blue-100" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-bold text-gray-700">
                                Phone Number
                            </label>

                            <input v-model="form.phone" type="text" placeholder="Enter phone number"
                                class="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 font-semibold text-gray-800 outline-none transition focus:border-[#0f2573] focus:bg-white focus:ring-4 focus:ring-blue-100" />
                        </div>

                        <div class="flex justify-end gap-3 pt-4">
                            <button @click="resetForm"
                                class="rounded-2xl bg-gray-100 px-5 py-3 font-black text-gray-700 transition hover:bg-gray-200">
                                Cancel
                            </button>

                            <button @click="isEditing ? updateCustomer() : addCustomer()"
                                class="rounded-2xl bg-[#0f2573] px-5 py-3 font-black text-white shadow transition hover:bg-[#1a3a8a]">
                                {{ isEditing ? 'Update Customer' : 'Save Customer' }}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div v-if="showDeleteModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
                <div class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

                    <div class="bg-red-600 px-8 py-6">
                        <h2 class="text-2xl font-black text-white">
                            Delete Customer
                        </h2>

                        <p class="mt-1 text-sm text-red-100">
                            Please confirm before deleting this record.
                        </p>
                    </div>

                    <div class="p-8">
                        <div class="mb-6 flex items-center gap-4 rounded-2xl bg-red-50 p-4">
                            <div
                                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-xl font-black text-white">
                                !
                            </div>

                            <div>
                                <p class="text-sm font-bold text-gray-500">
                                    You are about to delete
                                </p>

                                <h3 class="text-lg font-black text-gray-900">
                                    {{ selectedCustomer?.name }}
                                </h3>
                            </div>
                        </div>

                        <p class="text-sm font-semibold leading-6 text-gray-600">
                            This action will remove the customer from the list. Are you sure you want to continue?
                        </p>

                        <div class="mt-8 flex justify-end gap-3">
                            <button @click="closeDeleteModal"
                                class="rounded-2xl bg-gray-100 px-5 py-3 font-black text-gray-700 transition hover:bg-gray-200">
                                Cancel
                            </button>

                            <button @click="confirmDeleteCustomer"
                                class="rounded-2xl bg-red-600 px-5 py-3 font-black text-white shadow transition hover:bg-red-700">
                                Yes, Delete
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

</template>

<script setup>
import { computed, ref } from 'vue'

const runtimeConfig = useRuntimeConfig()

const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const editId = ref(null)
const search = ref('')
const selectedCustomer = ref(null)

const form = ref({
    name: '',
    email: '',
    phone: ''
})

// 1. Live Fetch from your Laravel Server
// Adjust '/customers' to match your actual Laravel API endpoint route
const { data: customerResponse, pending, refresh } = await useFetch('/customers', {
    baseURL: runtimeConfig.public.apiBaseURL,
    headers: {
        Accept: 'application/json'
    }
})

// Safely map the backend data array (handles nesting if Laravel returns it inside data: [])
const customersList = computed(() => {
    if (!customerResponse.value) return []
    return Array.isArray(customerResponse.value) ? customerResponse.value : (customerResponse.value.data || [])
})

// 2. Client Side Filtered Search
const filteredCustomers = computed(() => {
    const keyword = search.value.toLowerCase().trim()

    if (!keyword) {
        return customersList.value
    }

    return customersList.value.filter((customer) => {
        return (
            (customer.name?.toLowerCase().includes(keyword)) ||
            (customer.email?.toLowerCase().includes(keyword)) ||
            (customer.phone?.toLowerCase().includes(keyword))
        )
    })
})

const openAddModal = () => {
    form.value = { name: '', email: '', phone: '' }
    isEditing.value = false
    editId.value = null
    showModal.value = true
}

// 3. Add to Database via API
const addCustomer = async () => {
    if (!form.value.name || !form.value.email || !form.value.phone) {
        alert('Please fill in all fields.')
        return
    }

    try {
        await $fetch('/customers', {
            baseURL: runtimeConfig.public.apiBaseURL,
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: form.value
        })
        
        await refresh() // Refetch from backend instantly populating the cards
        resetForm()
    } catch (error) {
        alert(error?.data?.message || 'Failed to add customer records.')
    }
}

const editCustomer = (customer) => {
    isEditing.value = true
    editId.value = customer.id

    form.value = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone
    }

    showModal.value = true
}

// 4. Update existing Database Record
const updateCustomer = async () => {
    if (!form.value.name || !form.value.email || !form.value.phone) {
        alert('Please fill in all fields.')
        return
    }

    try {
        await $fetch(`/customers/${editId.value}`, {
            baseURL: runtimeConfig.public.apiBaseURL,
            method: 'PUT', // or 'PATCH' depending on your api preference
            headers: { Accept: 'application/json' },
            body: form.value
        })

        await refresh() // Sync interface with updated data
        resetForm()
    } catch (error) {
        alert(error?.data?.message || 'Failed to update customer details.')
    }
}

const openDeleteModal = (customer) => {
    selectedCustomer.value = customer
    showDeleteModal.value = true
}

const closeDeleteModal = () => {
    selectedCustomer.value = null
    showDeleteModal.value = false
}

// 5. Delete completely from the Database
const confirmDeleteCustomer = async () => {
    if (!selectedCustomer.value) return

    try {
        await $fetch(`/customers/${selectedCustomer.value.id}`, {
            baseURL: runtimeConfig.public.apiBaseURL,
            method: 'DELETE',
            headers: { Accept: 'application/json' }
        })

        await refresh() // UI live sync
        closeDeleteModal()
    } catch (error) {
        alert(error?.data?.message || 'Failed to delete customer.')
    }
}

const resetForm = () => {
    form.value = { name: '', email: '', phone: '' }
    showModal.value = false
    isEditing.value = false
    editId.value = null
}

const getInitials = (name) => {
    if (!name) return '?'
    return name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
}
</script>