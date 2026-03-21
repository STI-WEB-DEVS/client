# NutriMatch — Nuxt Admin UI

> **Web Systems and Tech (602) — Technical Task: Nuxt Admin UI Implementation**
> Thesis Title: NutriMatch: Web-Based Clinical Nutrition Consultation and Outcome Monitoring System

---

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Then open: **http://localhost:3000**

---

## 🔐 Authentication Flow

- Visit `/login` → enter **any email + password** to sign in (mock auth)
- The **Sign Out** button in the sidebar redirects back to `/login`
- All routes are protected by the `auth` middleware

---

## 📁 Project Structure

```
nutrimatch/
├── api/
│   └── TeamService.ts        ← Mocked team service (as required)
├── assets/css/
│   └── main.css              ← Global Tailwind styles
├── composables/
│   └── useAuth.ts            ← Auth state & login/logout logic
├── layouts/
│   └── default.vue           ← Sidebar layout (used by all pages)
├── middleware/
│   └── auth.ts               ← Route guard: redirects to /login if not auth'd
├── pages/
│   ├── index.vue             ← Redirects to /dashboard
│   ├── login.vue             ← Login page (layout: false)
│   ├── dashboard/index.vue   ← Admin overview with KPIs & charts
│   ├── patients/index.vue    ← Patient records table
│   ├── therapists/index.vue  ← Team page (uses TeamService.ts)
│   ├── schedule/index.vue    ← Consultation calendar
│   ├── reports/index.vue     ← Analytics & reports
│   ├── settings/index.vue    ← System Settings page
│   └── profile/index.vue     ← User Profile page
├── nuxt.config.ts
├── tailwind.config.js
└── package.json
```

---

## ✅ Requirements Checklist

| Requirement | Status |
|---|---|
| Customized Admin View (NutriMatch branding, green palette) | ✅ |
| Sidebar with exactly **6 active links** | ✅ Dashboard, Patients, Therapists, Schedule, Reports, Settings |
| Each link navigates to a distinct page route | ✅ |
| Team Page using `TeamService.ts` (mocked service from `/api` folder) | ✅ |
| Settings page (dedicated layout) | ✅ `/settings` |
| User Profile page (dedicated layout) | ✅ `/profile` |
| Sign Out redirects to `/login` | ✅ via `useAuth().logout()` → `navigateTo('/login')` |
| Auth middleware protecting all routes | ✅ `middleware/auth.ts` |

---

## 🎨 Tech Stack

- **Nuxt 3** — SSR/SPA framework
- **Vue 3** — Composition API + `<script setup>`
- **Tailwind CSS** — Utility-first styling via `@nuxtjs/tailwindcss`
- **TypeScript** — Full type safety
- Google Fonts: **DM Sans** + **Playfair Display**

---

## 📝 Notes

- No backend or database — UI-only as required
- `TeamService.ts` is in the `/api` folder and uses `Promise`-based mock returns
- Branding follows the NutriMatch thesis: green primary palette, clinical and clean aesthetic
