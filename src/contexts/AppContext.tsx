import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment, ChatMessage } from '../types';
import { mockDoctors } from '../data/mockData';

interface AppContextType {
  doctors: Doctor[];
  appointments: Appointment[];
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
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
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
        appointments,
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