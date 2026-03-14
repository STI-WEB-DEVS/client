import { BaseService } from "../BaseService"; 

// services/TeamService.ts
export interface TeamMember {
  id: number
  name: string
  title: string
  specialization: string
  experience: number
  email: string
  patients: number
  initials: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Maria Santos, RND',
    title: 'Lead Clinical Dietitian',
    specialization: 'Clinical Nutrition',
    experience: 12,
    email: 'maria.santos@nutrimatch.com',
    patients: 45,
    initials: 'MS'
  },
  {
    id: 2,
    name: 'Dr. Jose Reyes, RND',
    title: 'Sports Nutrition Specialist',
    specialization: 'Sports Nutrition',
    experience: 8,
    email: 'jose.reyes@nutrimatch.com',
    patients: 38,
    initials: 'JR'
  },
  {
    id: 3,
    name: 'Dr. Ana Mercado, RND',
    title: 'Pediatric Nutritionist',
    specialization: 'Pediatric Nutrition',
    experience: 10,
    email: 'ana.mercado@nutrimatch.com',
    patients: 52,
    initials: 'AM'
  },
  {
    id: 4,
    name: 'Dr. Carlos Cruz, RND',
    title: 'Renal Dietitian',
    specialization: 'Renal Nutrition',
    experience: 15,
    email: 'carlos.cruz@nutrimatch.com',
    patients: 41,
    initials: 'CC'
  },
  {
    id: 5,
    name: 'Dr. Sofia Villanueva, RND',
    title: 'Diabetes Educator',
    specialization: 'Diabetes Management',
    experience: 7,
    email: 'sofia.villanueva@nutrimatch.com',
    patients: 33,
    initials: 'SV'
  },
  {
    id: 6,
    name: 'Dr. Miguel Garcia, RND',
    title: 'Weight Management Specialist',
    specialization: 'Weight Management',
    experience: 9,
    email: 'miguel.garcia@nutrimatch.com',
    patients: 47,
    initials: 'MG'
  }
]