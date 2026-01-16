import { Heart, Users, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import type { UserRole } from '@/types';

interface RoleExplanationProps {
  role: UserRole;
  onContinue: () => void;
  onBack: () => void;
}

const roleData = {
  elderly: {
    icon: Users,
    color: 'emerald',
    title: 'Adulto Mayor',
    subtitle: 'Aprende nuevas habilidades digitales',
    benefits: [
      'Aprende a usar WhatsApp y redes sociales',
      'Sesiones personalizadas a tu ritmo',
      'Voluntarios pacientes y amables',
      'Horarios flexibles',
      'Todo completamente gratis',
    ],
    description: 'Tendrás acceso a jóvenes voluntarios que te enseñarán paso a paso. No te preocupes si nunca has usado un smartphone.',
  },
  volunteer: {
    icon: Heart,
    color: 'blue',
    title: 'Joven Voluntario',
    subtitle: 'Comparte tus conocimientos',
    benefits: [
      'Ayuda a adultos mayores',
      'Gana experiencia en enseñanza',
      'Impacto positivo en tu comunidad',
      'Horarios flexibles',
      'Conoce diferentes generaciones',
    ],
    description: 'Tendrás la oportunidad de marcar una diferencia real ayudando a adultos mayores a mantenerse conectados.',
  },
};

export function RoleExplanation({ role, onContinue, onBack }: RoleExplanationProps) {
  if (!role || (role !== 'elderly' && role !== 'volunteer')) {
    return null;
  }

  const data = roleData[role];
  const Icon = data.icon;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-${data.color}-600 rounded-2xl mb-4 shadow-lg`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-slate-800 mb-2">{data.title}</h2>
        <p className="text-slate-600 text-lg">{data.subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-slate-700 leading-relaxed mb-6">
        {data.description}
      </p>

      {/* Benefits */}
      <div className="mb-6">
        <h3 className="text-slate-800 mb-3">Beneficios:</h3>
        <div className="space-y-3">
          {data.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className={`w-6 h-6 text-${data.color}-600 flex-shrink-0 mt-0.5`} />
              <p className="text-slate-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 h-14 rounded-xl"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver
        </Button>
        <Button
          onClick={onContinue}
          className={`flex-1 h-14 bg-${data.color}-600 hover:bg-${data.color}-700 rounded-xl`}
        >
          Continuar
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
