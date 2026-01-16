import { useNavigate } from 'react-router';
import { User, Phone, CreditCard, Star, Calendar, TrendingUp, Settings, HelpCircle, LogOut, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isElderly = user.roleType === 'elderly';

  const stats = [
    { label: 'Horas totales', value: '24', icon: Calendar },
    { label: 'Sesiones', value: '12', icon: TrendingUp },
    { label: 'Rating', value: '4.8', icon: Star },
  ];

  const skills = isElderly
    ? [
        { name: 'iPhone y iOS', level: 'Experto', color: 'emerald' },
        { name: 'Android', level: 'Intermedio', color: 'blue' },
        { name: 'Redes Sociales', level: 'Experto', color: 'purple' },
      ]
    : [
        { name: 'WhatsApp', level: 'Aprendiendo', color: 'emerald' },
        { name: 'Facebook', level: 'Básico', color: 'blue' },
      ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Sesión cerrada exitosamente');
    navigate('/');
  };

  const handleTutorial = () => {
    navigate('/tutorial');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-slate-800">Mi Perfil</h1>
          <button
            onClick={() => navigate('/app/settings')}
            className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Settings className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-slate-800 mb-1">{user.fullName || 'Usuario'}</h2>
            <p className="text-slate-600">{user.phone ? `+507 ${user.phone}` : 'Sin teléfono'}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* User Info */}
          <div className="space-y-3 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="h-5 w-5 text-slate-400" />
              <span>+507 {user.phone || 'No disponible'}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <CreditCard className="h-5 w-5 text-slate-400" />
              <span>{user.cedula || 'No disponible'}</span>
            </div>
          </div>
        </div>

        {/* Skills/Learning Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-slate-800 mb-4">
            {isElderly ? 'Mis Habilidades' : 'Mi Progreso de Aprendizaje'}
          </h3>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-700">{skill.name}</span>
                  <span className={`px-3 py-1 bg-${skill.color}-100 text-${skill.color}-700 rounded-full text-sm`}>
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleTutorial}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-emerald-700" />
              </div>
              <div className="text-left">
                <div className="text-slate-800">Tutorial de la App</div>
                <div className="text-sm text-slate-600">Aprende a usar todas las funciones</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/settings')}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-blue-700" />
              </div>
              <div className="text-left">
                <div className="text-slate-800">Configuración</div>
                <div className="text-sm text-slate-600">Ajusta tus preferencias</div>
              </div>
            </div>
          </button>

          <button
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-purple-700" />
              </div>
              <div className="text-left">
                <div className="text-slate-800">Ayuda y Soporte</div>
                <div className="text-sm text-slate-600">¿Necesitas ayuda?</div>
              </div>
            </div>
          </button>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 rounded-xl border-2 border-red-200 text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
