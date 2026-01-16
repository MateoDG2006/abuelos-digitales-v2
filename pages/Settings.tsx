import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Lock, Globe, Palette, HelpCircle, Info, ChevronRight } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { useState } from 'react';

export function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const settingsSections = [
    {
      title: 'Notificaciones',
      items: [
        {
          icon: Bell,
          label: 'Notificaciones Push',
          description: 'Recibe alertas de sesiones y mensajes',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Bell,
          label: 'Sonido',
          description: 'Sonido para notificaciones',
          type: 'toggle',
          value: soundEnabled,
          onChange: setSoundEnabled,
        },
      ],
    },
    {
      title: 'Privacidad',
      items: [
        {
          icon: Lock,
          label: 'Privacidad',
          description: 'Controla quién puede ver tu perfil',
          type: 'link',
        },
        {
          icon: Lock,
          label: 'Cambiar Cédula',
          description: 'Actualiza tu método de autenticación',
          type: 'link',
        },
      ],
    },
    {
      title: 'General',
      items: [
        {
          icon: Globe,
          label: 'Idioma',
          description: 'Español',
          type: 'link',
        },
        {
          icon: Palette,
          label: 'Apariencia',
          description: 'Tamaño de texto y colores',
          type: 'link',
        },
      ],
    },
    {
      title: 'Ayuda',
      items: [
        {
          icon: HelpCircle,
          label: 'Centro de Ayuda',
          description: 'Preguntas frecuentes y soporte',
          type: 'link',
        },
        {
          icon: Info,
          label: 'Acerca de',
          description: 'Versión 1.0.0',
          type: 'link',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/app/profile')}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver al perfil
        </button>

        <h1 className="text-slate-800 mb-8">Configuración</h1>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-slate-700 mb-3 px-2">{section.title}</h3>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`p-4 ${
                        index !== section.items.length - 1 ? 'border-b border-slate-100' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-slate-800">{item.label}</div>
                          <div className="text-sm text-slate-600">{item.description}</div>
                        </div>
                        {item.type === 'toggle' && item.onChange ? (
                          <Switch
                            checked={item.value || false}
                            onCheckedChange={item.onChange}
                          />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Version Info */}
        <div className="text-center mt-8 text-sm text-slate-500">
          Abuelos Digitales v1.0.0
          <br />
          Hecho con ❤️ en Panamá
        </div>
      </div>
    </div>
  );
}
