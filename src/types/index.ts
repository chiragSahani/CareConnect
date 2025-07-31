export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  image: string;
  credentials: string[];
  bio: string;
  languages: string[];
  consultationFee: number;
  availability: {
    [key: string]: {
      isAvailable: boolean;
      slots: string[];
    };
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  symptoms?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}