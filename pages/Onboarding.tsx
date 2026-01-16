import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Users, Calendar, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const onboardingSteps = [
  {
    icon: Heart,
    title: '¡Bienvenido a Abuelos Digitales!',
    description: 'Una plataforma que conecta adultos mayores con jóvenes voluntarios para aprender habilidades digitales de manera fácil y divertida.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Users,
    title: 'Conecta con Voluntarios',
    description: 'Encuentra jóvenes entusiastas que quieren compartir sus conocimientos tecnológicos contigo de forma gratuita y amigable.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Calendar,
    title: 'Agenda Sesiones',
    description: 'Reserva sesiones de aprendizaje en horarios que te convengan. Aprende a tu propio ritmo, sin presiones.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Search,
    title: 'Aprende lo que Necesitas',
    description: 'Desde usar WhatsApp hasta hacer videollamadas. Tú decides qué quieres aprender y nosotros te ayudamos a lograrlo.',
    color: 'bg-amber-100 text-amber-700',
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-32 h-32 ${step.color} rounded-3xl mb-8 shadow-lg`}>
            <Icon className="w-16 h-16" />
          </div>
          <h2 className="text-slate-800 mb-4">{step.title}</h2>
          <p className="text-slate-600 text-xl leading-relaxed px-4">
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

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 h-14 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Atrás
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
          >
            {currentStep < onboardingSteps.length - 1 ? 'Siguiente' : 'Comenzar'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-6 text-slate-500 hover:text-slate-700"
        >
          Saltar introducción
        </button>
      </div>
    </div>
  );
}
