import { ArrowLeft, User, Phone, Star, MapPin, Clock, MessageCircle, Calendar, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { InterestsSection } from './InterestsSection';

interface Volunteer {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  sessions: number;
  specialty: string;
  location: string;
  availability: string;
  skills: string[];
  interests?: Array<{
    id: string;
    name: string;
    category: string;
    icon?: string;
  }>;
}

interface PublicProfileProps {
  volunteer: Volunteer;
  onBack: () => void;
  onStartChat?: () => void;
  onBookSession?: () => void;
}

export function PublicProfile({ volunteer, onBack, onStartChat, onBookSession }: PublicProfileProps) {
  const defaultInterests = volunteer.interests || [
    { id: 'whatsapp', name: 'WhatsApp', category: 'social', icon: '💬' },
    { id: 'facebook', name: 'Facebook', category: 'social', icon: '📘' },
    { id: 'email', name: 'Email y Gmail', category: 'technical', icon: '📧' },
    { id: 'communication', name: 'Comunicación', category: 'soft-skills', icon: '💬' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-slate-800 text-xl">Perfil del Voluntario</h2>
        </div>
      </div>

      {/* Profile Header */}
      <div className="text-center mb-6">
        <Avatar className="h-24 w-24 mx-auto mb-3">
          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white text-3xl">
            {volunteer.avatar || volunteer.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-slate-800 text-2xl mb-1">{volunteer.name}</h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span className="text-slate-700 font-medium">{volunteer.rating}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-600">{volunteer.sessions} sesiones</span>
        </div>
        <p className="text-emerald-700 font-medium">{volunteer.specialty}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <div className="text-2xl text-emerald-700 mb-1">{volunteer.rating}</div>
          <div className="text-xs text-slate-600">Calificación</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <div className="text-2xl text-blue-700 mb-1">{volunteer.sessions}</div>
          <div className="text-xs text-slate-600">Sesiones</div>
        </div>
      </div>

      {/* Location & Availability */}
      <div className="bg-slate-50 rounded-2xl p-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-slate-700">
            <MapPin className="h-5 w-5 text-slate-400" />
            <span className="text-sm">{volunteer.location}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Clock className="h-5 w-5 text-slate-400" />
            <span className="text-sm">Disponible: {volunteer.availability}</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-slate-800 mb-3">Habilidades</h3>
        <div className="flex flex-wrap gap-2">
          {volunteer.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <InterestsSection
        interests={defaultInterests}
        isEditable={false}
      />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button
          onClick={onStartChat}
          variant="outline"
          className="h-12 rounded-xl"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat
        </Button>
        <Button
          onClick={onBookSession}
          className="h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Reservar
        </Button>
      </div>
    </div>
  );
}

