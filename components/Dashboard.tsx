import { useState } from 'react';
import { Calendar, User, Search, Settings, Clock, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { QuickActionTutorial } from './QuickActionTutorial';
import type { UserRole, Screen } from '@/types';

interface DashboardProps {
  role: UserRole;
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ role, onNavigate }: DashboardProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isElderly = role === 'elderly';
  const [showTutorial, setShowTutorial] = useState<{
    action: 'calendar' | 'search' | 'messages' | 'profile';
    targetScreen: Screen;
  } | null>(null);

  const handleQuickAction = (action: 'calendar' | 'search' | 'messages' | 'profile', screen: Screen) => {
    // Check if user has seen tutorial for this action
    const tutorialKey = `tutorial_${action}_seen`;
    const hasSeenTutorial = localStorage.getItem(tutorialKey) === 'true';

    if (hasSeenTutorial) {
      // Navigate directly if tutorial was already seen
      onNavigate(screen);
    } else {
      // Show tutorial first
      setShowTutorial({ action, targetScreen: screen });
    }
  };

  const handleTutorialContinue = () => {
    if (showTutorial) {
      // Mark tutorial as seen
      localStorage.setItem(`tutorial_${showTutorial.action}_seen`, 'true');
      // Navigate to the target screen
      onNavigate(showTutorial.targetScreen);
      // Close tutorial
      setShowTutorial(null);
    }
  };

  const handleTutorialClose = () => {
    if (showTutorial) {
      // Mark tutorial as seen even if closed
      localStorage.setItem(`tutorial_${showTutorial.action}_seen`, 'true');
      setShowTutorial(null);
    }
  };

  const upcomingSessions = [
    {
      id: 1,
      name: 'María García',
      topic: 'WhatsApp Básico',
      date: '16 Enero',
      time: '14:00',
    },
    {
      id: 2,
      name: 'Rosa Martínez',
      topic: 'Facebook',
      date: '18 Enero',
      time: '15:00',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-slate-800">¡Hola! 👋</h2>
          <p className="text-slate-600">
            {isElderly ? 'Continúa aprendiendo' : 'Tienes sesiones hoy'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200"
        >
          <Settings className="h-6 w-6 text-slate-600" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <div className="text-2xl text-emerald-700 mb-1">24h</div>
          <div className="text-xs text-slate-600">Horas</div>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <div className="text-2xl text-amber-700 mb-1">4.8</div>
          <div className="text-xs text-slate-600">Rating</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <div className="text-2xl text-blue-700 mb-1">12</div>
          <div className="text-xs text-slate-600">Sesiones</div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-800">Próximas Sesiones</h3>
          <button
            onClick={() => onNavigate('calendar')}
            className="text-emerald-700 hover:text-emerald-800 text-sm"
          >
            Ver todas
          </button>
        </div>

        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="bg-slate-50 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 text-sm">{session.name}</h4>
                    <p className="text-slate-600 text-sm">{session.topic}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{session.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={() => handleQuickAction('calendar', 'calendar')}
          className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Calendar className="h-6 w-6 text-emerald-600" />
          <span className="text-xs text-slate-700">Calendario</span>
        </button>
        <button
          onClick={() => handleQuickAction('search', 'search')}
          className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Search className="h-6 w-6 text-blue-600" />
          <span className="text-xs text-slate-700">Buscar</span>
        </button>
        <button
          onClick={() => handleQuickAction('messages', 'chat-list')}
          className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 relative transition-colors"
        >
          <MessageCircle className="h-6 w-6 text-purple-600" />
          <span className="text-xs text-slate-700">Mensajes</span>
          {/* Unread badge */}
          <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-600 rounded-full"></span>
        </button>
        <button
          onClick={() => handleQuickAction('profile', 'profile')}
          className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <User className="h-6 w-6 text-purple-600" />
          <span className="text-xs text-slate-700">Perfil</span>
        </button>
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <QuickActionTutorial
          action={showTutorial.action}
          onClose={handleTutorialClose}
          onContinue={handleTutorialContinue}
        />
      )}
    </div>
  );
}