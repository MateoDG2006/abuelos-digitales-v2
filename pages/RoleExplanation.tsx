import { useNavigate, useParams } from 'react-router';
import { Heart, Users, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const roleData = {
  elderly: {
    icon: Users,
    color: 'emerald',
    title: 'Adulto Mayor',
    subtitle: 'Aprende nuevas habilidades digitales',
    benefits: [
      'Aprende a usar WhatsApp, videollamadas y redes sociales',
      'Sesiones personalizadas a tu ritmo',
      'Voluntarios pacientes y amables',
      'Horarios flexibles que se adaptan a ti',
      'Todo completamente gratis',
    ],
    description: 'Como adulto mayor, tendrás acceso a jóvenes voluntarios que te enseñarán paso a paso cómo usar la tecnología. No te preocupes si nunca has usado un smartphone, ¡estamos aquí para ayudarte!',
  },
  volunteer: {
    icon: Heart,
    color: 'blue',
    title: 'Joven Voluntario',
    subtitle: 'Comparte tus conocimientos digitales',
    benefits: [
      'Ayuda a adultos mayores a conectarse digitalmente',
      'Gana experiencia en enseñanza y empatía',
      'Crea un impacto positivo en tu comunidad',
      'Horarios flexibles según tu disponibilidad',
      'Conoce y conecta con diferentes generaciones',
    ],
    description: 'Como voluntario, tendrás la oportunidad de marcar una diferencia real en la vida de los adultos mayores, ayudándoles a mantenerse conectados con sus familias y el mundo digital.',
  },
};

export function RoleExplanation() {
  const navigate = useNavigate();
  const { roleType } = useParams<{ roleType: 'elderly' | 'volunteer' }>();
  
  const role = roleData[roleType || 'elderly'];
  const Icon = role.icon;
  const colorClass = role.color === 'emerald' ? 'emerald' : 'blue';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-${colorClass}-600 rounded-3xl mb-6 shadow-lg`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-${colorClass}-700 mb-2`}>{role.title}</h1>
          <p className="text-slate-600 text-xl">{role.subtitle}</p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            {role.description}
          </p>

          {/* Benefits */}
          <h3 className="text-slate-800 mb-4">Beneficios:</h3>
          <div className="space-y-4">
            {role.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className={`w-6 h-6 text-${colorClass}-600 flex-shrink-0 mt-1`} />
                <p className="text-slate-700 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1 h-14 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver
          </Button>
          <Button
            onClick={() => navigate(`/register/${roleType}`)}
            className={`flex-1 h-14 bg-${colorClass}-600 hover:bg-${colorClass}-700 rounded-xl`}
          >
            Crear Cuenta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <button
          onClick={() => navigate('/login')}
          className={`w-full mt-6 text-${colorClass}-700 hover:text-${colorClass}-800 text-lg`}
        >
          Ya tengo una cuenta
        </button>
      </div>
    </div>
  );
}
