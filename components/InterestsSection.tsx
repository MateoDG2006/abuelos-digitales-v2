import { useState } from 'react';
import { Edit2, Check, X, Heart, Users, Code, MessageCircle, Camera, Music, BookOpen, Gamepad2, Globe } from 'lucide-react';
import { Button } from './ui/button';

interface Interest {
  id: string;
  name: string;
  category: 'social' | 'technical' | 'soft-skills' | 'hobbies';
  icon?: string;
}

interface InterestsSectionProps {
  interests: Interest[];
  isEditable?: boolean;
  onUpdate?: (interests: Interest[]) => void;
}

const availableInterests: Interest[] = [
  // Redes Sociales
  { id: 'facebook', name: 'Facebook', category: 'social', icon: '📘' },
  { id: 'instagram', name: 'Instagram', category: 'social', icon: '📷' },
  { id: 'whatsapp', name: 'WhatsApp', category: 'social', icon: '💬' },
  { id: 'twitter', name: 'Twitter/X', category: 'social', icon: '🐦' },
  { id: 'linkedin', name: 'LinkedIn', category: 'social', icon: '💼' },
  { id: 'tiktok', name: 'TikTok', category: 'social', icon: '🎵' },
  
  // Habilidades Técnicas
  { id: 'email', name: 'Email y Gmail', category: 'technical', icon: '📧' },
  { id: 'video-calls', name: 'Videollamadas', category: 'technical', icon: '📹' },
  { id: 'online-shopping', name: 'Compras Online', category: 'technical', icon: '🛒' },
  { id: 'banking', name: 'Banca Digital', category: 'technical', icon: '🏦' },
  { id: 'cloud-storage', name: 'Almacenamiento en la Nube', category: 'technical', icon: '☁️' },
  { id: 'smartphone', name: 'Uso de Smartphone', category: 'technical', icon: '📱' },
  
  // Habilidades Blandas
  { id: 'communication', name: 'Comunicación', category: 'soft-skills', icon: '💬' },
  { id: 'patience', name: 'Paciencia', category: 'soft-skills', icon: '🧘' },
  { id: 'teaching', name: 'Enseñanza', category: 'soft-skills', icon: '📚' },
  { id: 'listening', name: 'Escucha Activa', category: 'soft-skills', icon: '👂' },
  { id: 'empathy', name: 'Empatía', category: 'soft-skills', icon: '❤️' },
  { id: 'adaptability', name: 'Adaptabilidad', category: 'soft-skills', icon: '🔄' },
  
  // Hobbies e Intereses
  { id: 'photography', name: 'Fotografía', category: 'hobbies', icon: '📸' },
  { id: 'music', name: 'Música', category: 'hobbies', icon: '🎵' },
  { id: 'reading', name: 'Lectura', category: 'hobbies', icon: '📖' },
  { id: 'cooking', name: 'Cocina', category: 'hobbies', icon: '👨‍🍳' },
  { id: 'travel', name: 'Viajes', category: 'hobbies', icon: '✈️' },
  { id: 'sports', name: 'Deportes', category: 'hobbies', icon: '⚽' },
  { id: 'gardening', name: 'Jardinería', category: 'hobbies', icon: '🌱' },
  { id: 'crafts', name: 'Manualidades', category: 'hobbies', icon: '🎨' },
];

const categoryLabels = {
  social: 'Redes Sociales',
  technical: 'Habilidades Técnicas',
  'soft-skills': 'Habilidades Blandas',
  hobbies: 'Hobbies e Intereses',
};

const categoryIcons = {
  social: MessageCircle,
  technical: Code,
  'soft-skills': Users,
  hobbies: Heart,
};

export function InterestsSection({ interests, isEditable = false, onUpdate }: InterestsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(interests);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(selectedInterests);
    }
    setIsEditing(false);
    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.interests = selectedInterests;
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleCancel = () => {
    setSelectedInterests(interests);
    setIsEditing(false);
  };

  const toggleInterest = (interest: Interest) => {
    if (selectedInterests.find(i => i.id === interest.id)) {
      setSelectedInterests(selectedInterests.filter(i => i.id !== interest.id));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const groupedInterests = availableInterests.reduce((acc, interest) => {
    if (!acc[interest.category]) {
      acc[interest.category] = [];
    }
    acc[interest.category].push(interest);
    return acc;
  }, {} as Record<string, Interest[]>);

  if (isEditing) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800">Mis Intereses</h3>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
            >
              <Check className="h-4 w-4 mr-1" />
              Guardar
            </Button>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="outline"
              className="h-8 px-3 rounded-xl"
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
          </div>
        </div>

        {Object.entries(groupedInterests).map(([category, categoryInterests]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons];
          return (
            <div key={category} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-slate-600" />
                <h4 className="text-slate-700 text-sm font-medium">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryInterests.map((interest) => {
                  const isSelected = selectedInterests.find(i => i.id === interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="mr-1">{interest.icon}</span>
                      {interest.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-800">Intereses</h3>
        {isEditable && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Edit2 className="h-4 w-4 text-slate-600" />
          </button>
        )}
      </div>

      {interests.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-xl">
          <p className="text-slate-500 text-sm mb-2">No hay intereses seleccionados</p>
          {isEditable && (
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
              className="h-8 rounded-xl"
            >
              Agregar Intereses
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(groupedInterests).map(([category, categoryInterests]) => {
            const userInterestsInCategory = interests.filter(i =>
              categoryInterests.some(ci => ci.id === i.id)
            );
            
            if (userInterestsInCategory.length === 0) return null;
            
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <div key={category} className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-slate-600" />
                  <h4 className="text-slate-700 text-xs font-medium">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userInterestsInCategory.map((interest) => (
                    <span
                      key={interest.id}
                      className="px-3 py-1 bg-white text-slate-700 rounded-full text-xs border border-slate-200"
                    >
                      <span className="mr-1">{interest.icon}</span>
                      {interest.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

