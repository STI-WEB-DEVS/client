<template>
  <NuxtLayout>
    <div class="inventory-page">

      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Blood Inventory</h1>
          <p class="page-sub">Real-time stock tracking and management</p>
        </div>
        <button class="btn-primary">+ Add Stock Entry</button>
      </div>

      <!-- Summary Cards -->
      <div class="summary-grid">
        <div v-for="s in summary" :key="s.label" class="sum-card" :class="s.class">
          <p class="sum-label">{{ s.label }}</p>
          <p class="sum-val">{{ s.value }}</p>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Blood Type Inventory</h2>
          <div class="filter-tabs">
            <button v-for="t in tabs" :key="t" :class="['tab', activeTab === t && 'tab--active']" @click="activeTab = t">{{ t }}</button>
          </div>
        </div>
        <div class="table-wrap">
          <table class="inv-table">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Units Available</th>
                <th>Min. Required</th>
                <th>Expiring Soon</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredInventory" :key="row.type">
                <td>
                  <div class="blood-pill" :style="{ background: row.color }">{{ row.type }}</div>
                </td>
                <td class="units-cell">
                  <span class="units-num">{{ row.units }}</span>
                  <div class="units-bar">
                    <div class="units-fill" :style="{ width: Math.min(100, (row.units / row.max * 100)) + '%', background: row.color }"></div>
                  </div>
                </td>
                <td>{{ row.min }}</td>
                <td :class="row.expiring > 0 ? 'expiring-warn' : ''">{{ row.expiring > 0 ? row.expiring + ' units' : '—' }}</td>
                <td class="date-cell">{{ row.lastUpdated }}</td>
                <td>
                  <span class="status-chip" :class="'status-' + row.statusKey">{{ row.status }}</span>
                </td>
                <td>
                  <div class="actions">
                    <button class="act-btn">Edit</button>
                    <button class="act-btn act-dispatch">Dispatch</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const tabs = ['All', 'Critical', 'Low', 'Adequate']
const activeTab = ref('All')

const inventory = [
  { type: 'A+',  units: 42, min: 10, max: 50, expiring: 3, lastUpdated: 'Today 8:00 AM', status: 'Adequate', statusKey: 'adequate', color: '#e74c3c' },
  { type: 'A-',  units: 8,  min: 10, max: 30, expiring: 0, lastUpdated: 'Today 8:00 AM', status: 'Low',      statusKey: 'low',      color: '#f39c12' },
  { type: 'B+',  units: 28, min: 10, max: 50, expiring: 1, lastUpdated: 'Today 8:00 AM', status: 'Adequate', statusKey: 'adequate', color: '#c0392b' },
  { type: 'B-',  units: 3,  min: 10, max: 30, expiring: 0, lastUpdated: 'Today 8:00 AM', status: 'Critical', statusKey: 'critical', color: '#e74c3c' },
  { type: 'O+',  units: 12, min: 15, max: 50, expiring: 0, lastUpdated: 'Today 9:00 AM', status: 'Low',      statusKey: 'low',      color: '#f39c12' },
  { type: 'O-',  units: 5,  min: 10, max: 30, expiring: 0, lastUpdated: 'Today 9:00 AM', status: 'Critical', statusKey: 'critical', color: '#e74c3c' },
  { type: 'AB+', units: 35, min: 10, max: 50, expiring: 2, lastUpdated: 'Today 7:30 AM', status: 'Adequate', statusKey: 'adequate', color: '#922b21' },
  { type: 'AB-', units: 18, min: 8,  max: 30, expiring: 0, lastUpdated: 'Today 7:30 AM', status: 'Adequate', statusKey: 'adequate', color: '#7b241c' },
]

const filteredInventory = computed(() => {
  if (activeTab.value === 'All') return inventory
  return inventory.filter(i => i.status === activeTab.value)
})

