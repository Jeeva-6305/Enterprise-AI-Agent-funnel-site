import { CountryCode } from '../data/countryCodes';

export interface LeadFormData {
  fullName: string;
  workEmail: string;
  jobTitle: string;
  companyName: string;
  companySize: string;
  country: CountryCode;
  phoneNumber: string;
}

export interface ConnectorItem {
  id: string;
  name: string;
  category: 'warehouse' | 'database' | 'saas' | 'tool';
  logoUrl: string;
  badge?: string;
  description: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  layer: 'frontend' | 'gateway' | 'orchestration' | 'execution' | 'storage' | 'sources';
  description: string;
  techStack: string[];
}

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  description: string;
}
