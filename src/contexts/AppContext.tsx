import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Doctor, Appointment, ChatMessage } from '../types';
interface AppContextType {
  doctors: Doctor[];
  setDoctors: (doctors: Doctor[]) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  chatMessages: ChatMessage[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id'>) => void;
  clearChat: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSpecialization: string;
  setSelectedSpecialization: (specialization: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => {
      const updatedAppointments = [...prev, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      return updatedAppointments;
    });
  };

  const addChatMessage = (messageData: Omit<ChatMessage, 'id'>) => {
    const newMessage: ChatMessage = {
      ...messageData,
      id: Date.now().toString(),
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        setDoctors,
        appointments,
        setAppointments,
        chatMessages,
        addAppointment,
        addChatMessage,
        clearChat,
        searchQuery,
        setSearchQuery,
        selectedSpecialization,
        setSelectedSpecialization,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};