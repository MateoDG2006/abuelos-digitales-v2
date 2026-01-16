import { useState } from 'react';
import { Calendar, Clock, X, Check } from 'lucide-react';
import { Button } from './ui/button';

interface BookingModalProps {
  volunteer: {
    id: number;
    name: string;
    avatar: string;
    specialty: string;
  };
  onConfirm: (date: string, time: string) => void;
  onClose: () => void;
}

export function BookingModal({ volunteer, onConfirm, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableDates = [
    '2025-01-20',
    '2025-01-22',
    '2025-01-24',
    '2025-01-27',
    '2025-01-29',
  ];

  const availableTimes = [
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PA', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short'
    });
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800">Reservar Sesión</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Volunteer Info */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{volunteer.avatar}</div>
            <div>
              <h4 className="text-slate-800">{volunteer.name}</h4>
              <p className="text-slate-600 text-sm">{volunteer.specialty}</p>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="flex items-center text-slate-700 mb-3">
            <Calendar className="h-5 w-5 text-slate-400 mr-2" />
            Selecciona una fecha
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-xl border-2 text-sm transition-all ${
                  selectedDate === date
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-6">
          <label className="flex items-center text-slate-700 mb-3">
            <Clock className="h-5 w-5 text-slate-400 mr-2" />
            Selecciona una hora
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={!selectedDate}
                className={`p-3 rounded-xl border-2 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedTime === time
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl disabled:opacity-50"
          >
            <Check className="h-5 w-5 mr-2" />
            Confirmar Reserva
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full h-10 rounded-xl text-slate-600"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
