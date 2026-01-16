import { useState } from 'react';
import { ArrowLeft, User, Phone, CreditCard, Star, Calendar, LogOut, HelpCircle, Settings, History, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { InterestsSection } from './InterestsSection';
import type { UserRole, Screen } from '@/types';

interface ProfileProps {
  role: UserRole;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

export function Profile({ role, onBack, onLogout, onNavigate }: ProfileProps) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const isElderly = role === 'elderly';

  const stats = [
    { label: 'Horas', value: '24', icon: Calendar },
    { label: 'Sesiones', value: '12', icon: Calendar },
    { label: 'Rating', value: '4.8', icon: Star },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
      <button
        onClick={onBack}
        className="flex items-center text-slate-600 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Volver
      </button>

      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg overflow-hidden">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-white" />
            )}
          </div>
        </div>
        <h2 className="text-slate-800 mb-1">{user.fullName || 'Usuario'}</h2>
        <p className="text-slate-600">{user.phone ? `+507 ${user.phone}` : 'Sin teléfono'}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center bg-slate-50 rounded-xl p-3">
              <Icon className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-xl text-slate-800 mb-1">{stat.value}</div>
              <div className="text-xs text-slate-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* User Info */}
      <div className="bg-slate-50 rounded-2xl p-4 mb-6">
        <div className="space-y-3">
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

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-slate-800 mb-3">
          {isElderly ? 'Progreso' : 'Habilidades'}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
            <span className="text-slate-700">WhatsApp</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
              {isElderly ? 'Aprendiendo' : 'Experto'}
            </span>
          </div>
          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
            <span className="text-slate-700">Facebook</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {isElderly ? 'Básico' : 'Intermedio'}
            </span>
          </div>
        </div>
      </div>

      {/* Interests */}
      <InterestsSection
        interests={user.interests || []}
        isEditable={true}
        onUpdate={(updatedInterests) => {
          const updatedUser = { ...user, interests: updatedInterests };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }}
      />

      {/* Quick Actions */}
      <div className="space-y-3 mb-6">
        <button 
          onClick={() => onNavigate('settings')}
          className="w-full bg-slate-50 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-100"
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Settings className="h-5 w-5 text-emerald-700" />
          </div>
          <div className="text-left">
            <div className="text-slate-800 text-sm">Configuración</div>
            <div className="text-xs text-slate-600">Ajusta tus preferencias</div>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('history')}
          className="w-full bg-slate-50 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-100"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <History className="h-5 w-5 text-purple-700" />
          </div>
          <div className="text-left">
            <div className="text-slate-800 text-sm">Historial</div>
            <div className="text-xs text-slate-600">Ver sesiones pasadas</div>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('help')}
          className="w-full bg-slate-50 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-100"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <HelpCircle className="h-5 w-5 text-blue-700" />
          </div>
          <div className="text-left">
            <div className="text-slate-800 text-sm">Ayuda</div>
            <div className="text-xs text-slate-600">¿Necesitas ayuda?</div>
          </div>
        </button>
      </div>

      {/* Logout */}
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full h-12 rounded-xl border-2 border-red-200 text-red-700 hover:bg-red-50"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Cerrar Sesión
      </Button>
    </div>
  );
}