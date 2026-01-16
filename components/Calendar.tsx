import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Video, Plus } from 'lucide-react';
import { Button } from './ui/button';
import type { UserRole, Screen } from '@/types';

interface CalendarProps {
  role: UserRole;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  onJoinCall?: (sessionId: number, volunteerName: string, topic: string) => void;
}

export function Calendar({ role, onBack, onNavigate, onJoinCall }: CalendarProps) {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setSessions(bookings);
  }, []);

  const handleJoinSession = (session: any) => {
    if (onJoinCall) {
      onJoinCall(session.id, session.volunteer, session.topic);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
      <button
        onClick={onBack}
        className="flex items-center text-slate-600 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Volver
      </button>

      <div className="mb-6">
        <h2 className="text-slate-800 mb-2">Calendario</h2>
        <p className="text-slate-600">Tus sesiones programadas</p>
      </div>

      {/* Calendar Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-slate-800">Hoy</div>
              <div className="text-sm text-slate-600">
                {new Date().toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl text-slate-800">{sessions.length}</div>
            <div className="text-sm text-slate-600">Sesiones</div>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <div className="text-center py-8 mb-6">
          <CalendarIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No hay sesiones programadas</p>
          <p className="text-slate-500 text-sm">Busca voluntarios y agenda tu primera sesión</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-slate-50 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-slate-800 mb-1">{session.volunteer}</h4>
                  <p className="text-slate-600 text-sm">{session.topic}</p>
                </div>
                <span className={`px-3 py-1 bg-${session.color}-100 text-${session.color}-700 rounded-full text-xs`}>
                  {session.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-600 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(session.date).toLocaleDateString('es-PA', { day: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{session.time}</span>
                </div>
              </div>

              <Button
                onClick={() => handleJoinSession(session)}
                className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm"
              >
                <Video className="h-4 w-4 mr-2" />
                Unirse
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add Session */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-4 text-center border-2 border-dashed border-emerald-200">
        <CalendarIcon className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
        <h4 className="text-slate-800 mb-1">¿Más sesiones?</h4>
        <p className="text-slate-600 text-sm mb-3">
          Busca voluntarios y agenda
        </p>
        <Button
          onClick={() => onNavigate('search')}
          className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-10 text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Reservar
        </Button>
      </div>
    </div>
  );
}