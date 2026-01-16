import { useState } from 'react';
import { Search as SearchIcon, Star, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  const volunteers = [
    {
      id: 1,
      name: 'María García',
      avatar: '👩',
      rating: 4.8,
      sessions: 24,
      specialty: 'WhatsApp y Redes Sociales',
      location: 'Ciudad de Panamá',
      availability: 'Lunes, Miércoles, Viernes',
      description: 'Paciente y amigable. Me encanta ayudar a adultos mayores a conectarse con sus familias.',
      skills: ['WhatsApp', 'Facebook', 'Instagram'],
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      avatar: '👨',
      rating: 4.9,
      sessions: 35,
      specialty: 'Email y Videollamadas',
      location: 'San Miguelito',
      availability: 'Martes, Jueves, Sábados',
      description: 'Ingeniero con pasión por enseñar. Explico las cosas de manera simple y clara.',
      skills: ['Email', 'Zoom', 'Google Meet'],
    },
    {
      id: 3,
      name: 'Ana Martínez',
      avatar: '👩',
      rating: 4.7,
      sessions: 18,
      specialty: 'Banca Digital y Pagos',
      location: 'Arraiján',
      availability: 'Lunes a Viernes',
      description: 'Especialista en finanzas. Te ayudo a usar la banca en línea de forma segura.',
      skills: ['Yappy', 'Nequi', 'Banca Online'],
    },
    {
      id: 4,
      name: 'Luis González',
      avatar: '👨',
      rating: 5.0,
      sessions: 42,
      specialty: 'Smartphone Básico',
      location: 'Chorrera',
      availability: 'Fines de semana',
      description: 'Muy paciente y dedicado. Empezamos desde cero, sin apuros.',
      skills: ['iPhone', 'Android', 'Configuración'],
    },
  ];

  const filteredVolunteers = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleContact = (volunteer: any) => {
    toast.success(`Enviando mensaje a ${volunteer.name}...`);
  };

  const handleBookSession = (volunteer: any) => {
    toast.success(`Reservando sesión con ${volunteer.name}...`);
    setSelectedVolunteer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-slate-800 mb-2">Buscar Voluntarios</h1>
          <p className="text-slate-600 text-lg">Encuentra el tutor perfecto para ti</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre o habilidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-xl text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['Todos', 'WhatsApp', 'Facebook', 'Email', 'Videollamadas', 'Banca'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-xl whitespace-nowrap ${
                filter === 'Todos'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-slate-600">
          {filteredVolunteers.length} voluntario{filteredVolunteers.length !== 1 ? 's' : ''} encontrado{filteredVolunteers.length !== 1 ? 's' : ''}
        </div>

        {/* Volunteers List */}
        <div className="space-y-4">
          {filteredVolunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedVolunteer(volunteer)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{volunteer.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-slate-800">{volunteer.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <span className="text-slate-700">{volunteer.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-2">{volunteer.specialty}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {volunteer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{volunteer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{volunteer.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{volunteer.sessions} sesiones completadas</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVolunteer(volunteer);
                }}
              >
                Ver Perfil
              </Button>
            </div>
          ))}
        </div>

        {/* Volunteer Details Dialog */}
        <Dialog open={!!selectedVolunteer} onOpenChange={() => setSelectedVolunteer(null)}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            {selectedVolunteer && (
              <>
                <DialogHeader>
                  <DialogTitle>Perfil del Voluntario</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-3">{selectedVolunteer.avatar}</div>
                    <h3 className="text-slate-800 mb-1">{selectedVolunteer.name}</h3>
                    <p className="text-slate-600">{selectedVolunteer.specialty}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                        <span className="text-lg">{selectedVolunteer.rating}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{selectedVolunteer.sessions} sesiones</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-800 mb-2">Sobre mí</h4>
                    <p className="text-slate-600">{selectedVolunteer.description}</p>
                  </div>

                  <div>
                    <h4 className="text-slate-800 mb-2">Habilidades</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVolunteer.skills.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-800 mb-2">Disponibilidad</h4>
                    <div className="space-y-2 text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>{selectedVolunteer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>{selectedVolunteer.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleContact(selectedVolunteer)}
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Mensaje
                    </Button>
                    <Button
                      onClick={() => handleBookSession(selectedVolunteer)}
                      className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Reservar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
