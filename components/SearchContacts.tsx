import { useState } from 'react';
import { ArrowLeft, Search, Star, MapPin, Clock, MessageCircle, Calendar, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BookingModal } from './BookingModal';
import { PublicProfile } from './PublicProfile';
import type { UserRole } from '@/types';

interface SearchContactsProps {
  role: UserRole;
  onBack: () => void;
  onNavigate?: (screen: string, params?: any) => void;
}

export function SearchContacts({ role, onBack, onNavigate }: SearchContactsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPublicProfile, setShowPublicProfile] = useState(false);

  const volunteers = [
    {
      id: 1,
      name: 'María García',
      avatar: '👩',
      rating: 4.8,
      sessions: 24,
      specialty: 'WhatsApp y Redes',
      location: 'Panamá',
      availability: 'Lun, Mié, Vie',
      skills: ['WhatsApp', 'Facebook'],
      interests: [
        { id: 'whatsapp', name: 'WhatsApp', category: 'social', icon: '💬' },
        { id: 'facebook', name: 'Facebook', category: 'social', icon: '📘' },
        { id: 'instagram', name: 'Instagram', category: 'social', icon: '📷' },
        { id: 'communication', name: 'Comunicación', category: 'soft-skills', icon: '💬' },
        { id: 'patience', name: 'Paciencia', category: 'soft-skills', icon: '🧘' },
        { id: 'photography', name: 'Fotografía', category: 'hobbies', icon: '📸' },
      ],
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      avatar: '👨',
      rating: 4.9,
      sessions: 35,
      specialty: 'Email y Video',
      location: 'San Miguelito',
      availability: 'Mar, Jue, Sáb',
      skills: ['Email', 'Zoom'],
      interests: [
        { id: 'email', name: 'Email y Gmail', category: 'technical', icon: '📧' },
        { id: 'video-calls', name: 'Videollamadas', category: 'technical', icon: '📹' },
        { id: 'teaching', name: 'Enseñanza', category: 'soft-skills', icon: '📚' },
        { id: 'listening', name: 'Escucha Activa', category: 'soft-skills', icon: '👂' },
        { id: 'music', name: 'Música', category: 'hobbies', icon: '🎵' },
      ],
    },
    {
      id: 3,
      name: 'Rosa Martínez',
      avatar: '👵',
      rating: 4.7,
      sessions: 18,
      specialty: 'Facebook y Redes Sociales',
      location: 'Colón',
      availability: 'Lun, Mar, Mié',
      skills: ['Facebook', 'Instagram'],
      interests: [
        { id: 'facebook', name: 'Facebook', category: 'social', icon: '📘' },
        { id: 'instagram', name: 'Instagram', category: 'social', icon: '📷' },
        { id: 'communication', name: 'Comunicación', category: 'soft-skills', icon: '💬' },
      ],
    },
    {
      id: 4,
      name: 'Pedro López',
      avatar: '👨‍💼',
      rating: 5.0,
      sessions: 42,
      specialty: 'Email y Comunicación Digital',
      location: 'David',
      availability: 'Jue, Vie, Sáb',
      skills: ['Email', 'Gmail'],
      interests: [
        { id: 'email', name: 'Email y Gmail', category: 'technical', icon: '📧' },
        { id: 'communication', name: 'Comunicación', category: 'soft-skills', icon: '💬' },
        { id: 'teaching', name: 'Enseñanza', category: 'soft-skills', icon: '📚' },
      ],
    },
  ];

  const handleBooking = (date: string, time: string) => {
    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      volunteer: selectedVolunteer.name,
      topic: selectedVolunteer.specialty,
      date,
      time,
      status: 'programada',
      color: 'blue',
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    setShowBookingModal(false);
    setSelectedVolunteer(null);
    alert('¡Sesión reservada exitosamente!');
  };

  const handleViewProfile = (volunteer: any) => {
    setSelectedVolunteer(volunteer);
    setShowPublicProfile(true);
  };

  const handleStartChat = (volunteer: any) => {
    // Check if conversation already exists
    const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    let conversation = conversations.find((c: any) => c.contactId === `vol-${volunteer.id}`);
    
    if (!conversation) {
      // Create new conversation
      conversation = {
        id: `conv-${volunteer.id}`,
        contactId: `vol-${volunteer.id}`,
        contactName: volunteer.name,
        contactAvatar: volunteer.avatar,
        lastMessage: 'Conversación iniciada',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        isOnline: true,
      };
      conversations.push(conversation);
      localStorage.setItem('conversations', JSON.stringify(conversations));
      
      // Initialize empty messages array
      localStorage.setItem(`messages_${conversation.id}`, JSON.stringify([]));
    }
    
    // Navigate to chat
    if (onNavigate) {
      onNavigate('chat', {
        conversationId: conversation.id,
        contactName: volunteer.name,
        contactAvatar: volunteer.avatar,
      });
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
        <h2 className="text-slate-800 mb-2">Buscar Voluntarios</h2>
        <p className="text-slate-600">Encuentra tu tutor perfecto</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['Todos', 'WhatsApp', 'Facebook', 'Email'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm transition-all ${
              selectedFilter === filter
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {volunteers
          .filter((volunteer) => {
            // Filter by search query
            const matchesSearch = 
              volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              volunteer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
              volunteer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

            // Filter by selected filter
            const matchesFilter = 
              selectedFilter === 'Todos' ||
              volunteer.skills.some(skill => 
                skill.toLowerCase().includes(selectedFilter.toLowerCase())
              ) ||
              volunteer.specialty.toLowerCase().includes(selectedFilter.toLowerCase());

            return matchesSearch && matchesFilter;
          })
          .map((volunteer) => (
          <div
            key={volunteer.id}
            className="bg-slate-50 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="text-4xl">{volunteer.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-slate-800 text-sm">{volunteer.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-slate-700 text-sm">{volunteer.rating}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-2">{volunteer.specialty}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {volunteer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{volunteer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{volunteer.availability}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleViewProfile(volunteer)}
                variant="outline"
                className="h-10 rounded-xl text-sm"
              >
                <User className="h-4 w-4 mr-1" />
                Ver
              </Button>
              <Button
                onClick={() => handleStartChat(volunteer)}
                variant="outline"
                className="h-10 rounded-xl text-sm"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Button>
              <Button
                onClick={() => {
                  setSelectedVolunteer(volunteer);
                  setShowBookingModal(true);
                }}
                className="h-10 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Reservar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Public Profile Modal */}
      {showPublicProfile && selectedVolunteer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-sm">
            <PublicProfile
              volunteer={selectedVolunteer}
              onBack={() => {
                setShowPublicProfile(false);
                setSelectedVolunteer(null);
              }}
              onStartChat={() => {
                setShowPublicProfile(false);
                handleStartChat(selectedVolunteer);
              }}
              onBookSession={() => {
                setShowPublicProfile(false);
                setShowBookingModal(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedVolunteer && (
        <BookingModal
          volunteer={selectedVolunteer}
          onConfirm={handleBooking}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedVolunteer(null);
          }}
        />
      )}
    </div>
  );
}