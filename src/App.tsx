import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import Chat from './pages/Chat';
import About from './pages/About';
import PageTransition from './components/common/PageTransition';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/doctors" element={<PageTransition><Doctors /></PageTransition>} />
              <Route path="/doctors/:id" element={<PageTransition><DoctorProfile /></PageTransition>} />
              <Route path="/book/:id" element={<PageTransition><BookAppointment /></PageTransition>} />
              <Route path="/appointments" element={<PageTransition><Appointments /></PageTransition>} />
              <Route path="/chat" element={<PageTransition><Chat /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="*" element={<PageTransition><Home /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;