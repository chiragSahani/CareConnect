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
  },
  {
    id: '4',
    name: 'Dr. Samuel Green',
    specialization: 'Orthopedist',
    experience: 20,
    rating: 4.7,
    reviewCount: 180,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'FACS', 'Board Certified in Orthopedic Surgery'],
    bio: 'Dr. Samuel Green is a highly skilled orthopedic surgeon with extensive experience in joint replacement and sports medicine. He is committed to helping his patients regain their mobility and live pain-free.',
    languages: ['English'],
    consultationFee: 300,
    availability: {
      monday: { isAvailable: true, slots: ['08:00', '09:00', '10:00'] },
      tuesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00'] },
      wednesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00'] },
      thursday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00'] },
      friday: { isAvailable: false, slots: [] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '5',
        patientName: 'David Wilson',
        rating: 5,
        comment: 'Dr. Green is an amazing surgeon. I am so grateful for his care.',
        date: '2024-03-10'
      }
    ]
  },
  {
    id: '5',
    name: 'Dr. Chloe Davis',
    specialization: 'Neurologist',
    experience: 8,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'PhD', 'Board Certified in Neurology'],
    bio: 'Dr. Chloe Davis is a dedicated neurologist with a focus on treating complex neurological disorders. She is known for her cutting-edge research and compassionate patient care.',
    languages: ['English', 'German'],
    consultationFee: 220,
    availability: {
      monday: { isAvailable: true, slots: ['10:00', '11:00', '14:00'] },
      tuesday: { isAvailable: true, slots: ['10:00', '11:00', '14:00', '15:00'] },
      wednesday: { isAvailable: true, slots: ['10:00', '11:00'] },
      thursday: { isAvailable: false, slots: [] },
      friday: { isAvailable: true, slots: ['10:00', '11:00', '14:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '6',
        patientName: 'Sarah Miller',
        rating: 5,
        comment: 'Dr. Davis is a brilliant doctor. She has helped me so much.',
        date: '2024-02-20'
      }
    ]
  },
  {
    id: '6',
    name: 'Dr. Matthew Taylor',
    specialization: 'Psychiatrist',
    experience: 18,
    rating: 4.9,
    reviewCount: 250,
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'Board Certified in Psychiatry'],
    bio: 'Dr. Matthew Taylor is a compassionate psychiatrist with a focus on providing comprehensive mental health care. He is dedicated to helping his patients achieve their full potential.',
    languages: ['English'],
    consultationFee: 180,
    availability: {
      monday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      tuesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      wednesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      thursday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      friday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '7',
        patientName: 'Emily White',
        rating: 5,
        comment: 'Dr. Taylor is a wonderful psychiatrist. He is very understanding and supportive.',
        date: '2024-03-05'
      }
    ]
  },
  {
    id: '7',
    name: 'Dr. Jessica Brown',
    specialization: 'Gynecologist',
    experience: 14,
    rating: 4.8,
    reviewCount: 190,
    image: 'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'FACOG', 'Board Certified in Obstetrics and Gynecology'],
    bio: 'Dr. Jessica Brown is a dedicated gynecologist with a focus on providing comprehensive care for women of all ages. She is committed to empowering her patients to take control of their health.',
    languages: ['English', 'Spanish'],
    consultationFee: 190,
    availability: {
      monday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      tuesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      wednesday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      thursday: { isAvailable: true, slots: ['09:00', '10:00', '11:00'] },
      friday: { isAvailable: true, slots: ['09:00', '10:00', '11:00', '14:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '8',
        patientName: 'Jessica Martinez',
        rating: 5,
        comment: 'Dr. Brown is a wonderful doctor. She is very caring and knowledgeable.',
        date: '2024-02-25'
      }
    ]
  },
  {
    id: '8',
    name: 'Dr. Christopher Lee',
    specialization: 'Urologist',
    experience: 16,
    rating: 4.7,
    reviewCount: 160,
    image: 'https://images.pexels.com/photos/5206931/pexels-photo-5206931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'FACS', 'Board Certified in Urology'],
    bio: 'Dr. Christopher Lee is a highly skilled urologist with extensive experience in treating a wide range of urological conditions. He is committed to providing his patients with the highest quality of care.',
    languages: ['English', 'Korean'],
    consultationFee: 210,
    availability: {
      monday: { isAvailable: true, slots: ['08:00', '09:00', '10:00'] },
      tuesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00'] },
      wednesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00'] },
      thursday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00'] },
      friday: { isAvailable: false, slots: [] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '9',
        patientName: 'Daniel Kim',
        rating: 5,
        comment: 'Dr. Lee is an excellent doctor. He is very professional and caring.',
        date: '2024-03-15'
      }
    ]
  },
  {
    id: '9',
    name: 'Dr. Laura White',
    specialization: 'Endocrinologist',
    experience: 11,
    rating: 4.9,
    reviewCount: 140,
    image: 'https://images.pexels.com/photos/4989135/pexels-photo-4989135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'FACE', 'Board Certified in Endocrinology, Diabetes, and Metabolism'],
    bio: 'Dr. Laura White is a dedicated endocrinologist with a focus on providing comprehensive care for patients with hormonal disorders. She is committed to helping her patients achieve their health goals.',
    languages: ['English'],
    consultationFee: 230,
    availability: {
      monday: { isAvailable: true, slots: ['10:00', '11:00', '14:00'] },
      tuesday: { isAvailable: true, slots: ['10:00', '11:00', '14:00', '15:00'] },
      wednesday: { isAvailable: true, slots: ['10:00', '11:00'] },
      thursday: { isAvailable: false, slots: [] },
      friday: { isAvailable: true, slots: ['10:00', '11:00', '14:00'] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '10',
        patientName: 'Laura Rodriguez',
        rating: 5,
        comment: 'Dr. White is a wonderful doctor. She is very knowledgeable and caring.',
        date: '2024-02-28'
      }
    ]
  },
  {
    id: '10',
    name: 'Dr. Kevin Harris',
    specialization: 'Pulmonologist',
    experience: 19,
    rating: 4.8,
    reviewCount: 170,
    image: 'https://images.pexels.com/photos/5215017/pexels-photo-5215017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    credentials: ['MD', 'FCCP', 'Board Certified in Pulmonary Disease'],
    bio: 'Dr. Kevin Harris is a highly skilled pulmonologist with extensive experience in treating a wide range of respiratory conditions. He is committed to providing his patients with the highest quality of care.',
    languages: ['English'],
    consultationFee: 240,
    availability: {
      monday: { isAvailable: true, slots: ['08:00', '09:00', '10:00'] },
      tuesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00'] },
      wednesday: { isAvailable: true, slots: ['08:00', '09:00', '10:00'] },
      thursday: { isAvailable: true, slots: ['08:00', '09:00', '10:00', '13:00'] },
      friday: { isAvailable: false, slots: [] },
      saturday: { isAvailable: false, slots: [] },
      sunday: { isAvailable: false, slots: [] }
    },
    reviews: [
      {
        id: '11',
        patientName: 'Kevin Johnson',
        rating: 5,
        comment: 'Dr. Harris is an excellent doctor. He is very professional and caring.',
        date: '2024-03-20'
      }
    ]
  }
];

module.exports = { mockDoctors };
