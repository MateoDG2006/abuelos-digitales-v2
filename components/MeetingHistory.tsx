import { ArrowLeft, Calendar, Clock, Star, MessageCircle } from 'lucide-react';
import type { UserRole } from '@/types';

interface Meeting {
  id: number;
  volunteer: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  rating?: number;
  comment?: string;
}

interface MeetingHistoryProps {
  role: UserRole;
  onBack: () => void;
}

export function MeetingHistory({ role, onBack }: MeetingHistoryProps) {
  // Get meetings from localStorage
  const meetings: Meeting[] = JSON.parse(localStorage.getItem('meetingHistory') || '[]');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PA', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
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
        <h2 className="text-slate-800 mb-2">Historial</h2>
        <p className="text-slate-600">Tus sesiones completadas</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <div className="text-2xl text-emerald-700 mb-1">{meetings.length}</div>
          <div className="text-xs text-slate-600">Sesiones</div>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <div className="text-2xl text-amber-700 mb-1">
            {meetings.length > 0
              ? (
                  meetings.reduce((sum, m) => sum + (m.rating || 0), 0) /
                  meetings.filter((m) => m.rating).length
                ).toFixed(1)
              : '0.0'}
          </div>
          <div className="text-xs text-slate-600">Rating</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <div className="text-2xl text-blue-700 mb-1">
            {meetings.reduce((sum, m) => {
              const [hours] = m.duration.split(':').map(Number);
              return sum + hours;
            }, 0)}h
          </div>
          <div className="text-xs text-slate-600">Horas</div>
        </div>
      </div>

      {/* Meetings List */}
      {meetings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No hay reuniones aún</p>
          <p className="text-slate-500 text-sm">
            Tus sesiones completadas aparecerán aquí
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-slate-50 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-slate-800 mb-1">{meeting.volunteer}</h4>
                  <p className="text-slate-600 text-sm">{meeting.topic}</p>
                </div>
                {meeting.rating && (
                  <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
                    <span className="text-amber-700 text-sm">{meeting.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-slate-600 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(meeting.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meeting.duration}</span>
                </div>
              </div>

              {meeting.comment && (
                <div className="bg-white rounded-xl p-3 border border-slate-200">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="h-4 w-4 text-slate-400 mt-0.5" />
                    <p className="text-slate-700 text-sm">{meeting.comment}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
