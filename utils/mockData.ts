// Mock data utilities for Abuelos Digitales

export const initializeMockData = () => {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  // Check if data already exists
  if (!localStorage.getItem('mockDataInitialized')) {
    // Mock user data
    const mockUser = {
      id: 'current-user',
      fullName: 'Juan Pérez',
      phone: '6000-0000',
      cedula: '8-123-4567',
      profileImage: '',
      interests: [
        { id: 'whatsapp', name: 'WhatsApp', category: 'social', icon: '💬' },
        { id: 'facebook', name: 'Facebook', category: 'social', icon: '📘' },
        { id: 'email', name: 'Email y Gmail', category: 'technical', icon: '📧' },
        { id: 'communication', name: 'Comunicación', category: 'soft-skills', icon: '💬' },
        { id: 'reading', name: 'Lectura', category: 'hobbies', icon: '📖' },
      ],
    };
    localStorage.setItem('user', JSON.stringify(mockUser));

    // Mock bookings
    const mockBookings = [
      {
        id: 1,
        volunteer: 'María García',
        topic: 'WhatsApp Básico',
        date: '2025-01-20',
        time: '14:00',
        status: 'próxima',
        color: 'emerald',
      },
    ];
    localStorage.setItem('bookings', JSON.stringify(mockBookings));

    // Mock meeting history
    const mockHistory = [
      {
        id: 1,
        volunteer: 'Rosa Martínez',
        topic: 'Facebook para principiantes',
        date: '2024-12-15T14:00:00',
        time: '14:00',
        duration: '1:00',
        rating: 5,
        comment: '¡Excelente sesión! Aprendí mucho sobre Facebook.',
      },
      {
        id: 2,
        volunteer: 'Carlos Rodríguez',
        topic: 'Email y Gmail',
        date: '2024-12-10T15:00:00',
        time: '15:00',
        duration: '1:00',
        rating: 4,
        comment: 'Muy paciente y claro en sus explicaciones.',
      },
    ];
    localStorage.setItem('meetingHistory', JSON.stringify(mockHistory));

    // Mock conversations
    const mockConversations = [
      {
        id: 'conv-1',
        contactId: 'vol-1',
        contactName: 'María García',
        contactAvatar: '👩',
        lastMessage: '¡Hola! ¿Cómo puedo ayudarte hoy?',
        lastMessageTime: new Date(Date.now() - 30 * 60000).toISOString(),
        unreadCount: 2,
        isOnline: true,
      },
      {
        id: 'conv-2',
        contactId: 'vol-2',
        contactName: 'Carlos Rodríguez',
        contactAvatar: '👨',
        lastMessage: 'Perfecto, nos vemos mañana a las 3pm',
        lastMessageTime: new Date(Date.now() - 2 * 3600000).toISOString(),
        unreadCount: 0,
        isOnline: false,
      },
      {
        id: 'conv-3',
        contactId: 'vol-3',
        contactName: 'Rosa Martínez',
        contactAvatar: '👵',
        lastMessage: 'Gracias por la sesión de hoy',
        lastMessageTime: new Date(Date.now() - 24 * 3600000).toISOString(),
        unreadCount: 1,
        isOnline: true,
      },
    ];
    localStorage.setItem('conversations', JSON.stringify(mockConversations));

    // Mock messages for first conversation
    const mockMessages = [
      {
        id: 'msg-1',
        text: '¡Hola! ¿Cómo puedo ayudarte hoy?',
        senderId: 'vol-1',
        senderName: 'María García',
        senderAvatar: '👩',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        isOwn: false,
      },
      {
        id: 'msg-2',
        text: 'Hola María, tengo una pregunta sobre WhatsApp',
        senderId: 'current-user',
        senderName: 'Tú',
        senderAvatar: '',
        timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
        isOwn: true,
      },
      {
        id: 'msg-3',
        text: '¡Por supuesto! ¿Qué necesitas saber?',
        senderId: 'vol-1',
        senderName: 'María García',
        senderAvatar: '👩',
        timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
        isOwn: false,
      },
    ];
    localStorage.setItem('messages_conv-1', JSON.stringify(mockMessages));

    localStorage.setItem('mockDataInitialized', 'true');
  }
};

export const clearMockData = () => {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('user');
  localStorage.removeItem('bookings');
  localStorage.removeItem('meetingHistory');
  localStorage.removeItem('conversations');
  // Clear all message conversations
  const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
  conversations.forEach((conv: any) => {
    localStorage.removeItem(`messages_${conv.id}`);
  });
  localStorage.removeItem('mockDataInitialized');
};
