const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 12,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentials: ['MD', 'FACC', 'Board Certified'],
    bio: 'Dr. Sarah Johnson is a highly experienced cardiologist with over 12 years of practice. She specializes in preventive cardiology and has helped thousands of patients maintain heart health.',
    languages: ['English', 'Spanish'],
    consultationFee: 150,
    availability: {
      monday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      tuesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      wednesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      thursday: { isAvailable: true, slots: ['09:00', '10:00', '14:00', '15:00'] },
      friday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '1',
        patientName: 'John Smith',
        rating: 5,
        comment: 'Excellent doctor! Very thorough and caring.',
        date: '2024-01-15'
      },
      {
        id: '2',
        patientName: 'Emily Davis',
        rating: 5,
        comment: 'Dr. Johnson saved my life. Highly recommend!',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    experience: 8,
    rating: 4.8,
    reviewCount: 95,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentials: ['MD', 'Board Certified Dermatologist'],
    bio: 'Dr. Michael Chen is a board-certified dermatologist specializing in both medical and cosmetic dermatology. He has extensive experience in treating skin conditions and aesthetic procedures.',
    languages: ['English', 'Mandarin'],
    consultationFee: 120,
    availability: {
      monday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
      tuesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
      wednesday: { isAvailable: true, slots: ['08:00', '09:00', '13:00', '14:00'] },
      thursday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
      friday: { isAvailable: true, slots: ['08:00', '09:00', '10:00'] },
      saturday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '3',
        patientName: 'Lisa Wilson',
        rating: 5,
        comment: 'Amazing results! Dr. Chen is very professional.',
        date: '2024-01-12'
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    experience: 15,
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/5327658/pexels-photo-5327658.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentials: ['MD', 'Board Certified Pediatrician', 'FAAP'],
    bio: 'Dr. Emily Rodriguez has been caring for children for over 15 years. She is passionate about child development and preventive care, making every visit comfortable for both children and parents.',
    languages: ['English', 'Spanish', 'Portuguese'],
    consultationFee: 100,
    availability: {
      monday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'] },
      tuesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00', '13:00'] },
      wednesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
      thursday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'] },
      friday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '4',
        patientName: 'Maria Garcia',
        rating: 5,
        comment: 'Dr. Rodriguez is wonderful with children. Highly recommend!',
        date: '2024-01-08'
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. David Thompson',
    specialization: 'Orthopedic Surgeon',
    experience: 18,
    rating: 4.7,
    reviewCount: 203,
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentials: ['MD', 'Board Certified Orthopedic Surgeon'],
    bio: 'Dr. David Thompson is a leading orthopedic surgeon with expertise in sports medicine and joint replacement. He has performed thousands of successful surgeries throughout his career.',
    languages: ['English'],
    consultationFee: 200,
    availability: {
      monday: { isAvailable: true, slots: ['07:00', '08:00', '09:00', '13:00'] },
      tuesday: { isAvailable: true, slots: ['07:00', '08:00', '09:00', '13:00', '14:00'] },
      wednesday: { isAvailable: true, slots: ['07:00', '08:00', '13:00', '14:00'] },
      thursday: { isAvailable: true, slots: ['07:00', '08:00', '09:00', '13:00'] },
      friday: { isAvailable: true, slots: ['07:00', '08:00', '09:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '5',
        patientName: 'Robert Johnson',
        rating: 5,
        comment: 'Excellent surgeon! My knee replacement was perfect.',
        date: '2024-01-05'
      }
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    specialization: 'Neurologist',
    experience: 10,
    rating: 4.8,
    reviewCount: 87,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentials: ['MD', 'PhD', 'Board Certified Neurologist'],
    bio: 'Dr. Lisa Park specializes in treating neurological disorders with a focus on headaches, epilepsy, and movement disorders. She combines cutting-edge research with compassionate patient care.',
    languages: ['English', 'Korean'],
    consultationFee: 180,
    availability: {
      monday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      tuesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      wednesday: { isAvailable: true, slots: ['09:00', '10:00', '14:00', '15:00'] },
      thursday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      friday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      saturday: { isAvailable: true, slots: ['10:00', '11:00'] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '6',
        patientName: 'Anna Kim',
        rating: 5,
        comment: 'Dr. Park helped me manage my migraines effectively.',
        date: '2024-01-03'
      }
    ]
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialization: 'General Practitioner',
    experience: 20,
    rating: 4.6,
    reviewCount: 312,
    image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
    credentials: ['MD', 'Family Medicine Board Certified'],
    bio: 'Dr. James Wilson has been providing comprehensive family healthcare for over 20 years. He focuses on preventive care and building long-term relationships with his patients.',
    languages: ['English', 'French'],
    consultationFee: 80,
    availability: {
      monday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00'] },
      tuesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'] },
      wednesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
      thursday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'] },
      friday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '11:00'] },
      saturday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '7',
        patientName: 'Tom Brown',
        rating: 4,
        comment: 'Very experienced doctor. Great bedside manner.',
        date: '2024-01-01'
      }
    ]
  }
];

module.exports = { mockDoctors };
