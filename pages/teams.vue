<template>
  <div>
    <!-- Header banner -->
    <div class="nm-team-banner mb-6">
      <div>
        <h2 class="font-display text-white text-xl font-bold leading-tight">NutriMatch Development Team</h2>
        <p class="text-teal-400/65 text-sm mt-0.5">
          STI College of Davao · BSIT 602 · Capstone Project 2025
        </p>
      </div>
      <div class="px-3 py-1.5 rounded-lg text-xs font-semibold" style="background:rgba(217,119,6,.18); color:#fbbf24">
        AY 2024–2025
      </div>
    </div>

    <!-- Member cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
      <div
        v-for="member in TEAM_MEMBERS"
        :key="member.id"
        class="nm-card nm-member-card"
      >
        <!-- Accent bar -->
        <div class="h-1.5 rounded-t-xl" :style="{ background: member.color }"/>

        <div class="p-6">
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <div
              class="nm-avatar flex-shrink-0 w-16 h-16 text-xl"
              :style="{ background: `linear-gradient(135deg, ${member.color}, ${member.color}99)` }"
            >
              {{ member.initials }}
            </div>

            <!-- Name + role -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="font-display text-[1.1rem] font-bold leading-tight" style="color:#1a2e2e">{{ member.name }}</p>
                  <p class="text-xs font-semibold mt-0.5" :style="{ color: member.color }">{{ member.role }}</p>
                </div>
                <span class="nm-badge badge-active flex-shrink-0 mt-0.5">Active</span>
              </div>

              <div class="flex items-center gap-1.5 mt-2">
                <AcademicCapIcon class="w-3.5 h-3.5 flex-shrink-0" style="color:var(--muted)"/>
                <span class="text-xs" style="color:var(--muted)">STI College of Davao · {{ member.section }}</span>
              </div>
              <div class="flex items-center gap-1.5 mt-1">
                <EnvelopeIcon class="w-3.5 h-3.5 flex-shrink-0" style="color:var(--muted)"/>
                <span class="text-xs truncate" style="color:var(--muted)">{{ member.email }}</span>
              </div>
            </div>
          </div>

          <div class="my-4" style="border-top:1px solid var(--border)"/>

          <!-- Responsibilities -->
          <div class="mb-4">
            <p class="text-[.68rem] font-bold uppercase tracking-widest mb-2" style="color:var(--muted)">Responsibilities</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="resp in member.responsibilities"
                :key="resp"
                class="text-[.68rem] font-semibold px-2.5 py-1 rounded-lg"
                style="background:var(--teal-50); color:var(--teal-700); border:1px solid var(--teal-100)"
              >{{ resp }}</span>
            </div>
          </div>

          <!-- Tech stack -->
          <div class="mb-4">
            <p class="text-[.68rem] font-bold uppercase tracking-widest mb-2" style="color:var(--muted)">Tech Stack</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in member.techStack"
                :key="tech"
                class="text-[.68rem] font-semibold px-2.5 py-1 rounded-lg"
                style="background:var(--cream); color:var(--muted); border:1px solid var(--border)"
              >{{ tech }}</span>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="nm-mstat">
              <p class="nm-mstat-v">{{ member.contributions }}</p>
              <p class="nm-mstat-l">Commits</p>
            </div>
            <div class="nm-mstat">
              <p class="nm-mstat-v">{{ member.modules }}</p>
              <p class="nm-mstat-l">Modules</p>
            </div>
            <div class="nm-mstat">
              <p class="nm-mstat-v text-[.75rem]">{{ member.section }}</p>
              <p class="nm-mstat-l">Section</p>
            </div>
          </div>

          <!-- Footer row -->
          <div class="flex items-center justify-between pt-3 border-t" style="border-color:var(--border)">
            <div class="flex items-center gap-1.5">
              <IdentificationIcon class="w-3.5 h-3.5" style="color:var(--muted)"/>
              <span class="text-xs font-mono font-bold" style="color:var(--muted)">{{ member.studentId }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <PhoneIcon class="w-3.5 h-3.5" style="color:var(--muted)"/>
              <span class="text-xs" style="color:var(--muted)">{{ member.contact }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project info card -->
    <div class="nm-card p-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p class="nm-sec-title mb-1">Capstone Project Details</p>
          <p class="text-sm" style="color:var(--muted)">
            NutriMatch: Web-Based Clinical Nutrition Consultation and Outcome Monitoring System for Structured Medical Nutrition Therapy
          </p>
        </div>
        <span class="nm-badge badge-verified text-xs px-3 py-1.5 flex-shrink-0">
          <CheckBadgeIcon class="w-3.5 h-3.5"/> Thesis Project
        </span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t" style="border-color:var(--border)">
        <div v-for="info in projectInfo" :key="info.label" class="nm-mstat">
          <p class="nm-mstat-v text-sm">{{ info.value }}</p>
          <p class="nm-mstat-l">{{ info.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AcademicCapIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline'
import { TEAM_MEMBERS } from '~/data/TeamService'

definePageMeta({ layout: 'admin' })

const projectInfo = [
  { label: 'School',      value: 'STI Davao' },
  { label: 'Program',     value: 'BSIT' },
  { label: 'Section',     value: 'BSIT 602' },
  { label: 'School Year', value: '2024–2025' },
]
</script>

<style scoped>
.nm-team-banner {
  background: linear-gradient(115deg, #083534 0%, #0d6b6b 100%);
  border-radius: 14px;
  padding: 1.4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nm-member-card { overflow: hidden; }

.nm-mstat {
  background: var(--cream);
  border-radius: 8px;
  padding: .6rem .5rem;
  text-align: center;
}
.nm-mstat-v {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}
.nm-mstat-l {
  font-size: .58rem;
  color: var(--muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-top: .1rem;
}

.nm-sec-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text);
}
</style>
