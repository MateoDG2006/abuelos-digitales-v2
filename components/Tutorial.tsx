import { useState } from 'react';
import { Hand, MousePointer, Calendar, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface TutorialProps {
  onComplete: () => void;
}

const tutorialSteps = [
  {
    icon: Hand,
    title: '¡Bienvenido!',
    description: 'Te mostraremos cómo usar la aplicación paso a paso. Es muy fácil.',
    tip: 'Toca "Siguiente" para continuar',
  },
  {
    icon: MousePointer,
    title: 'Navegación',
    description: 'En la parte inferior encontrarás botones grandes para moverte entre secciones.',
    tip: 'Toca cada botón para ver diferentes partes',
  },
  {
    icon: Calendar,
    title: 'Ver Sesiones',
    description: 'En "Calendario" verás todas tus clases programadas.',
    tip: 'Las sesiones próximas aparecen con colores',
  },
  {
    icon: Search,
    title: 'Buscar Voluntarios',
    description: 'Usa la búsqueda para encontrar nuevos voluntarios que te enseñen.',
    tip: 'Puedes ver sus especialidades',
  },
];

export function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
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
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-3xl mb-6">
          <Icon className="w-12 h-12 text-emerald-700" />
        </div>
        <h2 className="text-emerald-800 mb-3">{step.title}</h2>
        <p className="text-slate-700 text-lg leading-relaxed mb-4">
          {step.description}
        </p>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <p className="text-amber-900">
            💡 {step.tip}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Paso {currentStep + 1} de {tutorialSteps.length}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all"
            style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentStep > 0 && (
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 h-14 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Atrás
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
        >
          {currentStep < tutorialSteps.length - 1 ? 'Siguiente' : 'Comenzar'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
