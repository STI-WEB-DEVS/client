<template>
  <NuxtLayout>
    <div class="inventory-page">

      <!-- ── Page Header ── -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-eyebrow">
            <span class="eyebrow-pip"></span>
            <span class="eyebrow-label">Blood Donation System</span>
          </div>
          <h1 class="page-title">Blood Inventory</h1>
          <p class="page-sub">Real-time stock tracking and management</p>
        </div>
        <div class="header-right">
          <button class="btn-export">
            <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;flex-shrink:0;">
              <path d="M10 3v10M6 9l4 4 4-4M4 15h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Export
          </button>
          <button class="btn-primary">
            <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;flex-shrink:0;">
              <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            Add Stock Entry
          </button>
        </div>
      </div>

      <!-- ── Summary Cards ── -->
      <div class="summary-grid">
        <div v-for="(s, i) in summary" :key="s.label" class="sum-card" :class="s.class" :style="{ animationDelay: `${i * 0.08}s` }">
          <div class="sum-icon-wrap" v-html="s.iconSvg"></div>
          <div class="sum-body">
            <p class="sum-val">{{ s.value }}</p>
            <p class="sum-label">{{ s.label }}</p>
          </div>
          <div class="sum-glow" :style="{ background: s.glow }"></div>
        </div>
      </div>

      <!-- ── Inventory Table Card ── -->
      <div class="table-card">

        <div class="table-card-header">
          <div class="table-title-group">
            <svg viewBox="0 0 24 30" fill="none" style="width:16px;height:20px;opacity:0.5;">
              <path d="M12 1C12 1 2 10 2 17C2 23 6.5 29 12 29C17.5 29 22 23 22 17C22 10 12 1 12 1Z" fill="#dc2626"/>
            </svg>
            <h2 class="table-title">Blood Type Inventory</h2>
          </div>
          <div class="filter-tabs">
            <button
              v-for="t in tabs"
              :key="t"
              class="tab"
              :class="activeTab === t ? 'tab--active' : ''"
              @click="activeTab = t"
            >{{ t }}</button>
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
              <tr
                v-for="(row, i) in filteredInventory"
                :key="row.type"
                class="inv-row"
                :style="{ animationDelay: `${i * 0.05}s` }"
              >
                <td>
                  <div class="blood-pill">
                    <div class="blood-pill-dot" :style="{ background: row.solidColor }"></div>
                    <span class="blood-pill-text">{{ row.type }}</span>
                  </div>
                </td>

                <td class="units-cell">
                  <span class="units-num">{{ row.units }}</span>
                  <div class="units-bar-track">
                    <div
                      class="units-bar-fill"
                      :style="{
                        width: Math.min(100, Math.round(row.units / row.max * 100)) + '%',
                        background: row.barColor
                      }"
                    ></div>
                  </div>
                  <span class="units-pct">{{ Math.min(100, Math.round(row.units / row.max * 100)) }}%</span>
                </td>

                <td class="mid-cell">{{ row.min }}</td>

                <td>
                  <span v-if="row.expiring > 0" class="expiring-badge">
                    <svg viewBox="0 0 20 20" fill="none" style="width:11px;height:11px;flex-shrink:0;">
                      <path d="M10 6v4l2.5 2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                      <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    {{ row.expiring }} units
                  </span>
                  <span v-else class="no-expiring">—</span>
                </td>

                <td class="date-cell">{{ row.lastUpdated }}</td>

                <td>
                  <span class="status-chip" :class="'status-' + row.statusKey">
                    <span class="status-dot"></span>
                    {{ row.status }}
                  </span>
                </td>

                <td>
                  <div class="actions">
                    <button class="act-edit">
                      <svg viewBox="0 0 20 20" fill="none" style="width:12px;height:12px;">
                        <path d="M13.5 3.5l3 3L7 16H4v-3L13.5 3.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Edit
                    </button>
                    <button class="act-dispatch">
                      <svg viewBox="0 0 20 20" fill="none" style="width:12px;height:12px;">
                        <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Dispatch
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span class="table-count">Showing {{ filteredInventory.length }} of {{ inventory.length }} blood types</span>
          <span class="table-updated">Last synced: Today 9:15 AM</span>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tabs = ['All', 'Critical', 'Low', 'Adequate']
const activeTab = ref('All')

