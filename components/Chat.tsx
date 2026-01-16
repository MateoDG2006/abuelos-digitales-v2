import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Paperclip, Smile } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ChatMessage } from './ChatMessage';
import type { UserRole } from '@/types';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatProps {
  role: UserRole;
  conversationId: string;
  contactName: string;
  contactAvatar: string;
  onBack: () => void;
}

export function Chat({ role, conversationId, contactName, contactAvatar, onBack }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user.id || 'current-user';

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem(`messages_${conversationId}`) || '[]');
    setMessages(storedMessages);
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when messages change
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
    localStorage.setItem(`messages_${conversationId}`, JSON.stringify(updatedMessages));

    // Update conversation last message
    const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    const conversationIndex = conversations.findIndex((c: any) => c.id === conversationId);
    if (conversationIndex !== -1) {
      conversations[conversationIndex].lastMessage = newMessage.trim();
      conversations[conversationIndex].lastMessageTime = new Date().toISOString();
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }

    setNewMessage('');

    // Simulate response after 1-2 seconds
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Gracias por tu mensaje. Te responderé pronto.',
        senderId: 'contact',
        senderName: contactName,
        senderAvatar: contactAvatar,
        timestamp: new Date().toISOString(),
        isOwn: false,
      };

      const finalMessages = [...updatedMessages, responseMessage];
      setMessages(finalMessages);
      localStorage.setItem(`messages_${conversationId}`, JSON.stringify(finalMessages));

      // Update conversation again
      const updatedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
      const updatedIndex = updatedConversations.findIndex((c: any) => c.id === conversationId);
      if (updatedIndex !== -1) {
        updatedConversations[updatedIndex].lastMessage = responseMessage.text;
        updatedConversations[updatedIndex].lastMessageTime = responseMessage.timestamp;
        localStorage.setItem('conversations', JSON.stringify(updatedConversations));
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-emerald-100 text-emerald-700">
            {contactAvatar || contactName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-slate-800 font-medium">{contactName}</h3>
          <p className="text-slate-500 text-xs">En línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">
              No hay mensajes aún. ¡Inicia la conversación!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <Paperclip className="h-5 w-5 text-slate-600" />
          </button>
          <Input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-12 rounded-xl"
          />
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <Smile className="h-5 w-5 text-slate-600" />
          </button>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

