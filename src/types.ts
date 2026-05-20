export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  beforeImage?: string;
  location: string;
  year: string;
  description: string;
  size: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
  detailText: string;
}

export interface WhyChooseFactor {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
}
