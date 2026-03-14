export interface TeamMember {
  id: number
  name: string
  initials: string
  role: string
  department: string
  email: string
  responsibilities: string
  avatarBg: string
  roleColor: string
  status: string
  statusClass: string
}

export class TeamService {
  getTeams(): TeamMember[] {
    return [
      {
        id: 1,
        name: 'Nicollette Libunao',
        initials: 'NL',
        role: 'Admin/Project Lead & Full Stack Developer',
        department: 'System Architecture',
        email: 'nicollette@amuma.health',
        responsibilities: 'Overall system design, frontend & backend integration, project management',
        avatarBg: 'bg-blue-100 text-blue-700',  
        roleColor: 'text-teal-600',
        status: 'Active',
        statusClass: 'bg-teal-100 text-teal-700',
      },
      {
        id: 2,
        name: 'Prince Sestoso',
        initials: 'PS',
        role: 'Backend Developer',
        department: 'API & Database',
        email: 'prince@amuma.health',
        responsibilities: 'REST API development, database schema design, server-side logic',
        avatarBg: 'bg-blue-100 text-blue-700',
        roleColor: 'text-blue-600',
        status: 'Active',
        statusClass: 'bg-teal-100 text-teal-700',
      },
      {
        id: 3,
        name: 'Hannah Magsipoc',
        initials: 'HM',
        role: 'UI/UX Designer & Frontend Developer',
        department: 'Interface & Experience',
        email: 'hannah@amuma.health',
        responsibilities: 'UI design, user experience, frontend components, accessibility',
        avatarBg: 'bg-blue-100 text-blue-700',
        roleColor: 'text-pink-600',
        status: 'Active',
        statusClass: 'bg-teal-100 text-teal-700',
      },
      {
        id: 4,
        name: 'Gem Mamale',
        initials: 'GM',
        role: 'QA Tester & Documentation',
        department: 'Quality Assurance',
        email: 'gem@amuma.health',
        responsibilities: 'System testing, bug reporting, technical documentation, user manuals',
        avatarBg: 'bg-blue-100 text-blue-700',
        roleColor: 'text-yellow-600',
        status: 'Active',
        statusClass: 'bg-teal-100 text-teal-700',
      },
    ]
  }
}