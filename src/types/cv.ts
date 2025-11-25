export interface Experience {
  title: string;
  company: string;
  period: string;
  category: string;
  description: string[];
  technologies?: string[];
}

export interface Project {
  title: string;
  period: string;
  category: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  category: string;
  level: 'expert' | 'advanced' | 'intermediate';
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  category: string;
}

export interface VolunteerWork {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface CVData {
  name: string;
  title: string;
  tagline: string[];
  summary: string;
  location: string;
  email: string;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  volunteer: VolunteerWork[];
}
