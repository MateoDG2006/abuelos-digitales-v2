import { useState, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, MessageCircle, Users, X } from 'lucide-react';
import { Button } from './ui/button';
import { VideoCallChat } from './VideoCallChat';
import type { UserRole } from '@/types';

interface VideoCallProps {
  role: UserRole;
  sessionId: number;
  volunteerName: string;
  topic: string;
  onEndCall: (sessionId: number) => void;
}

export function VideoCall({ role, sessionId, volunteerName, topic, onEndCall }: VideoCallProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg h-[90vh] flex flex-col relative">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white">{volunteerName}</h3>
            <p className="text-slate-300 text-sm">{topic}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm">{formatDuration(duration)}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className={`relative bg-gradient-to-br from-slate-800 to-slate-900 p-4 transition-all ${showChat ? 'w-2/3' : 'w-full'}`}>
          {/* Main Video (Volunteer) */}
          <div className="w-full h-full rounded-2xl bg-slate-700 flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-white" />
              </div>
              <p className="text-white text-xl mb-2">{volunteerName}</p>
              <p className="text-slate-300">En videollamada</p>
            </div>
          </div>

          {/* Self Video (Picture in Picture) */}
          <div className="absolute top-8 right-8 w-32 h-40 rounded-xl bg-slate-800 border-2 border-slate-600 overflow-hidden shadow-xl">
            {isVideoOff ? (
              <div className="w-full h-full flex items-center justify-center bg-slate-700">
                <VideoOff className="h-8 w-8 text-slate-400" />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-1/3 border-l border-slate-700 flex flex-col">
            <VideoCallChat
              volunteerName={volunteerName}
              volunteerAvatar="👩"
              sessionId={sessionId}
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-slate-800/90 backdrop-blur-sm p-6">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {isMuted ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isVideoOff
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="h-6 w-6 text-white" />
            ) : (
              <Video className="h-6 w-6 text-white" />
            )}
          </button>

          <button
            onClick={() => onEndCall(sessionId)}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg"
          >
            <PhoneOff className="h-7 w-7 text-white" />
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              showChat
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </button>
        </div>

        <p className="text-center text-slate-400 text-sm mt-4">
          Sesión de aprendizaje en progreso
        </p>
      </div>
    </div>
  );
}
