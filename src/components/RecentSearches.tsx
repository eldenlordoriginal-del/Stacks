import React from 'react';
import { History, X } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (topic: string) => void;
  onClear: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelect,
  onClear,
}) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
      <div className="flex items-center gap-1 text-[#9C9384]">
        <History className="w-3.5 h-3.5" />
        <span>Recent:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {searches.map((topic, i) => (
          <button
            key={`${topic}-${i}`}
            type="button"
            id={`recent-search-${i}`}
            onClick={() => onSelect(topic)}
            className="px-2.5 py-1 rounded-md bg-[#221E17] hover:bg-[#2B261E] text-[#ECE4D3] border border-[#352F24] hover:border-[#D8A94A]/40 transition-colors cursor-pointer"
          >
            {topic}
          </button>
        ))}

        <button
          type="button"
          id="clear-recent-searches-button"
          onClick={onClear}
          title="Clear search history"
          className="text-[#9C9384] hover:text-[#ECE4D3] p-1 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
