import React, { useState } from 'react';
import { ExternalLink, Star, BookOpen, Compass, Calendar, Layers } from 'lucide-react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  index: number;
  onSelectBook: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, index, onSelectBook }) => {
  const [imageError, setImageError] = useState(false);

  const formattedRating = book.averageRating ? book.averageRating.toFixed(1) : null;
  const publishedYear = book.publishedDate ? book.publishedDate.slice(0, 4) : null;

  const spinePalettes = [
    { border: 'border-l-[#7A3B41]', bg: 'from-[#2B1F22] to-[#150F11]', text: 'text-[#E8CDD1]' }, // Burgundy
    { border: 'border-l-[#395344]', bg: 'from-[#1B2720] to-[#0E1511]', text: 'text-[#C9DFD2]' }, // Hunter Green
    { border: 'border-l-[#2E4259]', bg: 'from-[#192430] to-[#0E131A]', text: 'text-[#CBD9E8]' }, // Oxford Blue
    { border: 'border-l-[#8B5A2B]', bg: 'from-[#2D1F13] to-[#17100A]', text: 'text-[#E8D4C1]' }, // Saddle Leather
    { border: 'border-l-[#6A3C6E]', bg: 'from-[#261727] to-[#130B14]', text: 'text-[#E1CCE3]' }, // Royal Plum
  ];
  const palette = spinePalettes[index % spinePalettes.length];

  return (
    <article
      id={`book-card-${book.id}`}
      className="group relative flex flex-col sm:flex-row gap-5 p-5 bg-[#221E17] hover:bg-[#27221A] border border-[#352F24] hover:border-[#D8A94A]/40 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D8A94A]/5"
    >
      {/* Book Cover Container */}
      <div className="shrink-0 flex sm:flex-col items-center sm:items-start justify-center sm:justify-start">
        <div className="relative w-28 sm:w-32 aspect-[2/3] rounded-lg overflow-hidden bg-[#17140F] border border-[#352F24] shadow-md transition-transform duration-300 group-hover:-translate-y-1">
          {/* Faux spine shadow */}
          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />

          {book.thumbnail && !imageError ? (
            <img
              src={book.thumbnail}
              alt={`Cover for ${book.title}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            /* Typographic Leather-Style Fallback Cover */
            <div className={`w-full h-full p-2.5 flex flex-col justify-between bg-gradient-to-br ${palette.bg} ${palette.text} text-center border-l-2 ${palette.border}`}>
              <div className="pt-2">
                <BookOpen className="w-5 h-5 mx-auto text-[#D8A94A]/90 mb-1" />
                <p className="font-serif text-[11px] leading-tight font-medium line-clamp-3 text-[#ECE4D3]">
                  {book.title}
                </p>
              </div>
              <p className="text-[9px] text-[#9C9384] line-clamp-1 italic">
                {book.authors[0] || 'Curated Volume'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Book Information */}
      <div className="flex flex-col flex-1 min-w-0 justify-between">
        <div>
          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {formattedRating && (
              <div
                id={`rating-badge-${book.id}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#7A3B41]/35 border border-[#7A3B41]/50 text-[#ECE4D3] text-xs font-medium"
                title={`${book.ratingsCount || 0} reviews on Google Books`}
              >
                <Star className="w-3 h-3 fill-[#D8A94A] text-[#D8A94A]" />
                <span>{formattedRating}</span>
                {book.ratingsCount && (
                  <span className="text-[10px] text-[#ECE4D3]/70">({book.ratingsCount})</span>
                )}
              </div>
            )}

            {publishedYear && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#9C9384]">
                <Calendar className="w-3 h-3 text-[#9C9384]/70" />
                {publishedYear}
              </span>
            )}

            {book.pageCount && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#9C9384]">
                <Layers className="w-3 h-3 text-[#9C9384]/70" />
                {book.pageCount} pages
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            id={`book-title-${book.id}`}
            onClick={() => onSelectBook(book)}
            className="font-serif text-lg sm:text-xl font-semibold text-[#ECE4D3] leading-snug tracking-tight hover:text-[#D8A94A] transition-colors cursor-pointer line-clamp-2"
          >
            {book.title}
          </h3>

          {/* Subtitle if available */}
          {book.subtitle && (
            <p className="text-xs text-[#9C9384] italic mt-0.5 line-clamp-1">
              {book.subtitle}
            </p>
          )}

          {/* Authors */}
          <p className="text-xs sm:text-sm text-[#9C9384] mt-1 font-medium">
            by{' '}
            <span className="text-[#ECE4D3]/90">
              {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown Author'}
            </span>
          </p>

          {/* Curated "Why this fits" Note */}
          {book.fitNote && (
            <div className="mt-3 p-2.5 rounded-xl bg-[#17140F]/80 border border-[#D8A94A]/25 relative">
              <div className="flex items-start gap-2">
                <Compass className="w-3.5 h-3.5 text-[#D8A94A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#ECE4D3] leading-relaxed font-sans">
                  <span className="text-[#D8A94A] font-medium mr-1">Curator's note:</span>
                  {book.fitNote}
                </p>
              </div>
            </div>
          )}

          {/* Description Snippet */}
          {book.description && (
            <p className="mt-2.5 text-xs text-[#9C9384] leading-relaxed line-clamp-2 font-sans">
              {book.description}
            </p>
          )}
        </div>

        {/* Action Footers */}
        <div className="mt-4 pt-3 border-t border-[#352F24] flex items-center justify-between gap-3">
          <button
            type="button"
            id={`inspect-book-${book.id}`}
            onClick={() => onSelectBook(book)}
            className="text-xs font-medium text-[#ECE4D3] hover:text-[#D8A94A] transition-colors cursor-pointer py-1"
          >
            Read full synopsis
          </button>

          <a
            id={`google-books-link-${book.id}`}
            href={book.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B261E] hover:bg-[#352F24] border border-[#352F24] hover:border-[#D8A94A]/40 text-xs font-medium text-[#ECE4D3] transition-colors"
            title="Open on Google Books in a new tab"
          >
            <span>Google Books</span>
            <ExternalLink className="w-3 h-3 text-[#D8A94A]" />
          </a>
        </div>
      </div>
    </article>
  );
};
