
import React from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Wind, 
  Wrench, 
  Clock, 
  CheckCircle2,
  Trash2,
  Settings,
  LayoutDashboard,
  Users,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Newspaper
} from 'lucide-react';
import { Service, ServiceCategory, SiteSettings, Testimonial, Lead } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  name: "LA Hood Cleaning Pro",
  phone: "(213) 555-0199",
  email: "service@lahoodclean.com",
  address: "700 S Flower St, Los Angeles, CA 90017",
  facebook: "https://facebook.com/lahoodcleaning",
  instagram: "https://instagram.com/lahoodcleaning",
  youtube: "https://youtube.com/@lahoodcleaning",
  heroHeadline: "Protect Your Restaurant from Fire Risks",
  heroSubheadline: "Los Angeles' most trusted NFPA 96 compliant commercial kitchen hood and exhaust cleaning experts.",
  accentColor: "#f97316" // Orange-500
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    title: "Complete Exhaust Cleaning",
    slug: "complete-exhaust-cleaning",
    description: "Deep steam cleaning of your entire exhaust system to bare metal, including hoods, ductwork, and exhaust fans.",
    icon: "Flame",
    category: ServiceCategory.CLEANING,
    features: ["NFPA 96 Compliance", "Bare Metal Clean", "Certificate Provided"]
  },
  {
    id: '2',
    title: "Fan Maintenance & Repair",
    slug: "fan-maintenance",
    description: "Preventative maintenance for your roof-top exhaust fans, including belt replacement and hinge kit installation.",
    icon: "Wind",
    category: ServiceCategory.MAINTENANCE,
    features: ["Bearing Lubrication", "Belt Inspection", "Hinge Kit Installs"]
  },
  {
    id: '3',
    title: "Filter Exchange Program",
    slug: "filter-exchange",
    description: "Regular replacement of greasy filters with high-quality stainless steel baffle filters to improve airflow.",
    icon: "ShieldCheck",
    category: ServiceCategory.COMPLIANCE,
    features: ["Schedule Service", "Grease Containment", "Improved Airflow"]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: "Marco Rossi",
    role: "Owner, Downtown Grill",
    content: "They were professional, on time, and left the kitchen cleaner than they found it. Best hood cleaning in LA.",
    rating: 5
  },
  {
    id: '2',
    author: "Sarah Jenkins",
    role: "Manager, Metro Diner",
    content: "Passed our fire inspection with flying colors thanks to their meticulous documentation and cleaning.",
    rating: 5
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: "John Doe",
    email: "john@bistro.com",
    phone: "555-1234",
    restaurantName: "The Bistro",
    serviceId: "1",
    status: 'new',
    createdAt: new Date().toISOString(),
    message: "Need urgent cleaning before inspection."
  },
  {
    id: '2',
    name: "Jane Smith",
    email: "jane@cafe.com",
    phone: "555-5678",
    restaurantName: "Morning Cafe",
    serviceId: "3",
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: "How Often Should You Clean Your Kitchen Hood?",
    excerpt: "Understanding fire code requirements and frequency based on your cooking volume.",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '2',
    title: "The Dangers of Neglected Exhaust Fans",
    excerpt: "Why roof-top grease containment is essential for building maintenance.",
    date: "June 2, 2024",
    image: "https://images.unsplash.com/photo-1581092921461-7d656054490b?auto=format&fit=crop&q=80&w=800"
  }
];

export const getIcon = (name: string, className?: string) => {
  const icons: Record<string, any> = {
    Flame, Wind, ShieldCheck, Wrench, Clock, CheckCircle2, 
    Trash2, Settings, LayoutDashboard, Users, FileText, 
    Mail, Phone, ArrowRight, Newspaper
  };
  const Icon = icons[name] || ShieldCheck;
  return <Icon className={className} />;
};
