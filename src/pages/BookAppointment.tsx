import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, User, Phone, Mail, FileText, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { format, addDays, startOfWeek } from 'date-fns';

interface BookingForm {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  symptoms?: string;
}

const BookAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { doctors, addAppointment } = useApp();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'datetime' | 'details' | 'confirmation'>('datetime');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const doctor = doctors.find(d => d.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>();

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h2>
          <button
            onClick={() => navigate('/doctors')}
            className="text-blue-600 hover:underline"
          >
            Back to doctors
          </button>
        </div>
      </div>
    );
  }

  // Generate next 7 days
  const today = new Date();
  const nextSevenDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const getDayName = (date: Date) => {
    return format(date, 'EEEE').toLowerCase();
  };

  const getAvailableSlots = (date: string) => {
    const dayName = getDayName(new Date(date));
    return doctor.availability[dayName]?.slots || [];
  };

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const appointment = {
        doctorId: doctor.id,
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        date: selectedDate,
        time: selectedTime,
        status: 'confirmed' as const,
        symptoms: data.symptoms,
      };
      
      addAppointment(appointment);
      setStep('confirmation');
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateTimeNext = () => {
    if (selectedDate && selectedTime) {
      setStep('details');
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment with Dr. {doctor.name} has been successfully booked.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{format(new Date(selectedDate), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/appointments')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View My Appointments
              </button>
              <button
                onClick={() => navigate('/doctors')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => step === 'details' ? setStep('datetime') : navigate(`/doctors/${doctor.id}`)}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 'details' ? 'Back to date & time' : 'Back to profile'}
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule your consultation with Dr. {doctor.name}</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'datetime' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
                {step === 'datetime' ? '1' : <Check className="h-4 w-4" />}
              </div>
              <span className="ml-2 text-sm font-medium">Date & Time</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step === 'details' ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Your Details</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'datetime' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                
                {/* Date Selection */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Choose Date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {nextSevenDays.map((date) => {
                      const dateString = format(date, 'yyyy-MM-dd');
                      const dayName = getDayName(date);
                      const isAvailable = doctor.availability[dayName]?.isAvailable;
                      const isSelected = selectedDate === dateString;
                      
                      return (
                        <button
                          key={dateString}
                          onClick={() => isAvailable ? setSelectedDate(dateString) : null}
                          disabled={!isAvailable}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : isAvailable
                                ? 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-sm font-medium">
                            {format(date, 'EEE')}
                          </div>
                          <div className="text-lg">
                            {format(date, 'd')}
                          </div>
                          <div className="text-xs">
                            {format(date, 'MMM')}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Available Times</h3>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {getAvailableSlots(selectedDate).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            selectedTime === time
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <button
                      onClick={handleDateTimeNext}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Continue to Details
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Information</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        {...register('patientName', { required: 'Name is required' })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.patientName && (
                      <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        {...register('patientEmail', { required: 'Email is required' })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.patientEmail && (
                      <p className="mt-1 text-sm text-red-600">{errors.patientEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        {...register('patientPhone', { required: 'Phone number is required' })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.patientPhone && (
                      <p className="mt-1 text-sm text-red-600">{errors.patientPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Symptoms or Reason for Visit (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <textarea
                        {...register('symptoms')}
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe your symptoms or reason for the appointment..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
                  </button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Appointment Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{doctor.name}</div>
                  <div className="text-sm text-gray-600">{doctor.specialization}</div>
                </div>
              </div>

              {selectedDate && (
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}</span>
                </div>
              )}

              {selectedTime && (
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{selectedTime}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Consultation Fee:</span>
                  <span className="font-bold text-lg">${doctor.consultationFee}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;