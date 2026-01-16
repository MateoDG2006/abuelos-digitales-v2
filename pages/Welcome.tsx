import { useNavigate } from 'react-router';
import { Heart, Users, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-600 rounded-3xl mb-6 shadow-lg">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
          <h1 className="text-emerald-700 mb-3">Abuelos Digitales</h1>
          <p className="text-slate-600 text-lg">
            Conectando generaciones, aprendiendo juntos
          </p>
        </div>

        {/* Role Selection Buttons */}
        <div className="space-y-4 mb-8">
          <Button
            onClick={() => navigate('/role/elderly')}
            className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg"
          >
            <Users className="mr-3 h-6 w-6" />
            <div className="text-left">
              <div className="text-lg">Soy un adulto mayor</div>
              <div className="text-sm opacity-90">Quiero aprender habilidades digitales</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/role/volunteer')}
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg"
          >
            <Heart className="mr-3 h-6 w-6" />
            <div className="text-left">
              <div className="text-lg">Soy un joven voluntario</div>
              <div className="text-sm opacity-90">Quiero enseñar habilidades digitales</div>
            </div>
          </Button>
        </div>

        {/* Additional Options */}
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="text-emerald-700 hover:text-emerald-800"
          >
            Ya tengo una cuenta
          </button>
          
          <button
            onClick={() => navigate('/onboarding')}
            className="flex items-center justify-center w-full text-slate-600 hover:text-slate-800"
          >
            <span>¿Cómo funciona la app?</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
