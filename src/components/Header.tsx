import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { CURATED_TOPICS } from './TopicChips';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (topic?: string) => void;
  onResetToHome: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onResetToHome,
  isLoading,
}) => {
  const handleSurpriseMe = () => {
    if (isLoading) return;
    const randomTopic = CURATED_TOPICS[Math.floor(Math.random() * CURATED_TOPICS.length)];
    onSearchChange(randomTopic);
    onSearchSubmit(randomTopic);
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 w-full bg-[#17140F]/90 backdrop-blur-md border-b border-[#352F24] transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand / Home Link */}
        <button
          type="button"
          id="header-brand-button"
          onClick={onResetToHome}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          title="Return to home"
        >
          <div className="w-9 h-9 rounded-xl bg-[#221E17] border border-[#352F24] group-hover:border-[#D8A94A]/60 flex items-center justify-center transition-colors">
            <BookOpen className="w-5 h-5 text-[#D8A94A]" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-xl font-bold tracking-tight text-[#ECE4D3] group-hover:text-[#D8A94A] transition-colors block leading-tight">
              Stacks
            </span>
            <span className="text-[10px] text-[#9C9384] tracking-wider uppercase block">
              Curated Volumes
            </span>
          </div>
        </button>

        {/* Search Bar in Header */}
        <div className="flex-1 max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            isLoading={isLoading}
            size="compact"
          />
        </div>

        {/* Secondary Header Action */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            id="header-surprise-button"
            onClick={handleSurpriseMe}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#221E17] hover:bg-[#2B261E] border border-[#352F24] hover:border-[#D8A94A]/40 text-xs font-medium text-[#ECE4D3] transition-colors cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D8A94A]" />
            <span>Surprise topic</span>
          </button>
        </div>
      </div>
    </header>
  );
};