const summary = [
  { label: 'Total Units',      value: inventory.reduce((s, i) => s + i.units, 0),               class: '' },
  { label: 'Critical Types',   value: inventory.filter(i => i.statusKey === 'critical').length,  class: 'sum-critical' },
  { label: 'Low Stock',        value: inventory.filter(i => i.statusKey === 'low').length,        class: 'sum-low' },
  { label: 'Expiring (7 days)',value: inventory.reduce((s, i) => s + i.expiring, 0),              class: 'sum-warn' },
]
</script>

<style scoped>
/* Layout */
.inventory-page { max-width: 1200px; }

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.page-sub {
  font-size: 0.82rem;
  color: #999;
  margin-top: 4px;
}

.btn-primary {
  padding: 0.65rem 1.25rem;
  background: linear-gradient(135deg, #c0392b, #e74c3c);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(192,57,43,0.25);
  transition: all 0.2s;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(192,57,43,0.35); }

/* Summary Cards */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sum-card {
  background: white;
  border: 1px solid #f5e8e8;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 1px 4px rgba(192,57,43,0.04);
}

.sum-label {
  font-size: 0.72rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 4px;
}

.sum-val {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.sum-critical { border-color: #fecaca; }
.sum-critical .sum-val { color: #c0392b; }
.sum-low      .sum-val { color: #f39c12; }
.sum-warn     .sum-val { color: #d97706; }

/* Table Card */
.card {
  background: white;
  border: 1px solid #f5e8e8;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(192,57,43,0.04);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f5e8e8;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

/* Filter Tabs */
.filter-tabs { display: flex; gap: 4px; }

.tab {
  padding: 5px 14px;
  background: none;
  border: 1px solid #f5e8e8;
  border-radius: 20px;
  font-size: 0.78rem;
  color: #999;
  cursor: pointer;
  transition: all 0.15s;
}
.tab:hover        { background: #fef2f2; border-color: #fecaca; color: #c0392b; }
.tab--active      { background: #fef2f2; border-color: #fecaca; color: #c0392b; font-weight: 600; }

/* Table */
.table-wrap { overflow-x: auto; }

.inv-table { width: 100%; border-collapse: collapse; }

.inv-table th {
  padding: 0.75rem 1.25rem;
  text-align: left;
  font-size: 0.7rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: #faf9f9;
  border-bottom: 1px solid #f5e8e8;
  font-weight: 600;
}

.inv-table td {
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid #faf5f5;
  font-size: 0.85rem;
  color: #444;
}

.inv-table tr:last-child td { border-bottom: none; }
.inv-table tr:hover td      { background: #fff9f9; }

/* Blood Type Pill */
.blood-pill {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  color: white;
  font-weight: 800;
  font-size: 0.9rem;
}

/* Units Cell */
.units-cell  { min-width: 130px; }
.units-num   { display: block; font-weight: 700; color: #1a1a1a; font-size: 0.9rem; margin-bottom: 5px; }
.units-bar   { height: 5px; background: #f5e8e8; border-radius: 10px; overflow: hidden; }
.units-fill  { height: 100%; border-radius: 10px; transition: width 0.6s ease; }

/* Table Cell Variants */
.expiring-warn { color: #d97706; font-weight: 600; }
.date-cell     { color: #bbb; font-size: 0.78rem; }

/* Status Chip */
.status-chip {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.status-adequate { background: #f0fdf4; color: #16a34a; }
.status-low      { background: #fffbeb; color: #d97706; }
.status-critical { background: #fef2f2; color: #c0392b; }

/* Action Buttons */
.actions { display: flex; gap: 6px; }

.act-btn {
  padding: 4px 12px;
  border: 1px solid #f5e8e8;
  border-radius: 7px;
  background: none;
  font-size: 0.75rem;
  color: #666;
  cursor: pointer;
  transition: all 0.15s;
}
.act-btn:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #c0392b;
}

.act-dispatch {
  background: #c0392b;
  color: white;
  border-color: #c0392b;
}
.act-dispatch:hover {
  background: #e74c3c;
  border-color: #e74c3c;
  color: white;
}
</style>