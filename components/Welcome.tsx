import { Heart } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white rounded-3xl p-8 shadow-lg">
      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-600 rounded-3xl mb-6 shadow-lg">
          <Heart className="w-12 h-12 text-white fill-white" />
        </div>
        <h1 className="text-emerald-700 mb-3">Abuelos Digitales</h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Conectando generaciones, aprendiendo juntos
        </p>
      </div>

      {/* Description */}
      <div className="mb-8 space-y-4">
        <p className="text-slate-700 text-center leading-relaxed">
          Una plataforma que une adultos mayores con jóvenes voluntarios para aprender habilidades digitales.
        </p>
      </div>

      {/* Get Started Button */}
      <Button
        onClick={onGetStarted}
        className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg text-lg"
      >
        Comenzar
      </Button>
    </div>
  );
}
