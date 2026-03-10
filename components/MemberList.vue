<script setup>
// Your data lives right here in the same file
const cards = [
  {
    id: 1,
    title: "Group Leader",
    author: "Matt Oliver Pojadas",
    image: "https://preview.redd.it/man-elves-really-have-that-chad-face-v0-n6ymaeidkfhd1.jpeg?width=360&format=pjpg&auto=webp&s=85763ae452aad8d1bbc335e9ce98fb72c4a8ca7d",
    description: "Expert in team management and agile workflows."
  },
  {
    id: 2,
    title: "Group Member",
    author: "Stephen Duray",
    image: "https://external-preview.redd.it/no-spoilers-hackerman-wallpaper-x-post-r-wallpaperrequests-v0-ig9OoyenpxqdCQyABmOQBZDI0duHk2QZZmWg2Hxd4ro.jpg?width=1080&crop=smart&auto=webp&s=482f997f419ec765071d254b06462819d705251d",
    description: "Focusing on user-centric design and accessible web interfaces for global brands.",
  },
  {
    id: 3,
    title: "Group Member",
    author: "John Lloyd Adlaw",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v_xXq_LdlCkuWZTJ2c4yM1b-39i4pPZCKw&s",
    description: "Specializing in cloud infrastructure and high-performance backend systems.",
  }
  // ... add the other 2 objects here
];
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    
    <a 
      v-for="card in cards" 
      :key="card.id" 
      href="#" 
      class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
    >
      <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
        <div class="sm:order-last sm:shrink-0">
          <img 
            :alt="card.author" 
            :src="card.image" 
            class="size-16 rounded-full object-cover sm:size-18"
          >
        </div>

        <div class="mt-4 sm:mt-0">
          <h3 class="text-lg font-medium text-pretty text-gray-900">
            {{ card.title }}
          </h3>

          <p class="mt-1 text-sm text-gray-700"> {{ card.author }}</p>

          <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
            {{ card.description }}
          </p>
        </div>
      </div>
    </a>

  </div>
</template>