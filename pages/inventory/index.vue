<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Inventory & Suppliers</h2>
        <p class="text-sm text-slate-500 mt-0.5">Monitor materials and manage supplier records</p>
      </div>
      <button @click="openAddMaterial" class="btn-teal">+ Add Material</button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="mini-card"><p class="mini-value text-slate-800">{{ inventory.length }}</p><p class="mini-label">Total Materials</p></div>
      <div class="mini-card"><p class="mini-value text-amber-600">{{ inventory.filter(i=>i.stock>0&&i.stock<=i.reorder).length }}</p><p class="mini-label">Low Stock</p></div>
      <div class="mini-card"><p class="mini-value text-red-600">{{ inventory.filter(i=>i.stock===0).length }}</p><p class="mini-label">Out of Stock</p></div>
      <div class="mini-card"><p class="mini-value text-blue-600">{{ suppliers.length }}</p><p class="mini-label">Suppliers</p></div>
    </div>

    <!-- Inventory Table -->
    <div class="card mb-6">
      <h3 class="section-title mb-4">Material Inventory</h3>
      <!-- Desktop table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Material</th><th class="th">Category</th>
              <th class="th">Stock</th><th class="th">Unit</th>
              <th class="th">Reorder</th><th class="th">Supplier</th>
              <th class="th">Status</th><th class="th">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="item in inventory" :key="item.id" class="tr-hover">
              <td class="td font-semibold text-slate-800">{{ item.name }}</td>
              <td class="td text-slate-500">{{ item.category }}</td>
              <td class="td font-bold" :class="item.stock<=item.reorder?'text-red-600':'text-slate-700'">{{ item.stock }}</td>
              <td class="td text-slate-500">{{ item.unit }}</td>
              <td class="td text-slate-400">{{ item.reorder }}</td>
              <td class="td text-slate-500">{{ item.supplier }}</td>
              <td class="td">
                <span :class="item.stock===0?'badge-red':item.stock<=item.reorder?'badge-yellow':'badge-green'">
                  {{ item.stock===0?'Out of Stock':item.stock<=item.reorder?'Low Stock':'In Stock' }}
                </span>
              </td>
              <td class="td">
                <div class="flex items-center gap-2">
                  <button @click="viewMaterial(item)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
                  <button @click="editMaterial(item)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
                  <button @click="deleteMaterial(item)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Mobile cards -->
      <div class="md:hidden space-y-3">
        <div v-for="item in inventory" :key="item.id" class="mobile-card">
          <div class="flex items-start justify-between mb-1">
            <p class="font-semibold text-slate-800 text-sm pr-2">{{ item.name }}</p>
            <span :class="item.stock===0?'badge-red shrink-0':item.stock<=item.reorder?'badge-yellow shrink-0':'badge-green shrink-0'">
              {{ item.stock===0?'Out of Stock':item.stock<=item.reorder?'Low Stock':'In Stock' }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-500 mt-2">
            <span>📦 {{ item.category }}</span>
            <span class="font-bold" :class="item.stock<=item.reorder?'text-red-600':'text-slate-700'">{{ item.stock }} {{ item.unit }}</span>
            <span>🔄 Reorder: {{ item.reorder }}</span>
            <span>🏭 {{ item.supplier }}</span>
          </div>
          <div class="flex gap-2 pt-2 mt-2 border-t border-slate-100">
            <button @click="viewMaterial(item)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
            <button @click="editMaterial(item)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
            <button @click="deleteMaterial(item)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Suppliers Table -->
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <h3 class="section-title">Suppliers</h3>
        <button @click="openAddSupplier" class="btn-outline-sm">+ Add Supplier</button>
      </div>
      <!-- Desktop table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Supplier</th><th class="th">Contact</th>
              <th class="th">Phone</th><th class="th">Materials</th>
              <th class="th">Last Order</th><th class="th">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="s in suppliers" :key="s.id" class="tr-hover">
              <td class="td font-semibold text-slate-800">{{ s.name }}</td>
              <td class="td text-slate-600">{{ s.contact }}</td>
              <td class="td text-slate-500">{{ s.phone }}</td>
              <td class="td text-slate-500 text-xs">{{ s.materials }}</td>
              <td class="td text-slate-500">{{ s.lastOrder }}</td>
              <td class="td">
                <div class="flex items-center gap-2">
                  <button @click="editSupplier(s)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
                  <button @click="deleteSupplierItem(s)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Mobile cards -->
      <div class="md:hidden space-y-3">
        <div v-for="s in suppliers" :key="s.id" class="mobile-card">
          <p class="font-semibold text-slate-800">{{ s.name }}</p>
          <div class="grid grid-cols-1 gap-1 text-xs text-slate-500 mt-2">
            <span>👤 {{ s.contact }}</span>
            <span>📞 {{ s.phone }}</span>
            <span>🧵 {{ s.materials }}</span>
            <span>📅 Last order: {{ s.lastOrder }}</span>
          </div>
          <div class="flex gap-2 pt-2 mt-2 border-t border-slate-100">
            <button @click="editSupplier(s)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
            <button @click="deleteSupplierItem(s)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── MATERIAL MODAL ─── -->
    <div v-if="showMaterialModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">{{ materialMode==='view'?'Material Details':materialMode==='edit'?'Edit Material':'Add Material' }}</h3>
          <button @click="closeModals" class="modal-close">✕</button>
        </div>
        <div v-if="materialMode==='view'" class="p-6 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="info-block col-span-2"><p class="info-label">Material Name</p><p class="info-val text-lg">{{ selectedItem?.name }}</p></div>
            <div class="info-block"><p class="info-label">Category</p><p class="info-val">{{ selectedItem?.category }}</p></div>
            <div class="info-block"><p class="info-label">Current Stock</p><p class="info-val" :class="selectedItem?.stock<=selectedItem?.reorder?'text-red-600':''">{{ selectedItem?.stock }} {{ selectedItem?.unit }}</p></div>
            <div class="info-block"><p class="info-label">Reorder Level</p><p class="info-val">{{ selectedItem?.reorder }} {{ selectedItem?.unit }}</p></div>
            <div class="info-block"><p class="info-label">Supplier</p><p class="info-val">{{ selectedItem?.supplier }}</p></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button @click="editMaterial(selectedItem)" class="btn-outline">Edit</button>
            <button @click="closeModals" class="btn-teal">Close</button>
          </div>
        </div>
        <form v-else @submit.prevent="saveMaterial" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group col-span-2"><label>Material Name *</label><input v-model="matForm.name" type="text" class="form-input" required /></div>
            <div class="form-group"><label>Category *</label>
              <select v-model="matForm.category" class="form-input" required>
                <option>Fabric</option><option>Thread</option><option>Accessories</option><option>Lining</option><option>Other</option>
              </select>
            </div>
            <div class="form-group"><label>Unit</label>
              <select v-model="matForm.unit" class="form-input">
                <option>meters</option><option>rolls</option><option>pcs</option><option>bags</option><option>yards</option>
              </select>
            </div>
            <div class="form-group"><label>Current Stock *</label><input v-model.number="matForm.stock" type="number" min="0" class="form-input" required /></div>
            <div class="form-group"><label>Reorder Level</label><input v-model.number="matForm.reorder" type="number" min="0" class="form-input" /></div>
            <div class="form-group col-span-2"><label>Supplier</label>
              <select v-model="matForm.supplier" class="form-input">
                <option v-for="s in suppliers" :key="s.id" :value="s.name">{{ s.name }}</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModals" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-teal">{{ materialMode==='edit'?'Update':'Add Material' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ─── SUPPLIER MODAL ─── -->
    <div v-if="showSupplierModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">{{ supplierMode==='edit'?'Edit Supplier':'Add Supplier' }}</h3>
          <button @click="closeModals" class="modal-close">✕</button>
        </div>
        <form @submit.prevent="saveSupplier" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group col-span-2"><label>Supplier Name *</label><input v-model="supForm.name" type="text" class="form-input" required /></div>
            <div class="form-group"><label>Contact Person</label><input v-model="supForm.contact" type="text" class="form-input" /></div>
            <div class="form-group"><label>Phone</label><input v-model="supForm.phone" type="text" class="form-input" /></div>
            <div class="form-group col-span-2"><label>Materials Supplied</label><input v-model="supForm.materials" type="text" class="form-input" placeholder="e.g. Cotton, Polyester" /></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModals" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-teal">{{ supplierMode==='edit'?'Update':'Add Supplier' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box max-w-sm">
        <div class="p-6 text-center">
          <div class="size-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><span class="text-2xl">🗑️</span></div>
          <h3 class="text-lg font-bold text-slate-800">Confirm Delete</h3>
          <p class="text-sm text-slate-500 mt-2">Delete <strong>{{ deleteTarget?.name }}</strong>? This cannot be undone.</p>
          <div class="flex justify-center gap-3 mt-5">
            <button @click="closeModals" class="btn-outline">Cancel</button>
            <button @click="confirmDelete" class="btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const showMaterialModal = ref(false)
const showSupplierModal = ref(false)
const showDeleteConfirm = ref(false)
const materialMode = ref<'add'|'edit'|'view'>('add')
const supplierMode = ref<'add'|'edit'>('add')
const selectedItem = ref<any>(null)
const selectedSupplier = ref<any>(null)
const deleteTarget = ref<any>(null)
const deleteType = ref<'material'|'supplier'>('material')

const inventory = reactive([
  { id:1, name:'White Cotton Fabric', category:'Fabric', stock:48, unit:'meters', reorder:20, supplier:'Fab-Tech Textiles' },
  { id:2, name:'Black Polyester', category:'Fabric', stock:10, unit:'meters', reorder:15, supplier:'Manila Fabrics Co.' },
  { id:3, name:'Blue Denim', category:'Fabric', stock:0, unit:'meters', reorder:10, supplier:'Fab-Tech Textiles' },
  { id:4, name:'White Thread (100m)', category:'Thread', stock:25, unit:'rolls', reorder:10, supplier:'Sewing Essentials' },
  { id:5, name:'Black Thread (100m)', category:'Thread', stock:8, unit:'rolls', reorder:10, supplier:'Sewing Essentials' },
  { id:6, name:'Metal Zipper 20cm', category:'Accessories', stock:60, unit:'pcs', reorder:30, supplier:'Trimcraft Supply' },
  { id:7, name:'Uniform Buttons', category:'Accessories', stock:3, unit:'bags', reorder:5, supplier:'Trimcraft Supply' },
  { id:8, name:'Lining Fabric', category:'Fabric', stock:30, unit:'meters', reorder:12, supplier:'Manila Fabrics Co.' },
])

const suppliers = reactive([
  { id:1, name:'Fab-Tech Textiles', contact:'Ricardo Lim', phone:'02-8123-4567', materials:'Cotton, Polyester, Denim', lastOrder:'Mar 5, 2026' },
  { id:2, name:'Manila Fabrics Co.', contact:'Grace Tan', phone:'02-8234-5678', materials:'Lining, Polyester', lastOrder:'Feb 28, 2026' },
  { id:3, name:'Sewing Essentials', contact:'Noel Santos', phone:'09171234567', materials:'Threads, Needles', lastOrder:'Mar 10, 2026' },
  { id:4, name:'Trimcraft Supply', contact:'Helen Dy', phone:'09281234567', materials:'Zippers, Buttons, Elastic', lastOrder:'Mar 1, 2026' },
])

const matForm = reactive({ name:'', category:'Fabric', stock:0, unit:'meters', reorder:5, supplier:'' })
const supForm = reactive({ name:'', contact:'', phone:'', materials:'' })
let nextMat = 9, nextSup = 5

const openAddMaterial = () => { Object.assign(matForm,{name:'',category:'Fabric',stock:0,unit:'meters',reorder:5,supplier:''}); materialMode.value='add'; showMaterialModal.value=true }
const viewMaterial = (i:any) => { selectedItem.value={...i}; materialMode.value='view'; showMaterialModal.value=true }
const editMaterial = (i:any) => { selectedItem.value=i; Object.assign(matForm,{...i}); materialMode.value='edit'; showMaterialModal.value=true }
const deleteMaterial = (i:any) => { deleteTarget.value=i; deleteType.value='material'; showDeleteConfirm.value=true }
const saveMaterial = () => {
  if(materialMode.value==='add') { inventory.push({id:nextMat++,...JSON.parse(JSON.stringify(matForm))}) }
  else { const idx=inventory.findIndex(x=>x.id===selectedItem.value?.id); if(idx!==-1) Object.assign(inventory[idx],{...matForm}) }
  closeModals()
}

const openAddSupplier = () => { Object.assign(supForm,{name:'',contact:'',phone:'',materials:''}); supplierMode.value='add'; showSupplierModal.value=true }
const editSupplier = (s:any) => { selectedSupplier.value=s; Object.assign(supForm,{...s}); supplierMode.value='edit'; showSupplierModal.value=true }
const deleteSupplierItem = (s:any) => { deleteTarget.value=s; deleteType.value='supplier'; showDeleteConfirm.value=true }
const saveSupplier = () => {
  const today=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
  if(supplierMode.value==='add') { suppliers.push({id:nextSup++,...JSON.parse(JSON.stringify(supForm)),lastOrder:today}) }
  else { const idx=suppliers.findIndex(x=>x.id===selectedSupplier.value?.id); if(idx!==-1) Object.assign(suppliers[idx],{...supForm}) }
  closeModals()
}

const confirmDelete = () => {
  if(deleteType.value==='material') { const i=inventory.findIndex(x=>x.id===deleteTarget.value?.id); if(i!==-1) inventory.splice(i,1) }
  else { const i=suppliers.findIndex(x=>x.id===deleteTarget.value?.id); if(i!==-1) suppliers.splice(i,1) }
  closeModals()
}
const closeModals = () => { showMaterialModal.value=false; showSupplierModal.value=false; showDeleteConfirm.value=false }
</script>

<style scoped>
.card{background:white;border-radius:1rem;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);}
.mini-card{background:white;border-radius:0.875rem;padding:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);text-align:center;}
.mini-value{font-size:1.75rem;font-weight:800;}
.mini-label{font-size:0.75rem;color:#94A3B8;margin-top:2px;}
.section-title{font-size:1rem;font-weight:700;color:#0F172A;}
.th{text-align:left;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94A3B8;padding:0.6rem 0.875rem;background:#F8FAFC;}
.td{padding:0.9rem 0.875rem;}
.tr-hover:hover td{background:#FAFBFC;}
.badge-green{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#F0FDF4;color:#16A34A;}
.badge-yellow{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#FFFBEB;color:#D97706;}
.badge-red{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#FEF2F2;color:#DC2626;}
.action-btn{font-size:0.75rem;font-weight:600;padding:0.25rem 0.6rem;border-radius:0.5rem;border:none;cursor:pointer;transition:all 0.15s;background:transparent;}
.btn-teal{background:linear-gradient(135deg,#009E97,#007A75);color:#fff;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;transition:all 0.15s;}
.btn-teal:hover{box-shadow:0 4px 12px rgba(0,158,151,0.35);transform:translateY(-1px);}
.btn-outline{background:white;color:#64748B;font-weight:600;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:1px solid #E2E8F0;cursor:pointer;}
.btn-outline-sm{background:white;color:#64748B;font-weight:600;font-size:0.8rem;padding:0.4rem 0.9rem;border-radius:0.5rem;border:1px solid #E2E8F0;cursor:pointer;}
.btn-danger{background:#DC2626;color:white;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;}
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem;}
.modal-box{background:white;border-radius:1.25rem;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,0.2);}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid #F1F5F9;}
.modal-title{font-size:1.1rem;font-weight:800;color:#0F172A;}
.modal-close{background:none;border:none;font-size:1.1rem;color:#94A3B8;cursor:pointer;padding:0.25rem 0.5rem;border-radius:0.5rem;}
.modal-close:hover{background:#F1F5F9;}
.info-block{background:#F8FAFC;border-radius:0.625rem;padding:0.75rem;}
.info-label{font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#94A3B8;margin-bottom:0.25rem;}
.info-val{font-size:0.875rem;font-weight:600;color:#0F172A;}
.form-group label{display:block;font-size:0.8rem;font-weight:600;color:#64748B;margin-bottom:0.375rem;}
.form-input{width:100%;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:0.625rem;padding:0.6rem 0.875rem;font-size:0.875rem;color:#0F172A;outline:none;}
.form-input:focus{border-color:#009E97;box-shadow:0 0 0 3px rgba(0,158,151,0.12);}
.mobile-card{background:#F8FAFC;border-radius:0.75rem;padding:0.875rem;border:1px solid #E2E8F0;}
</style>