const inventory = [
  { type: 'A+',  units: 42, min: 10, max: 50, expiring: 3, lastUpdated: 'Today 8:00 AM', status: 'Adequate', statusKey: 'adequate', solidColor: '#ef4444', barColor: 'linear-gradient(90deg,#22c55e,#16a34a)' },
  { type: 'A-',  units: 8,  min: 10, max: 30, expiring: 0, lastUpdated: 'Today 8:00 AM', status: 'Low',      statusKey: 'low',      solidColor: '#f59e0b', barColor: 'linear-gradient(90deg,#f59e0b,#d97706)' },
  { type: 'B+',  units: 28, min: 10, max: 50, expiring: 1, lastUpdated: 'Today 8:00 AM', status: 'Adequate', statusKey: 'adequate', solidColor: '#dc2626', barColor: 'linear-gradient(90deg,#22c55e,#16a34a)' },
  { type: 'B-',  units: 3,  min: 10, max: 30, expiring: 0, lastUpdated: 'Today 8:00 AM', status: 'Critical', statusKey: 'critical', solidColor: '#ef4444', barColor: 'linear-gradient(90deg,#ef4444,#dc2626)' },
  { type: 'O+',  units: 12, min: 15, max: 50, expiring: 0, lastUpdated: 'Today 9:00 AM', status: 'Low',      statusKey: 'low',      solidColor: '#f59e0b', barColor: 'linear-gradient(90deg,#f59e0b,#d97706)' },
  { type: 'O-',  units: 5,  min: 10, max: 30, expiring: 0, lastUpdated: 'Today 9:00 AM', status: 'Critical', statusKey: 'critical', solidColor: '#ef4444', barColor: 'linear-gradient(90deg,#ef4444,#dc2626)' },
  { type: 'AB+', units: 35, min: 10, max: 50, expiring: 2, lastUpdated: 'Today 7:30 AM', status: 'Adequate', statusKey: 'adequate', solidColor: '#b91c1c', barColor: 'linear-gradient(90deg,#22c55e,#16a34a)' },
  { type: 'AB-', units: 18, min: 8,  max: 30, expiring: 0, lastUpdated: 'Today 7:30 AM', status: 'Adequate', statusKey: 'adequate', solidColor: '#991b1b', barColor: 'linear-gradient(90deg,#22c55e,#16a34a)' },
]

const filteredInventory = computed(() => {
  if (activeTab.value === 'All') return inventory
  return inventory.filter(i => i.status === activeTab.value)
})

const summary = [
  {
    label: 'Total Units',
    value: inventory.reduce((s, i) => s + i.units, 0),
    class: 'sum-total',
    glow: 'rgba(220,38,38,0.2)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 4 9 4 14.5C4 18.6 7.6 22 12 22C16.4 22 20 18.6 20 14.5C20 9 12 2 12 2Z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`,
  },
  {
    label: 'Critical Types',
    value: inventory.filter(i => i.statusKey === 'critical').length,
    class: 'sum-critical',
    glow: 'rgba(239,68,68,0.22)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v4M12 17h.01M10.3 4l-7.4 13A2 2 0 004.6 20h14.8a2 2 0 001.7-3L13.7 4a2 2 0 00-3.4 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  },
  {
    label: 'Low Stock',
    value: inventory.filter(i => i.statusKey === 'low').length,
    class: 'sum-low',
    glow: 'rgba(245,158,11,0.2)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;" xmlns="http://www.w3.org/2000/svg"><path d="M3 17l6-6 4 4 8-8M20 17H4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    label: 'Expiring (7 days)',
    value: inventory.reduce((s, i) => s + i.expiring, 0),
    class: 'sum-warn',
    glow: 'rgba(217,119,6,0.2)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

.inventory-page {
  max-width: 1280px;
  font-family: 'DM Sans', sans-serif;
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.header-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.eyebrow-pip {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 8px rgba(220,38,38,0.8);
}

.eyebrow-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.28);
  font-weight: 600;
}

.page-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.page-sub {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.32);
  margin: 0.35rem 0 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-export {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.83rem;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.15s;
}
.btn-export:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.8);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.3rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  border: none;
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(220,38,38,0.4), 0 1px 0 rgba(255,255,255,0.1) inset;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(220,38,38,0.55);
}

