import { useState } from 'react';
import { Star, MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface RatingModalProps {
  volunteerName: string;
  topic: string;
  onSubmit: (rating: number, comment: string) => void;
  onSkip: () => void;
}

export function RatingModal({ volunteerName, topic, onSubmit, onSkip }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800">¿Cómo estuvo la sesión?</h3>
          <button
            onClick={onSkip}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-slate-600 text-sm mb-1">Con {volunteerName}</p>
          <p className="text-slate-500 text-sm">{topic}</p>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <p className="text-slate-700 text-sm mb-3 text-center">
            Califica tu experiencia
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-10 w-10 ${
                    star <= (hoveredRating || rating)
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="flex items-center text-slate-700 mb-2 text-sm">
            <MessageCircle className="h-4 w-4 text-slate-400 mr-2" />
            Comentario (opcional)
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="¿Qué tal estuvo la sesión?"
            className="rounded-xl resize-none"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl disabled:opacity-50"
          >
            Enviar Calificación
          </Button>
          <Button
            onClick={onSkip}
            variant="ghost"
            className="w-full h-10 rounded-xl text-slate-600"
          >
            Omitir
          </Button>
        </div>
      </div>
    </div>
  );
}
