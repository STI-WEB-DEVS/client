import { ref, computed } from 'vue'

export interface AuthUser {
  name: string
  email: string
  password: string
  plan: 'basic' | 'premium'
  isActive: boolean
  joinedAt: string
  phone?: string
  avatar?: string  // base64 data URL
}

export interface SeedPost {
  id: number
  title: string
  body: string
  tag: string
  imageUrl: string
  date: string
  author: string
  authorPlan: 'basic' | 'premium'
}

const SESSION_KEY = 'tailortrack_session'
const USERS_KEY   = 'tailortrack_users'
const POSTS_KEY   = 'tailortrack_posts'

const currentUser = ref<AuthUser | null>(null)

if (import.meta.client) {
  const raw = localStorage.getItem(SESSION_KEY)
  if (raw) { try { currentUser.value = JSON.parse(raw) } catch {} }
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
const DEMO_USERS: AuthUser[] = [
  {
    name: 'Admin (Premium)',
    email: 'admin@satura.com',
    password: 'admin123',
    plan: 'premium',
    isActive: true,
    joinedAt: 'January 2026',
  },
  {
    name: 'Basic User',
    email: 'basic@satura.com',
    password: 'basic123',
    plan: 'basic',
    isActive: true,
    joinedAt: 'February 2026',
  },
]

const SEED_POSTS: SeedPost[] = [
  {
    id: 1,
    title: 'New Collection: Barong Tagalog 2026',
    body: 'We are proud to introduce our 2026 Barong Tagalog collection — featuring hand-embroidered piña fabric with modern slim-fit cuts. Perfect for formal events and government occasions. Available in sizes XS–3XL.',
    tag: 'Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    date: 'Mar 14, 2026',
    author: 'Admin (Premium)',
    authorPlan: 'premium',
  },
  {
    id: 2,
    title: 'School Uniform Season: Early Bird Promo',
    body: 'Get 15% off all school uniform orders placed before April 15! We accept bulk orders for schools, colleges, and government offices. Free alteration included for orders of 10 or more pieces.',
    tag: 'Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    date: 'Mar 12, 2026',
    author: 'Admin (Premium)',
    authorPlan: 'premium',
  },
  {
    id: 3,
    title: 'Fabric Inventory Update — March 2026',
    body: 'We have restocked premium cotton, linen, and silk fabrics. New arrivals include Japanese cotton poplin in 12 colors and Italian linen for formal wear. Visit our shop or call to check availability.',
    tag: 'Update',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    date: 'Mar 10, 2026',
    author: 'Admin (Premium)',
    authorPlan: 'premium',
  },
  {
    id: 4,
    title: 'Alteration & Repair Services Now Available',
    body: 'Bring in your old clothes for expert alterations — zipper replacements, hemming, waistline adjustments, and full restyling. Same-day service available for minor repairs. Walk-ins welcome Monday to Saturday.',
    tag: 'Announcement',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    date: 'Mar 8, 2026',
    author: 'Admin (Premium)',
    authorPlan: 'premium',
  },
]

// ─── Composable ───────────────────────────────────────────────────────────────
export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value)
  const isPremium  = computed(() => currentUser.value?.plan === 'premium')
  const user       = computed(() => currentUser.value)

  function getUsers(): AuthUser[] {
    if (!import.meta.client) return []
    const raw = localStorage.getItem(USERS_KEY)
    try { return raw ? JSON.parse(raw) : [] } catch { return [] }
  }

  function saveUsers(users: AuthUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  function getPosts(): SeedPost[] {
    if (!import.meta.client) return []
    const raw = localStorage.getItem(POSTS_KEY)
    try { return raw ? JSON.parse(raw) : [] } catch { return [] }
  }

  function savePosts(posts: SeedPost[]) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  }

  function register(name: string, email: string, password: string, plan: 'basic' | 'premium') {
    const users = getUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      throw new Error('An account with this email already exists.')
    const newUser: AuthUser = { name, email: email.toLowerCase(), password, plan, isActive: true, joinedAt: new Date().toLocaleDateString('en-PH', { month: 'long', year: 'numeric' }) }
    users.push(newUser)
    saveUsers(users)
    _setSession(newUser)
  }

  function login(email: string, password: string) {
    const users = getUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) throw new Error('Invalid email or password.')
    if (!found.isActive) throw new Error('Your account is not yet activated.')
    _setSession(found)
  }

  function signOut() {
    currentUser.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  function updateProfile(name: string, email: string, phone: string) {
    if (!currentUser.value) return
    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === currentUser.value!.email.toLowerCase())
    const updated: AuthUser = { ...currentUser.value, name, email: email.toLowerCase(), phone }
    if (idx !== -1) { users[idx] = updated; saveUsers(users) }
    _setSession(updated)
  }

  function updatePassword(currentPwd: string, newPwd: string) {
    if (!currentUser.value) throw new Error('Not logged in.')
    if (currentUser.value.password !== currentPwd) throw new Error('Current password is incorrect.')
    if (newPwd.length < 6) throw new Error('New password must be at least 6 characters.')
    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === currentUser.value!.email.toLowerCase())
    const updated: AuthUser = { ...currentUser.value, password: newPwd }
    if (idx !== -1) { users[idx] = updated; saveUsers(users) }
    _setSession(updated)
  }

  function updateAvatar(dataUrl: string) {
    if (!currentUser.value) return
    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === currentUser.value!.email.toLowerCase())
    const updated: AuthUser = { ...currentUser.value, avatar: dataUrl }
    if (idx !== -1) { users[idx] = updated; saveUsers(users) }
    _setSession(updated)
  }

  function seedDemoIfEmpty() {
    if (!import.meta.client) return
    // Always ensure the two demo accounts exist (upsert by email)
    const users = getUsers()
    let changed = false
    for (const demo of DEMO_USERS) {
      const idx = users.findIndex(u => u.email === demo.email)
      if (idx === -1) { users.push(demo); changed = true }
      else { users[idx] = demo; changed = true } // keep demo accounts in sync
    }
    if (changed) saveUsers(users)

    const posts = getPosts()
    if (posts.length === 0) {
      savePosts(SEED_POSTS)
    }
  }

  function _setSession(u: AuthUser) {
    currentUser.value = u
    localStorage.setItem(SESSION_KEY, JSON.stringify(u))
  }

  return { user, isLoggedIn, isPremium, register, login, signOut, seedDemoIfEmpty, getUsers, getPosts, savePosts, updateProfile, updatePassword, updateAvatar }
}
