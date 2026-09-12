import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles, BookOpen } from 'lucide-react';
import { CURATED_TOPICS } from './TopicChips';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (topic?: string) => void;
  isLoading?: boolean;
  size?: 'large' | 'compact';
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  size = 'large',
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onChange('');
    }
  };

  const handleSurpriseMe = () => {
    if (isLoading) return;
    const randomTopic = CURATED_TOPICS[Math.floor(Math.random() * CURATED_TOPICS.length)];
    onChange(randomTopic);
    onSubmit(randomTopic);
  };

  const isLarge = size === 'large';

  return (
    <form
      id="search-form"
      onSubmit={handleSubmit}
      className={`w-full relative transition-all duration-300 ${
        isLarge ? 'max-w-2xl mx-auto' : 'max-w-xl'
      }`}
    >
      <div
        className={`relative flex items-center bg-[#221E17] border border-[#352F24] rounded-2xl shadow-xl transition-all duration-200 focus-within:border-[#D8A94A] focus-within:ring-2 focus-within:ring-[#D8A94A]/20 ${
          isLarge ? 'p-2 sm:p-2.5' : 'p-1 sm:p-1.5'
        }`}
      >
        <div className="pl-3 pr-2 text-[#9C9384] flex items-center pointer-events-none">
          {isLarge ? (
            <Search className="w-5 h-5 text-[#9C9384] transition-colors group-focus-within:text-[#D8A94A]" />
          ) : (
            <Search className="w-4 h-4 text-[#9C9384]" />
          )}
        </div>

        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to learn?"
          disabled={isLoading}
          autoComplete="off"
          spellCheck={false}
          className={`w-full bg-transparent text-[#ECE4D3] placeholder-[#9C9384]/70 font-sans focus:outline-none disabled:opacity-60 ${
            isLarge ? 'text-base sm:text-lg py-2' : 'text-sm sm:text-base py-1.5'
          }`}
        />

        {value && !isLoading && (
          <button
            type="button"
            id="clear-search-button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="p-1.5 text-[#9C9384] hover:text-[#ECE4D3] hover:bg-[#2B261E] rounded-full transition-colors cursor-pointer mr-1"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-1.5 shrink-0 pr-1">
          {isLarge && (
            <button
              type="button"
              id="surprise-me-button"
              onClick={handleSurpriseMe}
              disabled={isLoading}
              title="Surprise me with an inspiring topic"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#D8A94A] bg-[#2B261E] hover:bg-[#352F24] border border-[#352F24] rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Surprise me</span>
            </button>
          )}

          <button
            type="submit"
            id="search-submit-button"
            disabled={!value.trim() || isLoading}
            className={`flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isLarge
                ? 'px-5 py-2.5 text-sm bg-[#D8A94A] text-[#17140F] hover:bg-[#e4b75a] font-medium shadow-md shadow-[#D8A94A]/10'
                : 'px-3.5 py-1.5 text-xs bg-[#D8A94A] text-[#17140F] hover:bg-[#e4b75a]'
            }`}
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-[#17140F] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Consult Stacks</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
