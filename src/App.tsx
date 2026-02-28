import { useState, useEffect } from 'react';
import NoteCard from './components/NoteCard';
import NoteComposer from './components/NoteComposer';
import FloatingHearts from './components/FloatingHearts';

interface LoveNote {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: Date;
  color: 'rose' | 'sage' | 'cream' | 'terracotta';
}

const familyMembers = ['Mom', 'Dad', 'Grandma', 'Grandpa', 'Sister', 'Brother', 'You'];

const initialNotes: LoveNote[] = [
  {
    id: '1',
    from: 'Mom',
    to: 'Everyone',
    message: "Just wanted to remind you all how much joy you bring into my life. Every single day, I'm grateful for our beautiful family.",
    timestamp: new Date(Date.now() - 86400000),
    color: 'rose'
  },
  {
    id: '2',
    from: 'Dad',
    to: 'You',
    message: "I saw the sunrise this morning and thought of you. Keep shining bright, kiddo.",
    timestamp: new Date(Date.now() - 172800000),
    color: 'sage'
  },
  {
    id: '3',
    from: 'Grandma',
    to: 'Everyone',
    message: "Sending warm hugs from across the miles. Can't wait to see your smiling faces soon!",
    timestamp: new Date(Date.now() - 259200000),
    color: 'cream'
  }
];

function App() {
  const [notes, setNotes] = useState<LoveNote[]>(initialNotes);
  const [isComposing, setIsComposing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addNote = (note: Omit<LoveNote, 'id' | 'timestamp'>) => {
    const newNote: LoveNote = {
      ...note,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotes([newNote, ...notes]);
    setIsComposing(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #FDF8F4 0%, #FCF1EB 25%, #F9EBE5 50%, #FDF6F0 75%, #FFF9F5 100%)',
        }}
      />

      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Watercolor wash decoration */}
      <div
        className="fixed top-0 right-0 w-96 h-96 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, #D4A5A5 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, #A5B5A5 0%, transparent 70%)',
          transform: 'translate(-20%, 20%)',
        }}
      />

      <FloatingHearts />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header
          className={`pt-8 md:pt-16 pb-6 md:pb-10 px-4 md:px-8 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        >
          <div className="inline-block relative">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-serif text-stone-700 tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Family Love Notes
            </h1>
            <div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-0.5"
              style={{
                background: 'linear-gradient(90deg, transparent, #C9A5A5 20%, #C9A5A5 80%, transparent)'
              }}
            />
          </div>
          <p
            className="mt-6 md:mt-8 text-base md:text-lg text-stone-500 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            A tender space for sharing love, gratitude, and warmth with the people who matter most
          </p>
        </header>

        {/* Compose button */}
        <div
          className={`flex justify-center px-4 mb-8 md:mb-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <button
            onClick={() => setIsComposing(true)}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-200/50"
          >
            <span
              className="text-base md:text-lg text-stone-600 group-hover:text-rose-700 transition-colors"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Write a Love Note
            </span>
            <span className="ml-2 md:ml-3 inline-block transform group-hover:scale-110 transition-transform text-lg md:text-xl">
              &#9829;
            </span>
          </button>
        </div>

        {/* Notes grid */}
        <main className="flex-1 px-4 md:px-8 lg:px-16 pb-8 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {notes.map((note, index) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  index={index}
                  mounted={mounted}
                />
              ))}
            </div>

            {notes.length === 0 && (
              <div className="text-center py-16 md:py-24">
                <p
                  className="text-lg md:text-xl text-stone-400"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  No love notes yet... be the first to share!
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 md:py-8 text-center">
          <p
            className="text-xs text-stone-400/70"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            Requested by @PauliusX · Built by @clonkbot
          </p>
        </footer>
      </div>

      {/* Composer modal */}
      {isComposing && (
        <NoteComposer
          familyMembers={familyMembers}
          onSubmit={addNote}
          onClose={() => setIsComposing(false)}
        />
      )}
    </div>
  );
}

export default App;
