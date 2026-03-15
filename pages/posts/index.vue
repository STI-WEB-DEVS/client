<template>
  <NuxtLayout>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Posts</h2>
        <p class="text-sm text-slate-500 mt-0.5">
          <span v-if="isPremium">Share updates, showcases & promotions with the community</span>
          <span v-else>Browse posts from the SATURA community — <span style="color:#009E97;font-weight:600">Upgrade to Premium to create posts</span></span>
        </p>
      </div>
      <!-- Only Premium can create -->
      <button v-if="isPremium" @click="openCreate" class="btn-teal">+ Create Post</button>
      <div v-else class="flex items-center gap-2 px-4 py-2 rounded-lg viewer-badge">
        <span class="text-sm">👁</span>
        <span class="text-sm font-semibold" style="color:#009E97">Viewer Mode</span>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div v-for="n in 4" :key="n" class="post-card animate-pulse">
        <div class="w-full h-40 bg-slate-200 rounded-lg mb-3"></div>
        <div class="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-slate-200 rounded w-full mb-1"></div>
        <div class="h-3 bg-slate-200 rounded w-5/6"></div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="posts.length === 0" class="text-center py-20">
      <div class="size-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style="background:rgba(0,158,151,0.1)">
        <span class="text-3xl">📝</span>
      </div>
      <h3 class="text-lg font-bold text-slate-700">No posts yet</h3>
      <p class="text-slate-500 text-sm mt-1 mb-4">Be the first to share something with the community.</p>
      <button v-if="isPremium" @click="openCreate" class="btn-teal">Create First Post</button>
    </div>

    <!-- Posts grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <!-- Post image -->
        <div v-if="post.imageUrl" class="post-img-wrap mb-3">
          <img :src="post.imageUrl" :alt="post.title" class="post-img" @error="(e: any) => e.target.style.display='none'" />
        </div>
        <!-- Tag & date -->
        <div class="flex items-start justify-between gap-2 mb-2">
          <span :class="['post-tag', tagClass(post.tag)]">{{ post.tag }}</span>
          <span class="text-xs text-slate-400 shrink-0 mt-0.5">{{ post.date }}</span>
        </div>
        <!-- Title & body -->
        <h3 class="font-bold text-slate-800 text-base leading-snug">{{ post.title }}</h3>
        <p class="text-sm text-slate-500 mt-1.5 leading-relaxed line-clamp-3">{{ post.body }}</p>
        <!-- Footer -->
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="size-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0"
              :style="post.authorPlan === 'premium' ? 'background:linear-gradient(135deg,#009E97,#007A75)' : 'background:#94A3B8'">
              {{ post.author[0] }}
            </div>
            <div>
              <span class="text-xs font-semibold text-slate-700">{{ post.author }}</span>
              <span v-if="post.authorPlan === 'premium'" class="ml-1 text-[10px] font-bold rounded-full px-1.5 py-0.5" style="background:rgba(220,176,58,0.15);color:#DCB03A">PRO</span>
            </div>
          </div>
          <!-- Delete only for own premium posts -->
          <button v-if="isPremium && post.authorPlan === 'premium' && post.author === user?.name"
            @click="deletePost(post.id)"
            class="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">Delete</button>
        </div>
      </div>
    </div>

    <!-- ── CREATE POST MODAL (Premium only) ── -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">Create New Post</h3>
          <button @click="showModal = false" class="modal-close">✕</button>
        </div>
        <form @submit.prevent="submitPost" class="p-6 space-y-4">
          <div class="form-group">
            <label>Title *</label>
            <input v-model="form.title" type="text" class="form-input" placeholder="e.g. New Barong Collection 2026" required />
          </div>
          <div class="form-group">
            <label>Category</label>
            <select v-model="form.tag" class="form-input">
              <option>Announcement</option>
              <option>Update</option>
              <option>Showcase</option>
              <option>Promotion</option>
            </select>
          </div>

          <!-- Image section with Upload / URL tabs -->
          <div class="form-group">
            <label>Image <span class="text-slate-400 font-normal">(optional)</span></label>
            <div class="img-tab-row">
              <button type="button" :class="['img-tab', imgMode === 'upload' ? 'img-tab-active' : '']" @click="switchImgMode('upload')">📁 Upload File</button>
              <button type="button" :class="['img-tab', imgMode === 'url'    ? 'img-tab-active' : '']" @click="switchImgMode('url')">🔗 Paste URL</button>
            </div>

            <!-- File upload -->
            <div v-if="imgMode === 'upload'" class="mt-2">
              <input ref="imgFileInput" type="file" accept="image/*" class="hidden" @change="onImgFileSelected" />
              <button
                type="button"
                @click="(imgFileInput as HTMLInputElement | null)?.click()"
                :class="['upload-btn', imgFileName ? 'upload-btn-ok' : '']"
              >
                {{ imgFileName ? '✅ ' + imgFileName + ' — click to change' : '📷 Choose image from device' }}
              </button>
              <p class="text-xs text-slate-400 mt-1">Max 5 MB · JPG, PNG, WEBP, GIF</p>
              <p v-if="imgError" class="text-xs text-red-500 mt-1 font-semibold">{{ imgError }}</p>
            </div>

            <!-- URL input -->
            <div v-else class="mt-2">
              <input v-model="form.imageUrl" type="url" class="form-input" placeholder="https://example.com/image.jpg" />
            </div>

            <!-- Preview (both modes) -->
            <div v-if="form.imageUrl" class="mt-2 rounded-lg overflow-hidden h-32 bg-slate-100">
              <img :src="form.imageUrl" alt="preview" class="w-full h-full object-cover" @error="handleImgError" />
            </div>
          </div>

          <div class="form-group">
            <label>Content *</label>
            <textarea v-model="form.body" class="form-input" rows="4" placeholder="Share your update, design, promotion, or announcement…" required></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="showModal = false" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-teal">Publish Post</button>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
