// api/TeamService.ts
// NutriMatch — Team Member Data Service

export interface TeamMember {
  id: number
  name: string
  role: string
  specialty: string
  email: string
  status: 'active' | 'on-leave' | 'pending'
  initials: string
  color: string
  joinDate: string
  patients: number
  prcLicense: string
  consultationType: 'online' | 'in-person' | 'both'
  languages: string[]
  rating: number
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Maria Santos, RND',
    role: 'Lead Nutritionist-Dietitian',
    specialty: 'Diabetes & Endocrine Nutrition',
    email: 'maria.santos@nutrimatch.ph',
    status: 'active',
    initials: 'MS',
    color: '#0d6b6b',
    joinDate: '2023-01-15',
    patients: 24,
    prcLicense: 'PRC-RND-00234',
    consultationType: 'both',
    languages: ['Filipino', 'English'],
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Jose Reyes, RND',
    role: 'Clinical Dietitian',
    specialty: 'Renal Nutrition Therapy',
    email: 'jose.reyes@nutrimatch.ph',
    status: 'active',
    initials: 'JR',
    color: '#d97706',
    joinDate: '2023-03-22',
    patients: 18,
    prcLicense: 'PRC-RND-00419',
    consultationType: 'online',
    languages: ['Filipino', 'English', 'Bisaya'],
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Ana Lim, RND',
    role: 'Clinical Dietitian',
    specialty: 'Cardiovascular & Hypertension',
    email: 'ana.lim@nutrimatch.ph',
    status: 'active',
    initials: 'AL',
    color: '#7c3aed',
    joinDate: '2023-06-10',
    patients: 21,
    prcLicense: 'PRC-RND-00551',
    consultationType: 'both',
    languages: ['Filipino', 'English'],
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Carlo Mendoza, RND',
    role: 'Pediatric & Maternal Dietitian',
    specialty: 'Pediatric & Maternal Nutrition',
    email: 'carlo.mendoza@nutrimatch.ph',
    status: 'on-leave',
    initials: 'CM',
    color: '#059669',
    joinDate: '2023-08-05',
    patients: 15,
    prcLicense: 'PRC-RND-00672',
    consultationType: 'in-person',
    languages: ['Filipino', 'English'],
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Sofia Cruz, RND',
    role: 'Clinical Dietitian',
    specialty: 'Weight Management & Obesity',
    email: 'sofia.cruz@nutrimatch.ph',
    status: 'active',
    initials: 'SC',
    color: '#dc2626',
    joinDate: '2024-01-20',
    patients: 31,
    prcLicense: 'PRC-RND-00788',
    consultationType: 'both',
    languages: ['Filipino', 'English', 'Ilocano'],
    rating: 4.95,
  },
  {
    id: 6,
    name: 'Miguel Torres, RND',
    role: 'Sports Dietitian',
    specialty: 'Sports & Performance Nutrition',
    email: 'miguel.torres@nutrimatch.ph',
    status: 'pending',
    initials: 'MT',
    color: '#ea580c',
    joinDate: '2024-05-15',
    patients: 0,
    prcLicense: 'PRC-RND-00901',
    consultationType: 'online',
    languages: ['Filipino', 'English'],
    rating: 0,
  },
  {
    id: 7,
    name: 'Lena Villanueva, RND',
    role: 'Clinical Dietitian',
    specialty: 'Oncology Nutrition Support',
    email: 'lena.villanueva@nutrimatch.ph',
    status: 'active',
    initials: 'LV',
    color: '#0891b2',
    joinDate: '2024-02-28',
    patients: 12,
    prcLicense: 'PRC-RND-00845',
    consultationType: 'in-person',
    languages: ['Filipino', 'English', 'Bisaya'],
    rating: 4.85,
  },
]

export const TeamService = {
  /**
   * Retrieve all registered team members
   */
  async getAll(): Promise<TeamMember[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve([...TEAM_MEMBERS]), 380)
    )
  },

  /**
   * Retrieve a single team member by ID
   */
  async getById(id: number): Promise<TeamMember | undefined> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(TEAM_MEMBERS.find((m) => m.id === id)),
        380
      )
    )
  },

  /**
   * Retrieve only active team members
   */
  async getActive(): Promise<TeamMember[]> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(TEAM_MEMBERS.filter((m) => m.status === 'active')),
        380
      )
    )
  },

  /**
   * Retrieve members pending verification
   */
  async getPending(): Promise<TeamMember[]> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(TEAM_MEMBERS.filter((m) => m.status === 'pending')),
        380
      )
    )
  },

  /**
   * Get total patient count across all team members
   */
  async getTotalPatients(): Promise<number> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(TEAM_MEMBERS.reduce((acc, m) => acc + m.patients, 0)),
        380
      )
    )
  },
}
