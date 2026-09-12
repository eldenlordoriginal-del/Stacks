import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface LoadingViewProps {
  topic: string;
}

const LOADING_PHRASES = [
  'Interpreting your learning intent...',
  'Browsing through the library stacks...',
  'Gathering authoritative volumes on Google Books...',
  'Filtering duplicates and verifying editions...',
  'Writing curator notes on why each book fits your goals...',
];

export const LoadingView: React.FC<LoadingViewProps> = ({ topic }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="loading-view"
      className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-16 text-center max-w-md mx-auto"
    >
      {/* Warm Reading Lamp & Book Pulse Indicator */}
      <div className="relative mb-8">
        {/* Soft amber radial glow behind */}
        <div className="absolute inset-0 bg-[#D8A94A]/15 blur-2xl rounded-full scale-150 animate-pulse" />

        <div className="relative w-20 h-20 rounded-2xl bg-[#221E17] border border-[#352F24] flex items-center justify-center shadow-xl shadow-black/40">
          <BookOpen className="w-9 h-9 text-[#D8A94A] animate-pulse" />
        </div>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#ECE4D3] mb-2 tracking-tight">
        Exploring the stacks for &ldquo;{topic}&rdquo;
      </h3>

      <p className="text-sm text-[#9C9384] h-6 transition-all duration-300 font-sans">
        {LOADING_PHRASES[phraseIndex]}
      </p>

      {/* Subtle warm progress bar */}
      <div className="w-48 h-1 bg-[#221E17] rounded-full overflow-hidden mt-6 border border-[#352F24]">
        <div className="h-full bg-gradient-to-r from-[#B38634] via-[#D8A94A] to-[#B38634] rounded-full w-full animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
};
