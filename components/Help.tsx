import { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, BookOpen, Video, Calendar, Search, Settings } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { QuickActionTutorial } from './QuickActionTutorial';
import type { UserRole } from '@/types';

interface HelpProps {
  role: UserRole;
  onBack: () => void;
}

export function Help({ role, onBack }: HelpProps) {
  const isElderly = role === 'elderly';
  const [showTutorial, setShowTutorial] = useState<{
    action: 'calendar' | 'search' | 'messages' | 'profile';
  } | null>(null);

  const faqItems = [
    {
      question: '¿Cómo reservo una sesión?',
      answer: 'Puedes reservar una sesión desde la sección "Buscar" en el dashboard. Encuentra un voluntario que te interese y haz clic en "Reservar". Selecciona la fecha y hora que prefieras.',
    },
    {
      question: '¿Cómo funciona el chat?',
      answer: 'El chat te permite comunicarte con los voluntarios antes, durante y después de las sesiones. Puedes acceder desde el botón "Mensajes" en el dashboard o desde el perfil de un voluntario.',
    },
    {
      question: '¿Puedo cancelar una sesión?',
      answer: 'Sí, puedes cancelar una sesión desde el calendario. Ve a la sesión que deseas cancelar y selecciona la opción de cancelar. Te recomendamos hacerlo con al menos 24 horas de anticipación.',
    },
    {
      question: '¿Cómo califico una sesión?',
      answer: 'Después de cada sesión, aparecerá automáticamente un modal para calificar. Puedes dar una calificación de 1 a 5 estrellas y dejar un comentario opcional.',
    },
    {
      question: '¿Qué hago si tengo problemas técnicos?',
      answer: 'Si tienes problemas técnicos durante una videollamada, puedes usar el chat integrado para comunicarte con el voluntario. También puedes contactar al soporte desde esta sección.',
    },
    {
      question: '¿Cómo cambio mi información de perfil?',
      answer: 'Ve a tu perfil y luego a "Configuración". Desde allí podrás actualizar tu información personal, foto de perfil y preferencias.',
    },
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Contactar Soporte',
      description: 'Chatea con nuestro equipo de soporte',
      action: () => {
        // Navigate to support chat
        alert('Redirigiendo al chat de soporte...');
      },
    },
    {
      icon: Phone,
      title: 'Llamar Soporte',
      description: '+507 6000-0000',
      action: () => {
        window.location.href = 'tel:+50760000000';
      },
    },
    {
      icon: Mail,
      title: 'Enviar Email',
      description: 'soporte@abuelosdigitales.com',
      action: () => {
        window.location.href = 'mailto:soporte@abuelosdigitales.com';
      },
    },
  ];

  const tutorials = [
    {
      icon: Calendar,
      title: 'Calendario de Sesiones',
      description: 'Gestiona tus sesiones de aprendizaje',
      action: 'calendar' as const,
    },
    {
      icon: Search,
      title: 'Buscar Voluntarios',
      description: 'Encuentra el tutor perfecto para ti',
      action: 'search' as const,
    },
    {
      icon: MessageCircle,
      title: 'Mensajes',
      description: 'Comunícate con tus tutores',
      action: 'messages' as const,
    },
    {
      icon: Settings,
      title: 'Mi Perfil',
      description: 'Gestiona tu información y preferencias',
      action: 'profile' as const,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-slate-800 text-xl">Centro de Ayuda</h2>
          <p className="text-slate-600 text-sm">Encuentra respuestas y soporte</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-slate-800 mb-3">Contactar Soporte</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Icon className="h-5 w-5 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-800 text-sm font-medium">{action.title}</div>
                  <div className="text-xs text-slate-600">{action.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tutorials */}
      <div className="mb-6">
        <h3 className="text-slate-800 mb-3">Tutoriales Rápidos</h3>
        <div className="grid grid-cols-2 gap-3">
          {tutorials.map((tutorial, index) => {
            const Icon = tutorial.icon;
            return (
              <button
                key={index}
                onClick={() => setShowTutorial({ action: tutorial.action })}
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-700" />
                </div>
                <div className="text-center">
                  <div className="text-slate-800 text-xs font-medium mb-1">{tutorial.title}</div>
                  <div className="text-xs text-slate-600">{tutorial.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-6">
        <h3 className="text-slate-800 mb-3">Preguntas Frecuentes</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
              <AccordionTrigger className="text-left text-slate-800 hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Additional Help */}
      <div className="bg-emerald-50 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-emerald-700 mt-0.5" />
          <div>
            <h4 className="text-emerald-900 font-medium mb-1">¿No encuentras lo que buscas?</h4>
            <p className="text-emerald-800 text-sm mb-3">
              Nuestro equipo está aquí para ayudarte. Contáctanos usando cualquiera de las opciones arriba.
            </p>
            <Button
              onClick={() => {
                alert('Redirigiendo al chat de soporte...');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 rounded-xl text-sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chatear con Soporte
            </Button>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <QuickActionTutorial
          action={showTutorial.action}
          onClose={() => setShowTutorial(null)}
          onContinue={() => setShowTutorial(null)}
        />
      )}
    </div>
  );
}

