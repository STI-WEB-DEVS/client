<template>
  <div class="border-[2px] border-indigo-300 rounded-xl bg-white p-4 ring-5 ring-indigo-50 sm:p-6 lg:p-8 ">
      <div>
        <h3 class="mb-4 text-lg font-medium sm:text-xl">
          <!-- Using a '#' since 'link' wasn't in your props -->
          <a href="#" class="hover:underline"> {{ name }} </a>
        </h3>

        <strong class="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[15px] font-medium text-white">
          Username: {{ username }}
        </strong>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  username: string;
  name: string;
  // link: string; // Add this if you want dynamic links
}>();
</script>
