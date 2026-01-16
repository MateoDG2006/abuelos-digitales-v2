import { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  isOwn: boolean;
}

interface VideoCallChatProps {
  volunteerName: string;
  volunteerAvatar: string;
  sessionId: number;
  onClose: () => void;
}

export function VideoCallChat({ volunteerName, volunteerAvatar, sessionId, onClose }: VideoCallChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user.id || 'current-user';

  useEffect(() => {
    // Load messages for this session
    const storedMessages = JSON.parse(localStorage.getItem(`videocall_messages_${sessionId}`) || '[]');
    setMessages(storedMessages);
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      senderId: currentUserId,
      senderName: user.fullName || 'Tú',
      senderAvatar: user.profileImage || '',
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(`videocall_messages_${sessionId}`, JSON.stringify(updatedMessages));
    setNewMessage('');

    // Simulate quick response during video call
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entendido, te explico mejor en la videollamada.',
        senderId: 'volunteer',
        senderName: volunteerName,
        senderAvatar: volunteerAvatar,
        timestamp: new Date().toISOString(),
        isOwn: false,
      };

      const finalMessages = [...updatedMessages, responseMessage];
      setMessages(finalMessages);
      localStorage.setItem(`videocall_messages_${sessionId}`, JSON.stringify(finalMessages));
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
              {volunteerAvatar || volunteerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-white text-sm font-medium">{volunteerName}</h4>
            <p className="text-slate-400 text-xs">Chat durante la llamada</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-slate-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">
              No hay mensajes aún. Escribe algo para comenzar.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isOwn && (
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarFallback className="bg-slate-600 text-slate-200 text-xs">
                    {message.senderAvatar || message.senderName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[75%] ${message.isOwn ? 'flex flex-col items-end' : ''}`}>
                <div
                  className={`rounded-2xl px-3 py-2 ${
                    message.isOwn
                      ? 'bg-emerald-600 text-white rounded-br-md'
                      : 'bg-slate-700 text-slate-200 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1 px-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
              {message.isOwn && (
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarFallback className="bg-emerald-600 text-white text-xs">
                    {message.senderAvatar || message.senderName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 rounded-xl"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

