import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Hand, MousePointer, Calendar as CalendarIcon, Search, Settings, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const tutorialSteps = [
  {
    icon: Hand,
    title: '¡Bienvenido!',
    description: 'Te mostraremos cómo usar la aplicación paso a paso. Es muy fácil, no te preocupes.',
    tip: 'Toca el botón "Siguiente" para continuar',
    highlight: 'bottom',
  },
  {
    icon: MousePointer,
    title: 'Navegación Simple',
    description: 'En la parte inferior encontrarás botones grandes para moverte entre las secciones principales.',
    tip: 'Toca cada botón para ver diferentes partes de la app',
    highlight: 'bottom',
  },
  {
    icon: CalendarIcon,
    title: 'Ver tus Sesiones',
    description: 'En "Calendario" verás todas tus clases programadas. Aquí puedes unirte a las sesiones cuando sea el momento.',
    tip: 'Las sesiones próximas aparecen con colores',
    highlight: 'calendar',
  },
  {
    icon: Search,
    title: 'Buscar Voluntarios',
    description: 'Usa la lupa para encontrar nuevos voluntarios que te enseñen lo que necesitas aprender.',
    tip: 'Puedes ver sus especialidades y calificaciones',
    highlight: 'search',
  },
  {
    icon: Settings,
    title: 'Ajustes y Ayuda',
    description: 'En tu perfil encontrarás configuración y ayuda cuando la necesites.',
    tip: 'Si tienes dudas, siempre puedes volver a este tutorial',
    highlight: 'profile',
  },
];

export function Tutorial() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/app');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6 flex items-center">
      <div className="max-w-lg mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-emerald-100 rounded-3xl mb-6 shadow-lg">
            <Icon className="w-14 h-14 text-emerald-700" />
          </div>
          <h2 className="text-emerald-800 mb-4 text-3xl">{step.title}</h2>
          <p className="text-slate-700 text-2xl leading-relaxed mb-6 px-4">
            {step.description}
          </p>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <p className="text-amber-900 text-xl">
              💡 {step.tip}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Paso {currentStep + 1} de {tutorialSteps.length}</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-16 rounded-xl text-lg"
            >
              <ArrowLeft className="mr-2 h-6 w-6" />
              Atrás
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 h-16 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-lg"
          >
            {currentStep < tutorialSteps.length - 1 ? 'Siguiente' : 'Comenzar a Usar'}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        <button
          onClick={() => navigate('/app')}
          className="w-full mt-6 text-slate-600 hover:text-slate-800 text-lg"
        >
          Saltar tutorial
        </button>
      </div>
    </div>
  );
}
