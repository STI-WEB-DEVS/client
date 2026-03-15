<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Team Members</h2>
        <p class="text-sm text-slate-500 mt-0.5">Manage system users — fetched via TeamService, editable locally</p>
      </div>
      <button @click="openAdd" class="btn-teal">+ Add Member</button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="n in 8" :key="n" class="card animate-pulse">
        <div class="flex items-center gap-3 mb-4">
          <div class="size-12 rounded-full bg-slate-200"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-slate-200 rounded w-3/4"></div>
            <div class="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
        <div class="space-y-2"><div class="h-3 bg-slate-200 rounded"></div><div class="h-3 bg-slate-200 rounded w-5/6"></div></div>
      </div>
    </div>

    <!-- Team Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="member in team" :key="member.id" class="member-card">
        <div class="member-avatar overflow-hidden" :style="!member.avatar ? {background: avatarColor(member.name)} : {}">
          <img v-if="member.avatar" :src="member.avatar" class="w-full h-full object-cover" />
          <span v-else>{{ initials(member.name) }}</span>
        </div>
        <div class="text-center mt-3 mb-3">
          <h3 class="font-bold text-slate-800">{{ member.name }}</h3>
          <p class="text-xs font-semibold mt-0.5" style="color:#009E97">@{{ member.username }}</p>
        </div>
        <div class="member-info">
          <div class="info-row"><span class="info-icon">✉</span><span class="truncate text-xs">{{ member.email }}</span></div>
          <div class="info-row"><span class="info-icon">📞</span><span class="text-xs">{{ member.phone }}</span></div>
          <div class="info-row"><span class="info-icon">🏢</span><span class="truncate text-xs">{{ member.company?.name }}</span></div>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="badge-green">Active</span>
          <div class="flex gap-1">
            <button @click="editMember(member)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
            <button @click="deleteMember(member)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── ADD / EDIT MODAL ─── -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">{{ modalMode==='edit'?'Edit Member':'Add Team Member' }}</h3>
          <button @click="closeModals" class="modal-close">✕</button>
        </div>
        <form @submit.prevent="saveMember" class="p-6 space-y-4">
          <!-- Avatar Upload -->
          <div class="flex flex-col items-center mb-2">
            <div class="relative group cursor-pointer" @click="triggerAvatarUpload">
              <div class="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-200 group-hover:border-teal-500 transition-colors">
                <img v-if="form.avatar" :src="form.avatar" class="w-full h-full object-cover" />
                <span v-else class="text-2xl text-slate-400">👤</span>
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <span class="text-white text-[10px] font-bold">CHANGE</span>
                </div>
              </div>
              <input ref="avatarInput" type="file" accept="image/*" class="hidden" @change="onAvatarSelected" />
            </div>
            <p class="text-[10px] text-slate-400 mt-1.5 uppercase font-bold tracking-wider">Member Photo</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-group col-span-2"><label>Full Name *</label><input v-model="form.name" type="text" class="form-input" required /></div>
            <div class="form-group"><label>Username *</label><input v-model="form.username" type="text" class="form-input" required /></div>
            <div class="form-group"><label>Phone</label><input v-model="form.phone" type="text" class="form-input" /></div>
            <div class="form-group col-span-2"><label>Email</label><input v-model="form.email" type="email" class="form-input" /></div>
            <div class="form-group"><label>Website</label><input v-model="form.website" type="text" class="form-input" /></div>
            <div class="form-group"><label>Company</label><input v-model="form.companyName" type="text" class="form-input" /></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModals" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-teal">{{ modalMode==='edit'?'Update Member':'Add Member' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box max-w-sm">
        <div class="p-6 text-center">
          <div class="size-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><span class="text-2xl">🗑️</span></div>
          <h3 class="text-lg font-bold text-slate-800">Remove Member?</h3>
          <p class="text-sm text-slate-500 mt-2">Remove <strong>{{ deleteTarget?.name }}</strong> from the team?</p>
          <div class="flex justify-center gap-3 mt-5">
            <button @click="closeModals" class="btn-outline">Cancel</button>
            <button @click="confirmDelete" class="btn-danger">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { TeamService } from '~/api/Team/TeamService'

const teamService = new TeamService()
const team = ref<any[]>([])
const loading = ref(true)

const showModal = ref(false)
const showDeleteConfirm = ref(false)
const modalMode = ref<'add'|'edit'>('add')
const selectedMember = ref<any>(null)
const deleteTarget = ref<any>(null)

const TEAM_KEY = 'satura_team_members'

const form = reactive({ name:'', username:'', email:'', phone:'', website:'', companyName:'', avatar: '' })
const avatarInput = ref<HTMLInputElement | null>(null)

const triggerAvatarUpload = () => avatarInput.value?.click()
const onAvatarSelected = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    form.avatar = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

onMounted(async () => {
  loading.value = true
  const stored = localStorage.getItem(TEAM_KEY)
  if (stored) {
    try {
      team.value = JSON.parse(stored)
      loading.value = false
      return
    } catch {}
  }

  try {
    const data = await teamService.getTeams() as any[]
    // Normalize to flat structure
    team.value = data.map((u:any) => ({
      id: u.id, name: u.name, username: u.username,
      email: u.email, phone: u.phone, website: u.website,
      company: u.company,
      avatar: '',
    }))
    localStorage.setItem(TEAM_KEY, JSON.stringify(team.value))
  } catch {
    team.value = []
  } finally {
    loading.value = false
  }
})

let nextId = 100

const openAdd = () => {
  Object.assign(form, { name:'', username:'', email:'', phone:'', website:'', companyName:'', avatar: '' })
  modalMode.value='add'; showModal.value=true
}
const editMember = (m:any) => {
  selectedMember.value=m
  Object.assign(form,{ name:m.name, username:m.username, email:m.email, phone:m.phone, website:m.website, companyName:m.company?.name||'', avatar: m.avatar || '' })
  modalMode.value='edit'; showModal.value=true
}
const deleteMember = (m:any) => { deleteTarget.value=m; showDeleteConfirm.value=true }

const saveMember = () => {
  if(modalMode.value==='add') {
    team.value.unshift({ id:nextId++, name:form.name, username:form.username, email:form.email, phone:form.phone, website:form.website, company:{ name:form.companyName }, avatar: form.avatar })
  } else {
    const idx = team.value.findIndex(x=>x.id===selectedMember.value?.id)
    if(idx!==-1) {
      Object.assign(team.value[idx],{ name:form.name, username:form.username, email:form.email, phone:form.phone, website:form.website, company:{ name:form.companyName }, avatar: form.avatar })
    }
  }
  localStorage.setItem(TEAM_KEY, JSON.stringify(team.value))
  closeModals()
}

const confirmDelete = () => {
  const i = team.value.findIndex(x=>x.id===deleteTarget.value?.id)
  if(i!==-1) {
    team.value.splice(i,1)
    localStorage.setItem(TEAM_KEY, JSON.stringify(team.value))
  }
  closeModals()
}
const closeModals = () => { showModal.value=false; showDeleteConfirm.value=false }

const initials = (name:string) => name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
const colors = [
  'linear-gradient(135deg,#F59E0B,#D97706)','linear-gradient(135deg,#3B82F6,#2563EB)',
  'linear-gradient(135deg,#10B981,#059669)','linear-gradient(135deg,#8B5CF6,#7C3AED)',
  'linear-gradient(135deg,#EF4444,#DC2626)','linear-gradient(135deg,#06B6D4,#0891B2)',
]
const avatarColor = (name:string) => colors[name.charCodeAt(0)%colors.length]
</script>

<style scoped>
.card{background:white;border-radius:1rem;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);}
.member-card{background:white;border-radius:1rem;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);transition:all 0.2s;display:flex;flex-direction:column;align-items:center;}
.member-card:hover{box-shadow:0 8px 24px rgba(0,0,0,0.1);transform:translateY(-2px);}
.member-avatar{width:60px;height:60px;border-radius:50%;color:white;font-weight:800;font-size:1.2rem;display:flex;align-items:center;justify-content:center;}
.member-info{width:100%;}
.info-row{display:flex;align-items:center;gap:0.4rem;margin-bottom:3px;color:#64748B;}
.info-icon{font-size:0.75rem;flex-shrink:0;}
.badge-green{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#F0FDF4;color:#16A34A;}
.action-btn{font-size:0.75rem;font-weight:600;padding:0.25rem 0.6rem;border-radius:0.5rem;border:none;cursor:pointer;transition:all 0.15s;background:transparent;}
.btn-teal{background:linear-gradient(135deg,#009E97,#007A75);color:#fff;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;transition:all 0.15s;}
.btn-teal:hover{box-shadow:0 4px 12px rgba(0,158,151,0.35);transform:translateY(-1px);}
.btn-outline{background:white;color:#64748B;font-weight:600;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:1px solid #E2E8F0;cursor:pointer;}
.btn-danger{background:#DC2626;color:white;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;}
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem;}
.modal-box{background:white;border-radius:1.25rem;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,0.2);}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid #F1F5F9;}
.modal-title{font-size:1.1rem;font-weight:800;color:#0F172A;}
.modal-close{background:none;border:none;font-size:1.1rem;color:#94A3B8;cursor:pointer;padding:0.25rem 0.5rem;border-radius:0.5rem;}
.modal-close:hover{background:#F1F5F9;}
.form-group label{display:block;font-size:0.8rem;font-weight:600;color:#64748B;margin-bottom:0.375rem;}
.form-input{width:100%;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:0.625rem;padding:0.6rem 0.875rem;font-size:0.875rem;color:#0F172A;outline:none;}
.form-input:focus{border-color:#009E97;box-shadow:0 0 0 3px rgba(0,158,151,0.12);}
</style>