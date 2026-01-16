import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';

export function Calendar() {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);

  const sessions = [
    {
      id: 1,
      volunteer: 'María García',
      topic: 'WhatsApp Básico',
      date: '16 Enero, 2025',
      time: '14:00 - 15:00',
      status: 'upcoming',
      type: 'WhatsApp',
    },
    {
      id: 2,
      volunteer: 'Rosa Martínez',
      topic: 'Facebook Intermedio',
      date: '18 Enero, 2025',
      time: '15:00 - 16:00',
      status: 'scheduled',
      type: 'Facebook',
    },
    {
      id: 3,
      volunteer: 'Carmen López',
      topic: 'Email Básico',
      date: '20 Enero, 2025',
      time: '12:00 - 13:00',
      status: 'pending',
      type: 'Email',
    },
  ];

  const availableSlots = [
    { day: 'Lunes', time: '10:00 - 11:00', available: true },
    { day: 'Lunes', time: '14:00 - 15:00', available: true },
    { day: 'Martes', time: '10:00 - 11:00', available: false },
    { day: 'Martes', time: '15:00 - 16:00', available: true },
    { day: 'Miércoles', time: '10:00 - 11:00', available: true },
    { day: 'Miércoles', time: '14:00 - 15:00', available: true },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { label: 'Próxima', color: 'emerald', icon: CheckCircle };
      case 'scheduled':
        return { label: 'Programada', color: 'blue', icon: CalendarIcon };
      case 'pending':
        return { label: 'Por confirmar', color: 'amber', icon: AlertCircle };
      default:
        return { label: status, color: 'slate', icon: CalendarIcon };
    }
  };

  const handleJoinSession = (session: any) => {
    toast.success(`Uniéndose a la sesión con ${session.volunteer}...`);
  };

  const handleBookSlot = (slot: any) => {
    if (!slot.available) {
      toast.error('Este horario no está disponible');
      return;
    }
    toast.success(`Sesión reservada para ${slot.day} a las ${slot.time}`);
    setShowBooking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-slate-800 mb-2">Calendario</h1>
          <p className="text-slate-600 text-lg">Gestiona tus sesiones de aprendizaje</p>
        </div>

        {/* Calendar Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <div className="text-slate-800">Hoy</div>
                <div className="text-sm text-slate-600">16 Enero, 2025</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-slate-800">1</div>
              <div className="text-sm text-slate-600">Día</div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800">Sesiones Programadas</h3>
            <Button
              onClick={() => setShowBooking(true)}
              className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-10"
            >
              <Plus className="h-5 w-5 mr-2" />
              Reservar
            </Button>
          </div>

          <div className="space-y-4">
            {sessions.map((session) => {
              const statusConfig = getStatusConfig(session.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-slate-800 mb-1">{session.volunteer}</h4>
                      <p className="text-slate-600">{session.topic}</p>
                    </div>
                    <span className={`px-3 py-1 bg-${statusConfig.color}-100 text-${statusConfig.color}-700 rounded-full text-sm flex items-center gap-1`}>
                      <StatusIcon className="h-4 w-4" />
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="text-sm">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{session.time}</span>
                    </div>
                  </div>

                  {session.status === 'upcoming' && (
                    <Button
                      onClick={() => handleJoinSession(session)}
                      className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                    >
                      <Video className="h-5 w-5 mr-2" />
                      Unirse a Sesión
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Need more sessions */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 text-center border-2 border-dashed border-emerald-200">
          <CalendarIcon className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
          <h4 className="text-slate-800 mb-2">¿Necesitas más sesiones?</h4>
          <p className="text-slate-600 mb-4">
            Busca nuevos voluntarios y programa más clases
          </p>
          <Button
            onClick={() => setShowBooking(true)}
            className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-12"
          >
            Buscar Horarios Disponibles
          </Button>
        </div>

        {/* Booking Dialog */}
        <Dialog open={showBooking} onOpenChange={setShowBooking}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Reservar Nueva Sesión</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleBookSlot(slot)}
                  disabled={!slot.available}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    slot.available
                      ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 cursor-pointer'
                      : 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-800">{slot.day}</div>
                      <div className="text-sm text-slate-600">{slot.time}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      slot.available
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {slot.available ? 'Disponible' : 'Ocupado'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
