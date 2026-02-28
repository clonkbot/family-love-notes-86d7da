import { useMemo } from 'react';

interface LoveNote {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: Date;
  color: 'rose' | 'sage' | 'cream' | 'terracotta';
}

interface NoteCardProps {
  note: LoveNote;
  index: number;
  mounted: boolean;
}

const colorStyles = {
  rose: {
    bg: 'bg-gradient-to-br from-rose-50 to-rose-100/80',
    border: 'border-rose-200/60',
    accent: '#D4A5A5',
  },
  sage: {
    bg: 'bg-gradient-to-br from-emerald-50/80 to-stone-100',
    border: 'border-emerald-200/50',
    accent: '#A5B5A5',
  },
  cream: {
    bg: 'bg-gradient-to-br from-amber-50/60 to-orange-50/40',
    border: 'border-amber-200/50',
    accent: '#C9B896',
  },
  terracotta: {
    bg: 'bg-gradient-to-br from-orange-50 to-rose-50/60',
    border: 'border-orange-200/50',
    accent: '#C9A588',
  },
};

function NoteCard({ note, index, mounted }: NoteCardProps) {
  const rotation = useMemo(() => {
    const rotations = [-2, 1.5, -1, 2, -1.5, 1];
    return rotations[index % rotations.length];
  }, [index]);

  const style = colorStyles[note.color];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <article
      className={`
        group relative p-5 md:p-6 rounded-sm shadow-md hover:shadow-xl
        transition-all duration-500 cursor-default
        ${style.bg} ${style.border} border
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{
        transform: mounted ? `rotate(${rotation}deg)` : `rotate(${rotation}deg) translateY(48px)`,
        transitionDelay: `${400 + index * 150}ms`,
      }}
    >
      {/* Paper fold effect */}
      <div
        className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${style.accent}20 50%)`,
        }}
      />

      {/* Decorative corner */}
      <div
        className="absolute top-3 left-3 w-2 h-2 rounded-full opacity-60"
        style={{ backgroundColor: style.accent }}
      />

      {/* From/To */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span
            className="text-xs uppercase tracking-widest text-stone-400"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            From
          </span>
          <p
            className="text-lg md:text-xl text-stone-700 -mt-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          >
            {note.from}
          </p>
        </div>
        <div className="text-right">
          <span
            className="text-xs uppercase tracking-widest text-stone-400"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            To
          </span>
          <p
            className="text-lg md:text-xl text-stone-700 -mt-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          >
            {note.to}
          </p>
        </div>
      </div>

      {/* Decorative line */}
      <div
        className="w-full h-px mb-4 opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${style.accent} 20%, ${style.accent} 80%, transparent)`
        }}
      />

      {/* Message */}
      <p
        className="text-stone-600 leading-relaxed text-base md:text-lg mb-4"
        style={{ fontFamily: "'Crimson Text', serif" }}
      >
        "{note.message}"
      </p>

      {/* Timestamp */}
      <div className="flex items-center justify-end">
        <span
          className="text-xs text-stone-400 italic"
          style={{ fontFamily: "'Crimson Text', serif" }}
        >
          {formatDate(note.timestamp)}
        </span>
      </div>

      {/* Hover heart */}
      <div
        className="absolute bottom-3 left-3 text-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{ color: style.accent }}
      >
        &#10084;
      </div>
    </article>
  );
}

export default NoteCard;
