import React from 'react';
import { BookOpen } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { TopicChips } from './TopicChips';
import { RecentSearches } from './RecentSearches';

interface EmptyStateProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (topic?: string) => void;
  recentSearches: string[];
  onSelectRecent: (topic: string) => void;
  onClearRecent: () => void;
  isLoading: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  recentSearches,
  onSelectRecent,
  onClearRecent,
  isLoading,
}) => {
  return (
    <main
      id="empty-state-view"
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 max-w-3xl mx-auto text-center"
    >
      {/* Decorative Book Icon with Amber Aura */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#D8A94A]/10 blur-xl rounded-full scale-150 pointer-events-none" />
        <div className="relative w-16 h-16 rounded-2xl bg-[#221E17] border border-[#352F24] flex items-center justify-center shadow-lg shadow-black/40">
          <BookOpen className="w-8 h-8 text-[#D8A94A]" />
        </div>
      </div>

      {/* Brand Display Title */}
      <h1
        id="app-hero-title"
        className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#ECE4D3] mb-3"
      >
        Stacks
      </h1>

      <p className="font-serif text-base sm:text-lg text-[#9C9384] max-w-lg mb-8 leading-relaxed italic">
        A quiet reading companion. Type in any skill, topic, or craft to uncover curated, real books from the shelves.
      </p>

      {/* Centerpiece Search Bar */}
      <div className="w-full mb-8">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          isLoading={isLoading}
          size="large"
          autoFocus={true}
        />
      </div>

      {/* Curated Topic Chips */}
      <div className="mb-6 w-full">
        <TopicChips onSelectTopic={onSearchSubmit} disabled={isLoading} />
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="pt-4 border-t border-[#352F24]/60 w-full max-w-md">
          <RecentSearches
            searches={recentSearches}
            onSelect={onSearchSubmit}
            onClear={onClearRecent}
          />
        </div>
      )}
    </main>
  );
};
