import { useState, useEffect } from 'react';

interface LoveNote {
  from: string;
  to: string;
  message: string;
  color: 'rose' | 'sage' | 'cream' | 'terracotta';
}

interface NoteComposerProps {
  familyMembers: string[];
  onSubmit: (note: LoveNote) => void;
  onClose: () => void;
}

const colorOptions: { value: LoveNote['color']; label: string; bg: string; border: string }[] = [
  { value: 'rose', label: 'Rose', bg: 'bg-rose-100', border: 'border-rose-400' },
  { value: 'sage', label: 'Sage', bg: 'bg-emerald-100', border: 'border-emerald-400' },
  { value: 'cream', label: 'Cream', bg: 'bg-amber-50', border: 'border-amber-400' },
  { value: 'terracotta', label: 'Terracotta', bg: 'bg-orange-100', border: 'border-orange-400' },
];

function NoteComposer({ familyMembers, onSubmit, onClose }: NoteComposerProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<LoveNote['color']>('rose');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && message.trim()) {
      onSubmit({ from, to, message: message.trim(), color });
    }
  };

  const isValid = from && to && message.trim();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-sm shadow-2xl
          border border-rose-100 p-6 md:p-8
          transition-all duration-300
          ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}
        `}
        style={{
          background: 'linear-gradient(135deg, #FFFAF8 0%, #FFF5F0 100%)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h2
          className="text-2xl md:text-3xl text-stone-700 mb-6 md:mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Write a Love Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* From / To row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs uppercase tracking-widest text-stone-500 mb-2"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-sm text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                <option value="">Select...</option>
                {familyMembers.map((member) => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest text-stone-500 mb-2"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-sm text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                <option value="">Select...</option>
                <option value="Everyone">Everyone</option>
                {familyMembers.filter(m => m !== from).map((member) => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              className="block text-xs uppercase tracking-widest text-stone-500 mb-2"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Share your love, gratitude, or a warm thought..."
              className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors resize-none"
              style={{ fontFamily: "'Crimson Text', serif" }}
            />
          </div>

          {/* Color picker */}
          <div>
            <label
              className="block text-xs uppercase tracking-widest text-stone-500 mb-3"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Note Color
            </label>
            <div className="flex gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full ${option.bg}
                    transition-all duration-200
                    ${color === option.value ? `ring-2 ${option.border} ring-offset-2` : 'hover:scale-110'}
                  `}
                  aria-label={option.label}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`
              w-full py-4 rounded-sm text-lg transition-all duration-300
              ${isValid
                ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }
            `}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Send with Love &#10084;
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteComposer;
