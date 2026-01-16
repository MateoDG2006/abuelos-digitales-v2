import { useState } from 'react';
import { Heart, Users, Calendar, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Heart,
    title: '¡Bienvenido!',
    description: 'Una plataforma que conecta adultos mayores con jóvenes voluntarios para aprender habilidades digitales.',
    color: 'emerald',
  },
  {
    icon: Users,
    title: 'Conecta',
    description: 'Encuentra jóvenes que quieren compartir sus conocimientos tecnológicos contigo.',
    color: 'blue',
  },
  {
    icon: Calendar,
    title: 'Agenda Sesiones',
    description: 'Reserva sesiones en horarios que te convengan. Aprende a tu propio ritmo.',
    color: 'purple',
  },
  {
    icon: Search,
    title: 'Aprende',
    description: 'Desde WhatsApp hasta videollamadas. Tú decides qué quieres aprender.',
    color: 'emerald',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
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

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-24 h-24 bg-${step.color}-100 rounded-3xl mb-6`}>
          <Icon className={`w-12 h-12 text-${step.color}-600`} />
        </div>
        <h2 className="text-slate-800 mb-4">{step.title}</h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {onboardingSteps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentStep
                ? 'w-8 bg-emerald-600'
                : 'w-2 bg-slate-300'
            }`}
          />
        ))}
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
          {currentStep < onboardingSteps.length - 1 ? 'Siguiente' : 'Comenzar'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
