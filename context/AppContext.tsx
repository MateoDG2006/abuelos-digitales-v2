"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { UserRole, Screen } from "@/types";
import { initializeMockData } from "@/utils/mockData";

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  currentCall: {
    sessionId: number;
    volunteerName: string;
    topic: string;
  } | null;
  setCurrentCall: (call: {
    sessionId: number;
    volunteerName: string;
    topic: string;
  } | null) => void;
  showRatingModal: boolean;
  setShowRatingModal: (show: boolean) => void;
  completedSession: {
    sessionId: number;
    volunteerName: string;
    topic: string;
  } | null;
  setCompletedSession: (session: {
    sessionId: number;
    volunteerName: string;
    topic: string;
  } | null) => void;
  currentChat: {
    conversationId: string;
    contactName: string;
    contactAvatar: string;
  } | null;
  setCurrentChat: (chat: {
    conversationId: string;
    contactName: string;
    contactAvatar: string;
  } | null) => void;
  handleRoleSelect: (role: UserRole) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  handleJoinCall: (sessionId: number, volunteerName: string, topic: string) => void;
  handleEndCall: (sessionId: number) => void;
  handleSubmitRating: (rating: number, comment: string) => void;
  handleSkipRating: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentCall, setCurrentCall] = useState<{
    sessionId: number;
    volunteerName: string;
    topic: string;
  } | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [completedSession, setCompletedSession] = useState<{
    sessionId: number;
    volunteerName: string;
    topic: string;
  } | null>(null);
  const [currentChat, setCurrentChat] = useState<{
    conversationId: string;
    contactName: string;
    contactAvatar: string;
  } | null>(null);

  // Initialize mock data on mount
  useEffect(() => {
    initializeMockData();
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentScreen("role-explanation");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    if (selectedRole === "elderly") {
      setCurrentScreen("tutorial");
    } else {
      setCurrentScreen("dashboard");
    }
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    if (selectedRole === "elderly") {
      setCurrentScreen("tutorial");
    } else {
      setCurrentScreen("dashboard");
    }
  };

  const handleJoinCall = (sessionId: number, volunteerName: string, topic: string) => {
    setCurrentCall({ sessionId, volunteerName, topic });
    setCurrentScreen("video-call");
  };

  const handleEndCall = (sessionId: number) => {
    const session = currentCall;
    setCurrentCall(null);
    setCompletedSession(session);
    setShowRatingModal(true);
    setCurrentScreen("dashboard");
  };

  const handleSubmitRating = (rating: number, comment: string) => {
    if (completedSession && typeof window !== 'undefined') {
      // Save to meeting history
      const history = JSON.parse(localStorage.getItem('meetingHistory') || '[]');
      const newMeeting = {
        id: Date.now(),
        volunteer: completedSession.volunteerName,
        topic: completedSession.topic,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' }),
        duration: '1:00',
        rating,
        comment,
      };
      history.push(newMeeting);
      localStorage.setItem('meetingHistory', JSON.stringify(history));

      // Remove from bookings
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = bookings.filter((b: any) => b.id !== completedSession.sessionId);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
    setShowRatingModal(false);
    setCompletedSession(null);
  };

  const handleSkipRating = () => {
    if (completedSession && typeof window !== 'undefined') {
      // Save to meeting history without rating
      const history = JSON.parse(localStorage.getItem('meetingHistory') || '[]');
      const newMeeting = {
        id: Date.now(),
        volunteer: completedSession.volunteerName,
        topic: completedSession.topic,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' }),
        duration: '1:00',
      };
      history.push(newMeeting);
      localStorage.setItem('meetingHistory', JSON.stringify(history));

      // Remove from bookings
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = bookings.filter((b: any) => b.id !== completedSession.sessionId);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
    setShowRatingModal(false);
    setCompletedSession(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedRole,
        setSelectedRole,
        isLoggedIn,
        setIsLoggedIn,
        currentCall,
        setCurrentCall,
        showRatingModal,
        setShowRatingModal,
        completedSession,
        setCompletedSession,
        currentChat,
        setCurrentChat,
        handleRoleSelect,
        handleLogin,
        handleRegister,
        handleJoinCall,
        handleEndCall,
        handleSubmitRating,
        handleSkipRating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