// NOTE: No 'premium' middleware — Basic can VIEW posts too

import { ref, reactive, onMounted } from 'vue'
import type { SeedPost } from '~/composables/useAuth'

const { user, isPremium, getPosts, savePosts } = useAuth()

const posts     = ref<SeedPost[]>([])
const loading   = ref(true)
const showModal = ref(false)
const form      = reactive({ title: '', body: '', tag: 'Announcement', imageUrl: '' })
let nextId = 100

// Image upload state
const imgMode      = ref<'upload' | 'url'>('upload')
const imgFileInput = ref<HTMLInputElement | null>(null)
const imgFileName  = ref('')
const imgError     = ref('')

onMounted(() => {
  posts.value = getPosts()
  if (posts.value.length > 0) {
    nextId = Math.max(...posts.value.map(p => p.id)) + 1
  }
  loading.value = false
})

const tagClass = (tag: string) => ({
  'Announcement': 'tag-blue',
  'Update':       'tag-green',
  'Showcase':     'tag-teal',
  'Promotion':    'tag-gold',
}[tag] ?? 'tag-blue')

function switchImgMode(mode: 'upload' | 'url') {
  imgMode.value = mode
  form.imageUrl = ''
  imgFileName.value = ''
  imgError.value = ''
}

const openCreate = () => {
  Object.assign(form, { title: '', body: '', tag: 'Announcement', imageUrl: '' })
  imgMode.value = 'upload'
  imgFileName.value = ''
  imgError.value = ''
  showModal.value = true
}

const handleImgError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = 'none'
}

