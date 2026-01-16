import { useNavigate } from 'react-router';
import { Calendar, Clock, Star, TrendingUp, BookOpen, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isElderly = user.roleType === 'elderly';

  const upcomingSessions = [
    {
      id: 1,
      name: 'María García',
      topic: 'WhatsApp Básico',
      date: '16 Enero, 2025',
      time: '14:00 - 15:00',
      status: 'Próxima',
      color: 'emerald',
    },
    {
      id: 2,
      name: 'Rosa Martínez',
      topic: 'Facebook Intermedio',
      date: '18 Enero, 2025',
      time: '15:00 - 16:00',
      status: 'Programada',
      color: 'blue',
    },
  ];

  const stats = [
    { icon: Calendar, label: 'Horas', value: '24h', color: 'emerald' },
    { icon: Star, label: 'Rating', value: '4.8', color: 'amber' },
    { icon: TrendingUp, label: 'Sesiones', value: '12', color: 'blue' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-slate-800 mb-1">¡Hola, {user.fullName || 'Usuario'}! 👋</h1>
            <p className="text-slate-600 text-lg">
              {isElderly ? 'Continúa aprendiendo' : 'Tienes 2 sesiones hoy'}
            </p>
          </div>
          <button
            onClick={() => navigate('/app/settings')}
            className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Settings className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
                <Icon className={`h-6 w-6 text-${stat.color}-600 mb-2`} />
                <div className="text-2xl text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800">Próximas Sesiones</h3>
            <button
              onClick={() => navigate('/app/calendar')}
              className="text-emerald-700 hover:text-emerald-800"
            >
              Ver todas
            </button>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${session.color}-100 rounded-full flex items-center justify-center`}>
                      <BookOpen className={`h-6 w-6 text-${session.color}-700`} />
                    </div>
                    <div>
                      <h4 className="text-slate-800">{session.name}</h4>
                      <p className="text-slate-600">{session.topic}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 bg-${session.color}-100 text-${session.color}-700 rounded-full text-sm`}>
                    {session.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{session.time}</span>
                  </div>
                </div>
                <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                  Unirse a Sesión
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-800 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => navigate('/app/search')}
              variant="outline"
              className="h-16 rounded-xl"
            >
              Buscar Voluntarios
            </Button>
            <Button
              onClick={() => navigate('/app/calendar')}
              variant="outline"
              className="h-16 rounded-xl"
            >
              Reservar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