/* ── Summary Cards ── */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.sum-card {
  position: relative;
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}
.sum-card:hover {
  transform: translateY(-3px);
  border-color: rgba(220,38,38,0.3);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.sum-icon-wrap {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(255,255,255,0.4);
}

.sum-total    .sum-icon-wrap { border-color: rgba(220,38,38,0.25);  color: #fca5a5; background: rgba(220,38,38,0.08);  }
.sum-critical .sum-icon-wrap { border-color: rgba(239,68,68,0.25);  color: #fca5a5; background: rgba(239,68,68,0.08);  }
.sum-low      .sum-icon-wrap { border-color: rgba(245,158,11,0.25); color: #fcd34d; background: rgba(245,158,11,0.08); }
.sum-warn     .sum-icon-wrap { border-color: rgba(217,119,6,0.25);  color: #fbbf24; background: rgba(217,119,6,0.08);  }

.sum-body { flex: 1; min-width: 0; }

.sum-val {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1;
}
.sum-critical .sum-val { color: #fca5a5; }
.sum-low      .sum-val { color: #fcd34d; }
.sum-warn     .sum-val { color: #fbbf24; }

.sum-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: rgba(255,255,255,0.3);
  margin: 5px 0 0;
  font-weight: 600;
}

.sum-glow {
  position: absolute;
  right: -20px; bottom: -20px;
  width: 80px; height: 80px;
  border-radius: 50%;
  filter: blur(28px);
  pointer-events: none;
}

/* ── Table Card ── */
.table-card {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.35);
}

.table-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.table-title-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.table-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin: 0;
}

.filter-tabs { display: flex; gap: 4px; }

.tab {
  padding: 0.3rem 0.9rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.15s;
}
.tab:hover {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.25);
  color: rgba(255,255,255,0.75);
}
.tab--active {
  background: rgba(220,38,38,0.15);
  border-color: rgba(220,38,38,0.4);
  color: #fca5a5;
  font-weight: 600;
}

.table-wrap { overflow-x: auto; }

.inv-table {
  width: 100%;
  border-collapse: collapse;
}

.inv-table thead tr {
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.inv-table th {
  padding: 0.85rem 1.25rem;
  text-align: left;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.25);
  font-weight: 700;
  background: rgba(0,0,0,0.2);
  white-space: nowrap;
}

.inv-row {
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.15s;
  animation: rowIn 0.35s cubic-bezier(.22,1,.36,1) both;
}
.inv-row:last-child { border-bottom: none; }
.inv-row:hover { background: rgba(220,38,38,0.04); }

.inv-table td {
  padding: 0.95rem 1.25rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  vertical-align: middle;
}

.blood-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.75rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
}

.blood-pill-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.blood-pill-text {
  font-weight: 800;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.85);
  letter-spacing: 0.03em;
}

.units-cell { min-width: 150px; }

.units-num {
  display: block;
  font-weight: 700;
  font-size: 0.92rem;
  color: rgba(255,255,255,0.85);
  margin-bottom: 5px;
}

.units-bar-track {
  height: 4px;
  background: rgba(255,255,255,0.07);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 3px;
}

.units-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.7s cubic-bezier(.22,1,.36,1);
}

.units-pct {
  font-size: 0.6rem;
  color: rgba(255,255,255,0.22);
}

.mid-cell {
  color: rgba(255,255,255,0.45);
}

.expiring-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.6rem;
  background: rgba(217,119,6,0.12);
  border: 1px solid rgba(217,119,6,0.3);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fbbf24;
}

.no-expiring {
  color: rgba(255,255,255,0.18);
}

.date-cell {
  color: rgba(255,255,255,0.25) !important;
  font-size: 0.78rem !important;
  white-space: nowrap;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.status-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.status-adequate { background: rgba(22,163,74,0.12);  border: 1px solid rgba(22,163,74,0.28);  color: #4ade80; }
.status-low      { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.28); color: #fcd34d; }
.status-critical { background: rgba(220,38,38,0.12);  border: 1px solid rgba(220,38,38,0.35);  color: #fca5a5; }

.actions { display: flex; gap: 6px; }

.act-edit {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.75rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.74rem;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.act-edit:hover {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.3);
  color: #fca5a5;
}

.act-dispatch {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.75rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border: none;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(220,38,38,0.3);
  transition: all 0.15s;
  white-space: nowrap;
}
.act-dispatch:hover {
  box-shadow: 0 4px 14px rgba(220,38,38,0.5);
  transform: translateY(-1px);
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  background: rgba(0,0,0,0.15);
}

.table-count  { font-size: 0.72rem; color: rgba(255,255,255,0.28); }
.table-updated { font-size: 0.72rem; color: rgba(255,255,255,0.2); }

@keyframes cardIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes rowIn {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>