export interface TeamMember {
  id: number
  name: string
  initials: string
  color: string
  role: string
  email: string
  studentId: string
  section: string
  contact: string
  contributions: number
  modules: number
  responsibilities: string[]
  techStack: string[]
  status: 'active'
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'King Paolo Chiu',
    initials: 'KC',
    color: '#0d6b6b',
    role: 'Project Lead & Full-Stack Developer',
    email: 'kingpaolo.chiu@sti.edu.ph',
    studentId: 'STI-2022-00341',
    section: 'BSIT 602',
    contact: '+63 917 123 4501',
    contributions: 148,
    modules: 6,
    responsibilities: ['System Architecture', 'Backend API', 'Database Design', 'Documentation'],
    techStack: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Nuxt'],
    status: 'active',
  },
  {
    id: 2,
    name: 'Ivy Hope Alba',
    initials: 'IA',
    color: '#7c3aed',
    role: 'UI/UX Designer & Frontend Developer',
    email: 'ivyhope.alba@sti.edu.ph',
    studentId: 'STI-2022-00358',
    section: 'BSIT 602',
    contact: '+63 918 234 5602',
    contributions: 112,
    modules: 5,
    responsibilities: ['UI/UX Design', 'Frontend Components', 'Prototyping', 'User Testing'],
    techStack: ['Vue.js', 'Tailwind CSS', 'Figma', 'HTML/CSS', 'JavaScript'],
    status: 'active',
  },
  {
    id: 3,
    name: 'Julia Niel Bulalaque',
    initials: 'JB',
    color: '#d97706',
    role: 'Backend Developer & Data Analyst',
    email: 'julianiel.bulalaque@sti.edu.ph',
    studentId: 'STI-2022-00374',
    section: 'BSIT 602',
    contact: '+63 919 345 6703',
    contributions: 97,
    modules: 4,
    responsibilities: ['Database Management', 'Nutrition Data Integration', 'API Development', 'Testing'],
    techStack: ['PHP', 'MySQL', 'Laravel', 'SQLite', 'Python'],
    status: 'active',
  },
  {
    id: 4,
    name: 'Kent Darryl Leabres',
    initials: 'KL',
    color: '#059669',
    role: 'QA Engineer & Technical Writer',
    email: 'kentdarryl.leabres@sti.edu.ph',
    studentId: 'STI-2022-00389',
    section: 'BSIT 602',
    contact: '+63 920 456 7804',
    contributions: 84,
    modules: 4,
    responsibilities: ['Quality Assurance', 'Technical Documentation', 'System Testing', 'Deployment'],
    techStack: ['Laravel Herd', 'Git', 'Postman', 'VS Code', 'Nuxt'],
    status: 'active',
  },
]