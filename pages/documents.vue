<template>
  <NuxtLayout>
    <div class="documents-page">

      <!-- ── PAGE HEADER ── -->
      <div class="page-header">
        <div>
          <p class="page-eyebrow">Manage</p>
          <h1 class="page-title">Documents</h1>
        </div>
        <div class="header-actions">
          <button class="btn-outline" @click="openUploadModal">
            <ArrowUpTrayIcon class="size-4" /> Upload File
          </button>
          <button class="btn-gold" @click="openNewFolderModal">
            <FolderPlusIcon class="size-4" /> New Folder
          </button>
        </div>
      </div>

      <!-- ── STAT PILLS ── -->
      <div class="doc-stats">
        <div v-for="s in docStats" :key="s.label" class="dstat-card">
          <div class="dstat-icon" :style="{ background: s.bg }">
            <component :is="s.icon" class="size-4" :style="{ color: s.color }" />
          </div>
          <div>
            <p class="dstat-value">{{ s.value }}</p>
            <p class="dstat-label">{{ s.label }}</p>
          </div>
        </div>
      </div>

      <!-- ── BREADCRUMB ── -->
      <div class="breadcrumb">
        <button class="bc-item bc-root" @click="goToRoot">
          <HomeIcon class="size-3.5" /> All Files
        </button>
        <template v-if="currentFolder">
          <span class="bc-sep">›</span>
          <span class="bc-item bc-current">{{ currentFolder.name }}</span>
        </template>
      </div>

      <!-- ── TOOLBAR ── -->
      <div class="toolbar">
        <div class="search-wrap">
          <MagnifyingGlassIcon class="search-icon size-4" />
          <input
            v-model="search"
            type="text"
            placeholder="Search files and folders..."
            class="search-input"
          />
        </div>
        <div class="filters">
          <select v-model="filterType" class="filter-select">
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="docx">Word</option>
            <option value="xlsx">Excel</option>
            <option value="img">Image</option>
            <option value="folder">Folder</option>
          </select>
          <select v-model="sortBy" class="filter-select">
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="size">Size</option>
          </select>
          <div class="view-toggle">
            <button :class="['toggle-btn', view === 'grid' ? 'active' : '']" @click="view = 'grid'">
              <Squares2X2Icon class="size-4" />
            </button>
            <button :class="['toggle-btn', view === 'list' ? 'active' : '']" @click="view = 'list'">
              <ListBulletIcon class="size-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- ── FOLDERS ROW (only when in root) ── -->
      <template v-if="!currentFolder">
        <p class="section-label">Folders</p>
        <div class="folders-row">
          <div
            v-for="folder in filteredFolders"
            :key="folder.id"
            class="folder-card"
            @click="openFolder(folder)"
          >
            <div class="folder-icon-wrap">
              <FolderIcon class="size-8 folder-icon" />
              <span class="folder-count">{{ folder.files }} files</span>
            </div>
            <div class="folder-info">
              <p class="folder-name">{{ folder.name }}</p>
              <p class="folder-meta">{{ folder.size }} · {{ folder.updated }}</p>
            </div>
            <div class="folder-actions" @click.stop>
              <button class="icon-btn" @click="confirmDeleteFolder(folder)" title="Delete folder">
                <TrashIcon class="size-3.5" />
              </button>
            </div>
          </div>
          <div v-if="filteredFolders.length === 0" class="empty-folders">
            No folders yet.
          </div>
        </div>
      </template>

      <!-- ── FILES ── -->
      <p class="section-label">{{ currentFolder ? currentFolder.name : 'Files' }}</p>

      <!-- GRID VIEW -->
      <div v-if="view === 'grid'" class="files-grid">
        <div
          v-for="file in filteredFiles"
          :key="file.id"
          class="file-card"
          @click="previewFile(file)"
        >
          <div class="file-preview" :style="{ background: fileColor(file.type) + '18' }">
            <component :is="fileIcon(file.type)" class="size-8" :style="{ color: fileColor(file.type) }" />
            <span class="file-ext">{{ file.type.toUpperCase() }}</span>
          </div>
          <div class="file-info">
            <p class="file-name" :title="file.name">{{ file.name }}</p>
            <p class="file-meta">{{ file.size }} · {{ file.date }}</p>
          </div>
          <div class="file-actions" @click.stop>
            <button class="icon-btn download" title="Download"><ArrowDownTrayIcon class="size-3.5" /></button>
            <button class="icon-btn delete"   title="Delete" @click="confirmDeleteFile(file)"><TrashIcon class="size-3.5" /></button>
          </div>
        </div>
        <div v-if="filteredFiles.length === 0" class="empty-state">
          <DocumentIcon class="size-10" style="color:#d1cdc7" />
          <p>No files found.</p>
        </div>
      </div>

      <!-- LIST VIEW -->
      <div v-else class="card">
        <div class="table-wrap">
          <table class="files-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Modified</th>
                <th>Uploaded by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredFiles.length === 0">
                <td colspan="6" class="empty-row">No files found.</td>
              </tr>
              <tr v-for="file in filteredFiles" :key="file.id" class="file-row" @click="previewFile(file)">
                <td>
                  <div class="file-name-cell">
                    <div class="file-icon-sm" :style="{ background: fileColor(file.type) + '18' }">
                      <component :is="fileIcon(file.type)" class="size-4" :style="{ color: fileColor(file.type) }" />
                    </div>
                    <span class="fn-text">{{ file.name }}</span>
                  </div>
                </td>
                <td>
                  <span class="type-badge" :style="{ background: fileColor(file.type) + '18', color: fileColor(file.type) }">
                    {{ file.type.toUpperCase() }}
                  </span>
                </td>
                <td class="td-muted">{{ file.size }}</td>
                <td class="td-muted">{{ file.date }}</td>
                <td>
                  <div class="uploader-cell">
                    <img :src="file.uploaderAvatar" class="uploader-avatar" :alt="file.uploader" />
                    <span class="td-muted">{{ file.uploader }}</span>
                  </div>
                </td>
                <td @click.stop>
                  <div class="action-btns">
                    <button class="action-btn download" title="Download"><ArrowDownTrayIcon class="size-4" /></button>
                    <button class="action-btn delete" title="Delete" @click="confirmDeleteFile(file)"><TrashIcon class="size-4" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- ══════════════════════════════ -->
    <!--   FILE PREVIEW MODAL          -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showPreview" class="modal-backdrop" @click.self="showPreview = false">
          <div class="modal modal-preview">
            <div class="modal-header">
              <div class="preview-title-wrap">
                <div class="file-icon-sm" :style="{ background: fileColor(previewingFile?.type) + '18' }">
                  <component :is="fileIcon(previewingFile?.type)" class="size-4" :style="{ color: fileColor(previewingFile?.type) }" />
                </div>
                <h2 class="modal-title">{{ previewingFile?.name }}</h2>
              </div>
              <button class="modal-close" @click="showPreview = false"><XMarkIcon class="size-5" /></button>
            </div>
            <div class="modal-body preview-body">
              <!-- Fake preview area -->
              <div class="preview-area" :style="{ background: fileColor(previewingFile?.type) + '10' }">
                <component :is="fileIcon(previewingFile?.type)" class="size-16 preview-big-icon" :style="{ color: fileColor(previewingFile?.type) }" />
                <p class="preview-filename">{{ previewingFile?.name }}</p>
                <p class="preview-meta">{{ previewingFile?.size }} · Last modified {{ previewingFile?.date }}</p>
              </div>
              <!-- File details -->
              <div class="preview-details">
                <div class="pd-row"><span class="pd-label">Type</span><span class="pd-val">{{ previewingFile?.type?.toUpperCase() }} File</span></div>
                <div class="pd-row"><span class="pd-label">Size</span><span class="pd-val">{{ previewingFile?.size }}</span></div>
                <div class="pd-row"><span class="pd-label">Uploaded by</span><span class="pd-val">{{ previewingFile?.uploader }}</span></div>
                <div class="pd-row"><span class="pd-label">Date</span><span class="pd-val">{{ previewingFile?.date }}</span></div>
                <div class="pd-row"><span class="pd-label">Category</span><span class="pd-val">{{ previewingFile?.category }}</span></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showPreview = false">Close</button>
              <button class="btn-gold">⬇ Download</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════ -->
    <!--   UPLOAD MODAL                -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showUploadModal" class="modal-backdrop" @click.self="showUploadModal = false">
          <div class="modal">
            <div class="modal-header">
              <h2 class="modal-title">Upload File</h2>
              <button class="modal-close" @click="showUploadModal = false"><XMarkIcon class="size-5" /></button>
            </div>
            <div class="modal-body">
              <!-- Drop zone -->
              <div
                class="dropzone"
                :class="{ dragging: isDragging }"
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="handleDrop"
              >
                <ArrowUpTrayIcon class="size-10 dz-icon" />
                <p class="dz-title">Drag & drop files here</p>
                <p class="dz-sub">or click to browse</p>
                <input type="file" class="dz-input" multiple @change="handleFileSelect" />
              </div>
              <!-- Selected files -->
              <div v-if="uploadQueue.length" class="upload-queue">
                <div v-for="(f, i) in uploadQueue" :key="i" class="uq-item">
                  <DocumentIcon class="size-4 text-gray-400" />
                  <span class="uq-name">{{ f.name }}</span>
                  <span class="uq-size">{{ formatBytes(f.size) }}</span>
                  <button class="uq-remove" @click="uploadQueue.splice(i,1)">
                    <XMarkIcon class="size-3.5" />
                  </button>
                </div>
              </div>
              <div class="form-grid mt-4">
                <div class="form-group">
                  <label>Save to Folder</label>
                  <select v-model="uploadFolder">
                    <option value="">Root (no folder)</option>
                    <option v-for="f in folders" :key="f.id" :value="f.id">{{ f.name }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Category</label>
                  <select v-model="uploadCategory">
                    <option>General</option>
                    <option>Client Records</option>
                    <option>Financial</option>
                    <option>HR & Staff</option>
                    <option>Marketing</option>
                    <option>Legal</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showUploadModal = false">Cancel</button>
              <button class="btn-gold" @click="submitUpload" :disabled="!uploadQueue.length">
                Upload {{ uploadQueue.length ? `(${uploadQueue.length})` : '' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════ -->
    <!--   NEW FOLDER MODAL            -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showFolderModal" class="modal-backdrop" @click.self="showFolderModal = false">
          <div class="modal modal-sm">
            <div class="modal-header">
              <h2 class="modal-title">New Folder</h2>
              <button class="modal-close" @click="showFolderModal = false"><XMarkIcon class="size-5" /></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Folder Name</label>
                <input v-model="newFolderName" type="text" placeholder="e.g. Client Waivers" @keyup.enter="createFolder" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showFolderModal = false">Cancel</button>
              <button class="btn-gold" @click="createFolder">Create Folder</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════ -->
    <!--   DELETE CONFIRMATION         -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="modal-backdrop" @click.self="showDeleteModal = false">
          <div class="modal modal-sm">
            <div class="modal-header">
              <h2 class="modal-title">Delete {{ deletingItem?.type === 'folder' ? 'Folder' : 'File' }}</h2>
              <button class="modal-close" @click="showDeleteModal = false"><XMarkIcon class="size-5" /></button>
            </div>
            <div class="modal-body">
              <div class="delete-icon-wrap"><TrashIcon class="size-8" style="color:#c0725a" /></div>
              <p class="delete-msg">
                Are you sure you want to delete
                <strong>{{ deletingItem?.name }}</strong>?
                This cannot be undone.
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showDeleteModal = false">Cancel</button>
              <button class="btn-danger" @click="deleteItem">Yes, Delete</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </NuxtLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon, FolderIcon, FolderPlusIcon,
  DocumentIcon, TrashIcon, XMarkIcon, HomeIcon,
  ArrowUpTrayIcon, ArrowDownTrayIcon, Squares2X2Icon,
  ListBulletIcon, DocumentTextIcon, DocumentChartBarIcon,
  PhotoIcon, ArchiveBoxIcon,
} from '@heroicons/vue/24/outline'

// ── VIEWS & FILTERS ──
const view         = ref('grid')
const search       = ref('')
const filterType   = ref('')
const sortBy       = ref('name')
const currentFolder = ref(null)

// ── FOLDERS ──
const folders = ref([
  { id:1, name:'Client Records',   files:12, size:'48.2 MB', updated:'Mar 14, 2026' },
  { id:2, name:'Financial Reports',files:8,  size:'22.5 MB', updated:'Mar 12, 2026' },
  { id:3, name:'HR & Staff',       files:5,  size:'10.8 MB', updated:'Mar 10, 2026' },
  { id:4, name:'Marketing Assets', files:15, size:'85.4 MB', updated:'Mar 8,  2026' },
  { id:5, name:'Legal Documents',  files:4,  size:'6.2 MB',  updated:'Feb 28, 2026' },
  { id:6, name:'Client Waivers',   files:22, size:'14.6 MB', updated:'Mar 15, 2026' },
])

// ── FILES ──
const allFiles = ref([
  { id:1,  name:'Q1 Revenue Report 2026.pdf',       type:'pdf',  size:'2.4 MB',  date:'Mar 14, 2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'Financial',      folderId: 2 },
  { id:2,  name:'Staff Schedule March.xlsx',         type:'xlsx', size:'840 KB',  date:'Mar 13, 2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'HR & Staff',     folderId: 3 },
  { id:3,  name:'Servora Menu 2026.pdf',             type:'pdf',  size:'5.1 MB',  date:'Mar 10, 2026', uploader:'Liza Macaraeg',  uploaderAvatar:'https://i.pravatar.cc/32?img=16', category:'Marketing',      folderId: 4 },
  { id:4,  name:'Client Intake Form Template.docx',  type:'docx', size:'320 KB',  date:'Mar 9,  2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'Client Records', folderId: 1 },
  { id:5,  name:'Spa Banner March.png',              type:'img',  size:'3.8 MB',  date:'Mar 8,  2026', uploader:'Jenny Ortega',   uploaderAvatar:'https://i.pravatar.cc/32?img=21', category:'Marketing',      folderId: 4 },
  { id:6,  name:'Employee Contract Template.docx',   type:'docx', size:'450 KB',  date:'Mar 7,  2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'HR & Staff',     folderId: 3 },
  { id:7,  name:'February Expenses.xlsx',            type:'xlsx', size:'1.2 MB',  date:'Mar 5,  2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'Financial',      folderId: 2 },
  { id:8,  name:'Waiver - Maria Santos.pdf',         type:'pdf',  size:'180 KB',  date:'Mar 4,  2026', uploader:'Liza Macaraeg',  uploaderAvatar:'https://i.pravatar.cc/32?img=16', category:'Client Waivers', folderId: 6 },
  { id:9,  name:'Waiver - Ana Reyes.pdf',            type:'pdf',  size:'175 KB',  date:'Mar 3,  2026', uploader:'Jenny Ortega',   uploaderAvatar:'https://i.pravatar.cc/32?img=21', category:'Client Waivers', folderId: 6 },
  { id:10, name:'Business Permit 2026.pdf',          type:'pdf',  size:'950 KB',  date:'Feb 28, 2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'Legal',          folderId: 5 },
  { id:11, name:'Promo Poster April.png',            type:'img',  size:'4.2 MB',  date:'Feb 25, 2026', uploader:'Jenny Ortega',   uploaderAvatar:'https://i.pravatar.cc/32?img=21', category:'Marketing',      folderId: 4 },
  { id:12, name:'Inventory Checklist.xlsx',          type:'xlsx', size:'620 KB',  date:'Feb 20, 2026', uploader:'Mark Reyes',     uploaderAvatar:'https://i.pravatar.cc/32?img=51', category:'General',        folderId: null },
  { id:13, name:'Therapist Handbook.pdf',            type:'pdf',  size:'3.6 MB',  date:'Feb 15, 2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'HR & Staff',     folderId: 3 },
  { id:14, name:'Brand Guidelines.pdf',              type:'pdf',  size:'8.2 MB',  date:'Feb 10, 2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'Marketing',      folderId: 4 },
  { id:15, name:'Annual Summary 2025.xlsx',          type:'xlsx', size:'2.1 MB',  date:'Jan 31, 2026', uploader:'Nicole Santos',  uploaderAvatar:'https://i.pravatar.cc/32?img=47', category:'Financial',      folderId: 2 },
])

// ── COMPUTED ──
const docStats = computed(() => [
  { label:'Total Files',   value: allFiles.value.length,                                   icon: DocumentIcon,          bg:'rgba(201,169,110,0.1)',  color:'#c9a96e' },
  { label:'Total Folders', value: folders.value.length,                                    icon: FolderIcon,            bg:'rgba(106,155,103,0.1)',  color:'#6a9b67' },
  { label:'PDFs',          value: allFiles.value.filter(f => f.type === 'pdf').length,     icon: DocumentTextIcon,      bg:'rgba(192,114,90,0.1)',   color:'#c0725a' },
  { label:'Spreadsheets',  value: allFiles.value.filter(f => f.type === 'xlsx').length,    icon: DocumentChartBarIcon,  bg:'rgba(74,138,71,0.1)',    color:'#4a8a47' },
  { label:'Images',        value: allFiles.value.filter(f => f.type === 'img').length,     icon: PhotoIcon,             bg:'rgba(122,143,166,0.1)',  color:'#7a8fa6' },
])

const filteredFolders = computed(() => {
  const q = search.value.toLowerCase()
  let list = folders.value.filter(f => !q || f.name.toLowerCase().includes(q))
  if (filterType.value && filterType.value !== 'folder') return []
  return list
})

const filteredFiles = computed(() => {
  const q = search.value.toLowerCase()
  let list = allFiles.value.filter(f => {
    const inFolder = currentFolder.value ? f.folderId === currentFolder.value.id : f.folderId === null
    const matchSearch = !q || f.name.toLowerCase().includes(q)
    const matchType   = !filterType.value || filterType.value === 'folder' || f.type === filterType.value
    return inFolder && matchSearch && matchType
  })
  if (sortBy.value === 'date') list = [...list].sort((a,b) => new Date(b.date) - new Date(a.date))
  if (sortBy.value === 'name') list = [...list].sort((a,b) => a.name.localeCompare(b.name))
  return list
})

// ── FILE HELPERS ──
function fileIcon(type) {
  const map = { pdf: DocumentTextIcon, docx: DocumentIcon, xlsx: DocumentChartBarIcon, img: PhotoIcon }
  return map[type] || DocumentIcon
}
function fileColor(type) {
  const map = { pdf:'#c0725a', docx:'#7a8fa6', xlsx:'#4a8a47', img:'#9a6e8a' }
  return map[type] || '#c9a96e'
}
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB'
  return (bytes/1048576).toFixed(1) + ' MB'
}

// ── NAVIGATION ──
function openFolder(folder) { currentFolder.value = folder }
function goToRoot()         { currentFolder.value = null }

// ── PREVIEW ──
const showPreview   = ref(false)
const previewingFile = ref(null)
function previewFile(file) {
  previewingFile.value = file
  showPreview.value = true
}

// ── UPLOAD ──
const showUploadModal  = ref(false)
const uploadQueue      = ref([])
const uploadFolder     = ref('')
const uploadCategory   = ref('General')
const isDragging       = ref(false)

function openUploadModal() { uploadQueue.value = []; showUploadModal.value = true }
function handleDrop(e)  {
  isDragging.value = false
  uploadQueue.value.push(...Array.from(e.dataTransfer.files))
}
function handleFileSelect(e) { uploadQueue.value.push(...Array.from(e.target.files)) }
function submitUpload() {
  uploadQueue.value.forEach(f => {
    allFiles.value.unshift({
      id: Date.now() + Math.random(),
      name: f.name,
      type: f.name.split('.').pop().toLowerCase().replace('png','img').replace('jpg','img').replace('jpeg','img'),
      size: formatBytes(f.size),
      date: new Date().toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' }),
      uploader: 'Nicole Santos',
      uploaderAvatar: 'https://i.pravatar.cc/32?img=47',
      category: uploadCategory.value,
      folderId: uploadFolder.value || null,
    })
  })
  showUploadModal.value = false
}

// ── NEW FOLDER ──
const showFolderModal = ref(false)
const newFolderName   = ref('')
function openNewFolderModal() { newFolderName.value = ''; showFolderModal.value = true }
function createFolder() {
  if (!newFolderName.value.trim()) return
  folders.value.unshift({
    id: Date.now(),
    name: newFolderName.value.trim(),
    files: 0,
    size: '0 KB',
    updated: new Date().toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' }),
  })
  showFolderModal.value = false
}

// ── DELETE ──
const showDeleteModal = ref(false)
const deletingItem    = ref(null)

function confirmDeleteFile(file) {
  deletingItem.value = { ...file, _kind: 'file' }
  showDeleteModal.value = true
}
function confirmDeleteFolder(folder) {
  deletingItem.value = { ...folder, type: 'folder', _kind: 'folder' }
  showDeleteModal.value = true
}
function deleteItem() {
  if (deletingItem.value._kind === 'file') {
    allFiles.value = allFiles.value.filter(f => f.id !== deletingItem.value.id)
  } else {
    folders.value = folders.value.filter(f => f.id !== deletingItem.value.id)
  }
  showDeleteModal.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.documents-page { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── HEADER ── */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.8rem; }
.page-eyebrow { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.2rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: #1a1a14; letter-spacing: 0.02em; }
.header-actions { display: flex; gap: 0.75rem; align-items: center; }
.btn-gold { display: flex; align-items: center; gap: 0.4rem; background: #c9a96e; color: #1a1a14; border: none; padding: 0.7rem 1.3rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s, transform 0.2s; }
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }
.btn-gold:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.btn-outline { display: flex; align-items: center; gap: 0.4rem; background: #fff; color: #1a1a14; border: 1px solid rgba(201,169,110,0.35); padding: 0.68rem 1.3rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: all 0.2s; }
.btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }

/* ── STATS ── */
.doc-stats { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.dstat-card { background: #fff; border-radius: 8px; padding: 0.9rem 1.2rem; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 12px rgba(26,26,20,0.04); display: flex; align-items: center; gap: 0.85rem; }
.dstat-icon { padding: 0.55rem; border-radius: 8px; flex-shrink: 0; }
.dstat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; color: #1a1a14; line-height: 1; }
.dstat-label { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; margin-top: 2px; }

/* ── BREADCRUMB ── */
.breadcrumb { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; }
.bc-item { display: flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; color: #6b7280; }
.bc-root { background: none; border: none; cursor: pointer; padding: 0; transition: color 0.2s; }
.bc-root:hover { color: #c9a96e; }
.bc-current { color: #1a1a14; font-weight: 500; }
.bc-sep { color: #c4bfb6; font-size: 1rem; }

/* ── TOOLBAR ── */
.toolbar { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
.search-input { width: 100%; padding: 0.65rem 0.85rem 0.65rem 2.4rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; }
.search-input:focus { border-color: #c9a96e; }
.search-input::placeholder { color: #c4bfb6; }
.filters { display: flex; gap: 0.75rem; align-items: center; }
.filter-select { padding: 0.65rem 1rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.8rem; color: #374151; background: #fff; outline: none; cursor: pointer; }
.filter-select:focus { border-color: #c9a96e; }
.view-toggle { display: flex; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; overflow: hidden; }
.toggle-btn { padding: 0.55rem 0.75rem; background: #fff; border: none; cursor: pointer; color: #9ca3af; display: flex; align-items: center; transition: background 0.15s, color 0.15s; }
.toggle-btn.active { background: #c9a96e; color: #1a1a14; }

/* ── SECTION LABEL ── */
.section-label { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.85rem; font-weight: 500; }

/* ── FOLDERS ROW ── */
.folders-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
.folder-card { background: #fff; border-radius: 10px; border: 1px solid rgba(201,169,110,0.15); padding: 1.1rem; display: flex; flex-direction: column; gap: 0.75rem; cursor: pointer; transition: box-shadow 0.2s, transform 0.2s; position: relative; }
.folder-card:hover { box-shadow: 0 6px 24px rgba(26,26,20,0.1); transform: translateY(-2px); }
.folder-icon-wrap { display: flex; flex-direction: column; align-items: flex-start; gap: 0.2rem; }
.folder-icon { color: #c9a96e; }
.folder-count { font-size: 0.62rem; color: #9ca3af; letter-spacing: 0.05em; }
.folder-name { font-size: 0.85rem; font-weight: 500; color: #1a1a14; }
.folder-meta { font-size: 0.68rem; color: #9ca3af; margin-top: 2px; }
.folder-actions { position: absolute; top: 0.75rem; right: 0.75rem; opacity: 0; transition: opacity 0.15s; }
.folder-card:hover .folder-actions { opacity: 1; }
.icon-btn { padding: 0.35rem; border-radius: 5px; border: none; cursor: pointer; display: flex; align-items: center; transition: background 0.15s; }
.icon-btn.download { background: rgba(201,169,110,0.1); color: #a07830; }
.icon-btn.download:hover { background: rgba(201,169,110,0.25); }
.icon-btn.delete   { background: rgba(192,114,90,0.1); color: #b05540; }
.icon-btn.delete:hover { background: rgba(192,114,90,0.25); }
.empty-folders { color: #9ca3af; font-size: 0.82rem; grid-column: 1/-1; padding: 1rem 0; }

/* ── FILES GRID ── */
.files-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 1rem; }
.file-card { background: #fff; border-radius: 10px; border: 1px solid rgba(201,169,110,0.12); overflow: hidden; cursor: pointer; transition: box-shadow 0.2s, transform 0.2s; display: flex; flex-direction: column; }
.file-card:hover { box-shadow: 0 6px 24px rgba(26,26,20,0.1); transform: translateY(-2px); }
.file-preview { padding: 1.6rem 1rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
.file-ext { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em; opacity: 0.7; }
.file-info { padding: 0.75rem; border-top: 1px solid rgba(201,169,110,0.08); }
.file-name { font-size: 0.75rem; font-weight: 500; color: #1a1a14; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.file-meta { font-size: 0.65rem; color: #9ca3af; margin-top: 2px; }
.file-actions { padding: 0.5rem 0.75rem; border-top: 1px solid rgba(201,169,110,0.08); display: flex; gap: 0.4rem; justify-content: flex-end; }

/* ── FILES TABLE ── */
.card { background: #fff; border-radius: 10px; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); overflow: hidden; }
.table-wrap { overflow-x: auto; }
.files-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.files-table thead tr { border-bottom: 1px solid rgba(201,169,110,0.15); }
.files-table th { text-align: left; font-size: 0.63rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; font-weight: 500; padding: 1rem 1rem 0.85rem; }
.files-table tbody tr { border-bottom: 1px solid #f9f5ef; transition: background 0.15s; cursor: pointer; }
.file-row:hover { background: #fdf8f0; }
.files-table td { padding: 0.85rem 1rem; vertical-align: middle; }
.file-name-cell { display: flex; align-items: center; gap: 0.75rem; }
.file-icon-sm { width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.fn-text { font-weight: 500; color: #1a1a14; white-space: nowrap; }
.type-badge { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; padding: 0.2rem 0.55rem; border-radius: 999px; }
.td-muted { color: #6b7280; }
.uploader-cell { display: flex; align-items: center; gap: 0.5rem; }
.uploader-avatar { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
.action-btns { display: flex; gap: 0.4rem; }
.action-btn { padding: 0.4rem; border-radius: 6px; border: none; cursor: pointer; display: flex; align-items: center; transition: background 0.15s; }
.action-btn.download { background: rgba(201,169,110,0.1); color: #a07830; }
.action-btn.download:hover { background: rgba(201,169,110,0.25); }
.action-btn.delete { background: rgba(192,114,90,0.1); color: #b05540; }
.action-btn.delete:hover { background: rgba(192,114,90,0.25); }
.empty-row { text-align: center; color: #9ca3af; padding: 3rem; font-size: 0.85rem; }
.empty-state { grid-column: 1/-1; text-align: center; padding: 3rem; color: #9ca3af; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; font-size: 0.85rem; }

/* ── MODAL ── */
.modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(26,26,20,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(26,26,20,0.2); border: 1px solid rgba(201,169,110,0.15); }
.modal-sm { max-width: 400px; }
.modal-preview { max-width: 520px; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(201,169,110,0.12); }
.modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em; }
.modal-close { background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0.25rem; border-radius: 4px; transition: color 0.2s; }
.modal-close:hover { color: #1a1a14; }
.modal-body { padding: 1.6rem; }
.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.2rem 1.6rem; border-top: 1px solid rgba(201,169,110,0.12); }

/* ── PREVIEW MODAL ── */
.preview-title-wrap { display: flex; align-items: center; gap: 0.75rem; }
.preview-body { display: flex; flex-direction: column; gap: 1.25rem; }
.preview-area { border-radius: 10px; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.preview-big-icon { opacity: 0.7; }
.preview-filename { font-size: 0.9rem; font-weight: 500; color: #1a1a14; text-align: center; }
.preview-meta { font-size: 0.72rem; color: #9ca3af; text-align: center; }
.preview-details { display: flex; flex-direction: column; gap: 0.6rem; }
.pd-row { display: flex; align-items: center; gap: 1rem; padding: 0.5rem 0; border-bottom: 1px solid #f9f5ef; }
.pd-label { font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; width: 100px; flex-shrink: 0; }
.pd-val { font-size: 0.82rem; color: #1a1a14; }

/* ── DROP ZONE ── */
.dropzone { position: relative; border: 2px dashed rgba(201,169,110,0.35); border-radius: 10px; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
.dropzone:hover, .dropzone.dragging { border-color: #c9a96e; background: rgba(201,169,110,0.04); }
.dz-icon { color: #c9a96e; opacity: 0.6; }
.dz-title { font-size: 0.88rem; font-weight: 500; color: #374151; }
.dz-sub { font-size: 0.75rem; color: #9ca3af; }
.dz-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }

/* ── UPLOAD QUEUE ── */
.upload-queue { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
.uq-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.85rem; background: #fdf8f0; border-radius: 6px; border: 1px solid rgba(201,169,110,0.15); }
.uq-name { flex: 1; font-size: 0.78rem; color: #1a1a14; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.uq-size { font-size: 0.7rem; color: #9ca3af; flex-shrink: 0; }
.uq-remove { background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0.15rem; display: flex; align-items: center; transition: color 0.2s; }
.uq-remove:hover { color: #c0725a; }
.mt-4 { margin-top: 1rem; }

/* ── FORM ── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280; font-weight: 500; }
.form-group input, .form-group select { padding: 0.65rem 0.85rem; border: 1px solid rgba(201,169,110,0.25); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; }
.form-group input:focus, .form-group select:focus { border-color: #c9a96e; }

/* ── DELETE ── */
.delete-icon-wrap { display: flex; justify-content: center; margin-bottom: 1rem; }
.delete-msg { text-align: center; font-size: 0.88rem; color: #374151; line-height: 1.6; }
.delete-msg strong { color: #1a1a14; font-weight: 600; }
.btn-ghost-dark { background: none; border: 1px solid rgba(26,26,20,0.15); color: #6b7280; padding: 0.7rem 1.4rem; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.btn-ghost-dark:hover { border-color: #1a1a14; color: #1a1a14; }
.btn-danger { background: #c0725a; color: #fff; border: none; padding: 0.7rem 1.4rem; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.btn-danger:hover { background: #a85a44; }

/* ── TRANSITIONS ── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s, transform 0.25s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96) translateY(10px); }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .files-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .folders-row { grid-template-columns: 1fr 1fr; }
  .form-grid { grid-template-columns: 1fr; }
}
</style>