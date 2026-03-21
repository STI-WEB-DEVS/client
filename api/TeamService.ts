// api/TeamService.ts
// Mocked TeamService - simulates a real API response

export interface TeamMember {
  id: number
  name: string
  role: string
  specialty: string
  status: 'Active' | 'Inactive' | 'On Leave'
  email: string
  patients: number
  avatar: string
  joinedDate: string
  languages: string[]
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Anya Sharma',
    role: 'Clinical Dietitian',
    specialty: 'Diabetes & Metabolic Disorders',
    status: 'Active',
    email: 'a.sharma@nutrimatch.com',
    patients: 34,
    avatar: 'AS',
    joinedDate: '2023-01-15',
    languages: ['English', 'Filipino']
  },
  {
    id: 2,
    name: 'Dr. Marcus Reyes',
    role: 'Clinical Dietitian',
    specialty: 'Renal Nutrition',
    status: 'Active',
    email: 'm.reyes@nutrimatch.com',
    patients: 27,
    avatar: 'MR',
    joinedDate: '2023-03-10',
    languages: ['English', 'Filipino', 'Bisaya']
  },
  {
    id: 3,
    name: 'Dr. Sofia Lim',
    role: 'Nutrition Therapist',
    specialty: 'Weight Management',
    status: 'Active',
    email: 's.lim@nutrimatch.com',
    patients: 45,
    avatar: 'SL',
    joinedDate: '2022-11-20',
    languages: ['English', 'Filipino', 'Mandarin']
  },
  {
    id: 4,
    name: 'Dr. James Torres',
    role: 'Clinical Dietitian',
    specialty: 'Pediatric Nutrition',
    status: 'On Leave',
    email: 'j.torres@nutrimatch.com',
    patients: 18,
    avatar: 'JT',
    joinedDate: '2023-06-01',
    languages: ['English', 'Filipino']
  },
  {
    id: 5,
    name: 'Dr. Elena Cruz',
    role: 'Senior Dietitian',
    specialty: 'Cardiovascular Nutrition',
    status: 'Active',
    email: 'e.cruz@nutrimatch.com',
    patients: 52,
    avatar: 'EC',
    joinedDate: '2022-08-15',
    languages: ['English', 'Filipino', 'Spanish']
  },
  {
    id: 6,
    name: 'Dr. Ryan Mendoza',
    role: 'Nutrition Therapist',
    specialty: 'Sports Nutrition',
    status: 'Inactive',
    email: 'r.mendoza@nutrimatch.com',
    patients: 0,
    avatar: 'RM',
    joinedDate: '2024-01-08',
    languages: ['English', 'Filipino']
  }
]

export const TeamService = {
  getAll: (): Promise<TeamMember[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(teamMembers), 300)
    })
  },
  getById: (id: number): Promise<TeamMember | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(teamMembers.find(m => m.id === id)), 200)
    })
  },
  getActive: (): Promise<TeamMember[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(teamMembers.filter(m => m.status === 'Active')), 200)
    })
  }
}

export default TeamService
