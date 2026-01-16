import { Users, Heart } from 'lucide-react';
import { Button } from './ui/button';
import type { UserRole } from '@/types';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
  onLogin: () => void;
}

export function RoleSelection({ onSelectRole, onLogin }: RoleSelectionProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-slate-800 mb-2">Selecciona tu Rol</h2>
        <p className="text-slate-600 text-lg">¿Cómo quieres usar la aplicación?</p>
      </div>

      <div className="space-y-4 mb-6">
        <Button
          onClick={() => onSelectRole('elderly')}
          className="w-full h-20 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg justify-start px-6"
        >
          <Users className="mr-4 h-8 w-8 flex-shrink-0" />
          <div className="text-left">
            <div className="text-lg">Adulto Mayor</div>
            <div className="text-sm opacity-90">Quiero aprender</div>
          </div>
        </Button>

        <Button
          onClick={() => onSelectRole('volunteer')}
          className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg justify-start px-6"
        >
          <Heart className="mr-4 h-8 w-8 flex-shrink-0" />
          <div className="text-left">
            <div className="text-lg">Voluntario</div>
            <div className="text-sm opacity-90">Quiero enseñar</div>
          </div>
        </Button>
      </div>

      <button
        onClick={onLogin}
        className="w-full text-emerald-700 hover:text-emerald-800 text-center py-2"
      >
        Ya tengo una cuenta
      </button>
    </div>
  );
}
