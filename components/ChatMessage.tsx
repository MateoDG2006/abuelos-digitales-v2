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

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' });
  };

  if (message.isOwn) {
    return (
      <div className="flex items-end gap-2 justify-end">
        <div className="max-w-[75%]">
          <div className="bg-emerald-600 text-white rounded-2xl rounded-br-md px-4 py-2">
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          </div>
          <p className="text-xs text-slate-500 mt-1 text-right">
            {formatTime(message.timestamp)}
          </p>
        </div>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
            {message.senderAvatar || message.senderName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
          {message.senderAvatar || message.senderName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[75%]">
        <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-800 whitespace-pre-wrap break-words">
            {message.text}
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

