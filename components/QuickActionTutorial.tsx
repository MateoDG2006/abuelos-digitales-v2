import { X, Calendar, Search, MessageCircle, User, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface QuickActionTutorialProps {
  action: 'calendar' | 'search' | 'messages' | 'profile';
  onClose: () => void;
  onContinue: () => void;
}

const tutorials = {
  calendar: {
    icon: Calendar,
    title: 'Calendario de Sesiones',
    description: 'Gestiona tus sesiones de aprendizaje',
    steps: [
      {
        text: 'Ve todas tus sesiones programadas en un solo lugar',
        icon: '📅',
      },
      {
        text: 'Únete a videollamadas cuando sea la hora de tu sesión',
        icon: '📹',
      },
      {
        text: 'Cancela o reprograma sesiones si es necesario',
        icon: '🔄',
      },
      {
        text: 'Revisa el historial de sesiones pasadas',
        icon: '📋',
      },
    ],
    tip: 'Las sesiones aparecen ordenadas por fecha. ¡No olvides revisar tu calendario regularmente!',
  },
  search: {
    icon: Search,
    title: 'Buscar Voluntarios',
    description: 'Encuentra el tutor perfecto para ti',
    steps: [
      {
        text: 'Busca voluntarios por nombre o especialidad',
        icon: '🔍',
      },
      {
        text: 'Filtra por habilidades: WhatsApp, Facebook, Email',
        icon: '🎯',
      },
      {
        text: 'Revisa perfiles completos con calificaciones',
        icon: '⭐',
      },
      {
        text: 'Reserva sesiones directamente desde el perfil',
        icon: '📅',
      },
    ],
    tip: 'Usa los filtros para encontrar rápidamente el tipo de ayuda que necesitas.',
  },
  messages: {
    icon: MessageCircle,
    title: 'Mensajes',
    description: 'Comunícate con tus tutores',
    steps: [
      {
        text: 'Ve todas tus conversaciones en un solo lugar',
        icon: '💬',
      },
      {
        text: 'Inicia chats con voluntarios desde sus perfiles',
        icon: '👋',
      },
      {
        text: 'Chatea durante las videollamadas si tienes preguntas',
        icon: '📱',
      },
      {
        text: 'Recibe notificaciones de nuevos mensajes',
        icon: '🔔',
      },
    ],
    tip: 'Puedes chatear antes, durante y después de las sesiones. ¡No dudes en preguntar!',
  },
  profile: {
    icon: User,
    title: 'Mi Perfil',
    description: 'Gestiona tu información y preferencias',
    steps: [
      {
        text: 'Actualiza tu información personal',
        icon: '✏️',
      },
      {
        text: 'Agrega tus intereses para mejores recomendaciones',
        icon: '❤️',
      },
      {
        text: 'Revisa tu historial de sesiones y progreso',
        icon: '📊',
      },
      {
        text: 'Accede a configuración y ayuda',
        icon: '⚙️',
      },
    ],
    tip: 'Completa tu perfil con intereses para que los voluntarios puedan ayudarte mejor.',
  },
};

export function QuickActionTutorial({ action, onClose, onContinue }: QuickActionTutorialProps) {
  const tutorial = tutorials[action];
  const Icon = tutorial.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Icon className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-slate-800 font-medium">{tutorial.title}</h3>
              <p className="text-slate-600 text-sm">{tutorial.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {tutorial.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl"
            >
              <div className="text-2xl flex-shrink-0">{step.icon}</div>
              <div className="flex-1">
                <p className="text-slate-700 text-sm">{step.text}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-amber-900 text-sm">
            💡 <strong>Tip:</strong> {tutorial.tip}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 h-12 rounded-xl"
          >
            Cerrar
          </Button>
          <Button
            onClick={onContinue}
            className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
          >
            Continuar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

