
export enum ServiceCategory {
  CLEANING = 'Cleaning',
  MAINTENANCE = 'Maintenance',
  REPAIR = 'Repair',
  COMPLIANCE = 'Compliance'
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  price?: string;
  features: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  restaurantName: string;
  serviceId: string;
  status: 'new' | 'contacted' | 'booked' | 'completed';
  createdAt: string;
  message?: string;
}

export interface SiteSettings {
  name: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  heroHeadline: string;
  heroSubheadline: string;
  accentColor: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}
