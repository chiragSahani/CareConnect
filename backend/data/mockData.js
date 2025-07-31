const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    specialization: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    reviewCount: 212,
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'FACC', 'Board Certified in Cardiology'],
    bio: 'Dr. Evelyn Reed is a renowned cardiologist with a passion for preventive care and patient education. She has been recognized as a top doctor in her field for the last 5 years.',
    languages: ['English', 'Spanish'],
    consultationFee: 250,
    availability: {
      monday: { isAvailable: true, slots: ['10:00', '11:00', '14:00', '15:00'] },
      tuesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      wednesday: { isAvailable: false, slots: [] },
      thursday: { isAvailable: true, slots: ['10:00', '11:00', '14:00', '15:00'] },
      friday: { isAvailable: true, slots: ['09:00', '10:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '1',
        patientName: 'John Doe',
        rating: 5,
        comment: 'Dr. Reed is an exceptional doctor. She is very attentive and caring.',
        date: '2024-02-10'
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        rating: 5,
        comment: 'I highly recommend Dr. Reed. She is very knowledgeable and professional.',
        date: '2024-01-20'
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Benjamin Carter',
    specialization: 'Dermatologist',
    experience: 10,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'Board Certified in Dermatology'],
    bio: 'Dr. Benjamin Carter is a leading dermatologist specializing in cosmetic and medical dermatology. He is known for his innovative treatments and personalized approach to patient care.',
    languages: ['English', 'French'],
    consultationFee: 200,
    availability: {
      monday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      tuesday: { isAvailable: false, slots: [] },
      wednesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      thursday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      friday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '3',
        patientName: 'Alice Johnson',
        rating: 5,
        comment: 'Dr. Carter is a fantastic doctor. My skin has never looked better!',
        date: '2024-03-01'
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Olivia Chen',
    specialization: 'Pediatrician',
    experience: 12,
    rating: 4.9,
    reviewCount: 320,
    image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'FAAP', 'Board Certified in Pediatrics'],
    bio: 'Dr. Olivia Chen is a compassionate pediatrician with a gentle approach to child care. She is dedicated to providing the best possible care for her young patients.',
    languages: ['English', 'Mandarin'],
    consultationFee: 150,
    availability: {
      monday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      tuesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      wednesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      thursday: { isAvailable: false, slots: [] },
      friday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '4',
        patientName: 'Michael Brown',
        rating: 5,
        comment: 'Dr. Chen is wonderful with kids. My children love her!',
        date: '2024-02-15'
      }
    ]
  }
];

module.exports = { mockDoctors };
