import React from 'react';
import { Sparkles } from 'lucide-react';

interface TopicChipsProps {
  onSelectTopic: (topic: string) => void;
  disabled?: boolean;
}

export const CURATED_TOPICS = [
  'How to speak clearly',
  'Learning cleaning',
  'Karate',
  'Sourdough baking',
  'Personal finance',
  'Stoic philosophy',
  'Woodworking',
  'Night sky astronomy',
];

export const TopicChips: React.FC<TopicChipsProps> = ({ onSelectTopic, disabled }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
      <span className="text-xs text-[#9C9384] flex items-center gap-1.5 mr-1 select-none font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#D8A94A]" />
        Or explore:
      </span>
      {CURATED_TOPICS.map((topic) => (
        <button
          key={topic}
          type="button"
          id={`topic-chip-${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          onClick={() => onSelectTopic(topic)}
          disabled={disabled}
          className="text-xs px-3 py-1.5 rounded-full bg-[#221E17] text-[#ECE4D3] border border-[#352F24] hover:border-[#D8A94A]/60 hover:bg-[#2B261E] hover:text-[#ECE4D3] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-[#D8A94A]"
        >
          {topic}
        </button>
      ))}
    </div>
  );
};
