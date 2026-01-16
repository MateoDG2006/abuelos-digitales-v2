"use client";

import { useApp } from "@/context/AppContext";
import type { Screen } from "@/types";
import { Welcome } from "./Welcome";
import { Onboarding } from "./Onboarding";
import { RoleSelection } from "./RoleSelection";
import { RoleExplanation } from "./RoleExplanation";
import { Register } from "./Register";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Calendar } from "./Calendar";
import { Profile } from "./Profile";
import { SearchContacts } from "./SearchContacts";
import { Tutorial } from "./Tutorial";
import { Settings } from "./Settings";
import { VideoCall } from "./VideoCall";
import { MeetingHistory } from "./MeetingHistory";
import { RatingModal } from "./RatingModal";
import { ChatList } from "./ChatList";
import { Chat } from "./Chat";
import { Help } from "./Help";

export function AppNavigator() {
  const {
    currentScreen,
    setCurrentScreen,
    selectedRole,
    setSelectedRole,
    setIsLoggedIn,
    handleRoleSelect,
    handleLogin,
    handleRegister,
    handleJoinCall,
    handleEndCall,
    currentCall,
    showRatingModal,
    completedSession,
    handleSubmitRating,
    handleSkipRating,
    currentChat,
    setCurrentChat,
  } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <Welcome
            onGetStarted={() => setCurrentScreen("onboarding")}
          />
        );

      case "onboarding":
        return (
          <Onboarding
            onComplete={() => setCurrentScreen("role-selection")}
          />
        );

      case "role-selection":
        return (
          <RoleSelection
            onSelectRole={handleRoleSelect}
            onLogin={() => setCurrentScreen("login")}
          />
        );

      case "role-explanation":
        return (
          <RoleExplanation
            role={selectedRole}
            onContinue={() => setCurrentScreen("register")}
            onBack={() => setCurrentScreen("role-selection")}
          />
        );

      case "register":
        return (
          <Register
            role={selectedRole}
            onRegister={handleRegister}
            onBack={() => setCurrentScreen("role-explanation")}
          />
        );

      case "login":
        return (
          <Login
            onLogin={handleLogin}
            onBack={() => setCurrentScreen("role-selection")}
          />
        );

      case "tutorial":
        return (
          <Tutorial
            onComplete={() => setCurrentScreen("dashboard")}
          />
        );

      case "dashboard":
        return (
          <Dashboard
            role={selectedRole}
            onNavigate={setCurrentScreen}
          />
        );

      case "calendar":
        return (
          <Calendar
            role={selectedRole}
            onBack={() => setCurrentScreen("dashboard")}
            onNavigate={setCurrentScreen}
            onJoinCall={handleJoinCall}
          />
        );

      case "profile":
        return (
          <Profile
            role={selectedRole}
            onBack={() => setCurrentScreen("dashboard")}
            onLogout={() => {
              setIsLoggedIn(false);
              setSelectedRole(null);
              setCurrentScreen("welcome");
            }}
            onNavigate={setCurrentScreen}
          />
        );

      case "search":
        return (
          <SearchContacts
            role={selectedRole}
            onBack={() => setCurrentScreen("dashboard")}
            onNavigate={(screen, params) => {
              if (screen === 'chat' && params) {
                setCurrentChat({
                  conversationId: params.conversationId,
                  contactName: params.contactName,
                  contactAvatar: params.contactAvatar,
                });
                setCurrentScreen('chat');
              } else {
                setCurrentScreen(screen as Screen);
              }
            }}
          />
        );

      case "settings":
        return (
          <Settings
            role={selectedRole}
            onBack={() => setCurrentScreen("profile")}
          />
        );

      case "video-call":
        return currentCall ? (
          <VideoCall
            role={selectedRole}
            sessionId={currentCall.sessionId}
            volunteerName={currentCall.volunteerName}
            topic={currentCall.topic}
            onEndCall={handleEndCall}
          />
        ) : null;

      case "history":
        return (
          <MeetingHistory
            role={selectedRole}
            onBack={() => setCurrentScreen("profile")}
          />
        );

      case "chat-list":
        return (
          <ChatList
            role={selectedRole}
            onBack={() => setCurrentScreen("dashboard")}
            onSelectConversation={(conversationId, contactName, contactAvatar) => {
              setCurrentChat({ conversationId, contactName, contactAvatar });
              setCurrentScreen("chat");
            }}
          />
        );

      case "chat":
        return currentChat ? (
          <Chat
            role={selectedRole}
            conversationId={currentChat.conversationId}
            contactName={currentChat.contactName}
            contactAvatar={currentChat.contactAvatar}
            onBack={() => setCurrentScreen("chat-list")}
          />
        ) : null;

      case "help":
        return (
          <Help
            role={selectedRole}
            onBack={() => setCurrentScreen("profile")}
          />
        );

      default:
        return (
          <Welcome
            onGetStarted={() => setCurrentScreen("onboarding")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">{renderScreen()}</div>
      
      {/* Rating Modal */}
      {showRatingModal && completedSession && (
        <RatingModal
          volunteerName={completedSession.volunteerName}
          topic={completedSession.topic}
          onSubmit={handleSubmitRating}
          onSkip={handleSkipRating}
        />
      )}
    </div>
  );
}
