import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, DollarSign, Award, Languages, Calendar, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { format } from 'date-fns';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { doctors } = useApp();
  
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h2>
          <Link to="/doctors" className="text-blue-600 hover:underline">
            Back to doctors
          </Link>
        </div>
      </div>
    );
  }

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            to="/doctors"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to doctors
          </Link>
        </motion.div>

        {/* Doctor Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-xl text-blue-600 font-semibold mb-2">{doctor.specialization}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{doctor.rating} ({doctor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{doctor.experience} years</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${doctor.consultationFee}</div>
                  <div className="text-sm text-gray-600">Consultation Fee</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Credentials</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.credentials.map((credential, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                <div className="flex space-x-2">
                  {doctor.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/book/${doctor.id}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
              <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>
              <div className="space-y-6">
                {doctor.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-900">{review.patientName}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">{format(new Date(review.date), 'MMMM d, yyyy')}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Schedule</h2>
            <div className="space-y-4">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="flex justify-between items-center">
                  <div className="font-medium text-gray-900">{dayNames[index]}</div>
                  <div className="text-sm text-gray-600">
                    {doctor.availability[day].isAvailable ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-500">Closed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Available Time Slots</h3>
              <p className="text-sm text-gray-600 mb-4">
                Book your appointment during available hours
              </p>
              <Link
                to={`/book/${doctor.id}`}
                className="w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors block"
              >
                View Available Slots
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;