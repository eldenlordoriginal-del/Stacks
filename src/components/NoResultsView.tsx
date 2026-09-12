import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import { CURATED_TOPICS } from './TopicChips';

interface NoResultsViewProps {
  topic: string;
  onRetry: () => void;
  onSelectTopic: (topic: string) => void;
}

export const NoResultsView: React.FC<NoResultsViewProps> = ({
  topic,
  onRetry,
  onSelectTopic,
}) => {
  return (
    <div
      id="no-results-view"
      className="max-w-xl mx-auto my-12 p-8 sm:p-10 bg-[#221E17] border border-[#352F24] rounded-2xl text-center shadow-xl"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2B261E] border border-[#352F24] flex items-center justify-center text-[#D8A94A]">
        <Compass className="w-6 h-6" />
      </div>

      <h3 className="font-serif text-2xl font-semibold text-[#ECE4D3] mb-2 tracking-tight">
        The shelves were quiet for &ldquo;{topic}&rdquo;
      </h3>

      <p className="text-sm text-[#9C9384] leading-relaxed mb-6 font-sans">
        We couldn't locate enough authoritative books with complete metadata for this exact phrasing. Try searching for a broader discipline, or phrase it in terms of a craft, skill, or subject.
      </p>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CURATED_TOPICS.slice(0, 4).map((suggested) => (
            <button
              key={suggested}
              type="button"
              id={`suggested-topic-${suggested.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onSelectTopic(suggested)}
              className="text-xs px-3 py-1.5 rounded-full bg-[#17140F] hover:bg-[#2B261E] text-[#ECE4D3] border border-[#352F24] hover:border-[#D8A94A]/50 transition-colors"
            >
              {suggested}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-[#352F24]">
          <button
            type="button"
            id="retry-search-button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B261E] hover:bg-[#352F24] text-xs font-medium text-[#ECE4D3] border border-[#352F24] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D8A94A]" />
            <span>Try another search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