function onImgFileSelected(e: Event) {
  imgError.value = ''
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) {
    imgError.value = 'Image too large. Max 5 MB allowed.'
    // Reset the input so the user can try again
    if (imgFileInput.value) imgFileInput.value.value = ''
    return
  }
  imgFileName.value = file.name
  const reader = new FileReader()
  reader.onload = (ev) => {
    form.imageUrl = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

const submitPost = () => {
  const newPost: SeedPost = {
    id: nextId++,
    title: form.title,
    body: form.body,
    tag: form.tag,
    imageUrl: form.imageUrl,
    date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: user.value?.name ?? 'Admin',
    authorPlan: 'premium',
  }
  posts.value.unshift(newPost)
  savePosts(posts.value)
  showModal.value = false
  // Reset upload state after publish
  imgFileName.value = ''
  imgError.value = ''
}

const deletePost = (id: number) => {
  posts.value = posts.value.filter(p => p.id !== id)
  savePosts(posts.value)
}
</script>

<style scoped>
/* Brand: Teal #009E97 | Gold #DCB03A | Charcoal #1A2026 */
.viewer-badge { background: rgba(0,158,151,0.08); border: 1px solid rgba(0,158,151,0.25); }
.post-card {
  background: white; border-radius: 1rem;
  padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid rgba(15,23,42,0.06); transition: all 0.2s;
}
.post-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.09); transform: translateY(-2px); }
.post-img-wrap { border-radius: 0.625rem; overflow: hidden; height: 160px; }
.post-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.post-card:hover .post-img { transform: scale(1.03); }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.post-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 9999px; letter-spacing: 0.02em; }
.tag-blue  { background: #EFF6FF; color: #1D4ED8; }
.tag-green { background: #F0FDF4; color: #15803D; }
.tag-teal  { background: rgba(0,158,151,0.1); color: #007A75; }
.tag-gold  { background: rgba(220,176,58,0.12); color: #92600A; }
.btn-teal { background: linear-gradient(135deg,#009E97,#007A75); color:#fff; font-weight:700; font-size:0.85rem; padding:0.6rem 1.25rem; border-radius:0.625rem; border:none; cursor:pointer; transition:all 0.15s; }
.btn-teal:hover { box-shadow:0 4px 12px rgba(0,158,151,0.35); transform:translateY(-1px); }
.btn-outline { background:white; color:#64748B; font-weight:600; font-size:0.85rem; padding:0.6rem 1.25rem; border-radius:0.625rem; border:1px solid #E2E8F0; cursor:pointer; }
.modal-overlay { position:fixed; inset:0; background:rgba(26,32,38,0.65); backdrop-filter:blur(4px); z-index:100; display:flex; align-items:center; justify-content:center; padding:1rem; }
.modal-box { background:white; border-radius:1.25rem; width:100%; max-width:540px; max-height:90vh; overflow-y:auto; box-shadow:0 25px 60px rgba(0,0,0,0.2); }
.modal-header { display:flex; justify-content:space-between; align-items:center; padding:1.25rem 1.5rem; border-bottom:1px solid #F1F5F9; }
.modal-title { font-size:1rem; font-weight:800; color:#1A2026; }
.modal-close { background:none; border:none; font-size:1rem; color:#94A3B8; cursor:pointer; padding:0.25rem 0.5rem; border-radius:0.5rem; }
.modal-close:hover { background:#F1F5F9; }
.form-group label { display:block; font-size:0.8rem; font-weight:600; color:#64748B; margin-bottom:0.375rem; }
.form-input { width:100%; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:0.625rem; padding:0.6rem 0.875rem; font-size:0.875rem; color:#1A2026; outline:none; resize:vertical; transition:border-color 0.15s; }
.form-input:focus { border-color:#009E97; box-shadow:0 0 0 3px rgba(0,158,151,0.14); }
/* Image mode tabs */
.img-tab-row { display:flex; gap:0.5rem; margin-bottom:0; }
.img-tab { flex:1; padding:0.45rem 0.75rem; border-radius:0.5rem; font-size:0.78rem; font-weight:600; border:1px solid #E2E8F0; background:#F8FAFC; color:#64748B; cursor:pointer; transition:all 0.15s; }
.img-tab:hover { border-color:#009E97; color:#009E97; }
.img-tab-active { background:rgba(0,158,151,0.1); border-color:#009E97 !important; color:#007A75 !important; }
/* Upload button */
.upload-btn { width:100%; padding:0.65rem 1rem; border-radius:0.625rem; border:2px dashed #CBD5E1; background:#F8FAFC; color:#64748B; font-size:0.82rem; font-weight:600; cursor:pointer; transition:all 0.15s; text-align:center; display:block; }
.upload-btn:hover { border-color:#009E97; color:#009E97; background:rgba(0,158,151,0.04); }
.upload-btn-ok { border-color:#009E97; border-style:solid; color:#007A75; background:rgba(0,158,151,0.06); }
</style>
