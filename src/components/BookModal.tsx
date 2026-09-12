import React, { useEffect } from 'react';
import { X, ExternalLink, Star, Calendar, Layers, BookOpen, Compass, BookmarkCheck } from 'lucide-react';
import type { Book } from '../types';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  const [imageError, setImageError] = React.useState(false);

  useEffect(() => {
    setImageError(false);
  }, [book?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (book) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div
      id="book-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="book-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#221E17] border border-[#352F24] rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
      >
        {/* Close Button */}
        <button
          type="button"
          id="close-modal-button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9C9384] hover:text-[#ECE4D3] hover:bg-[#2B261E] rounded-full transition-colors cursor-pointer"
          title="Close details (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Book Cover */}
          <div className="shrink-0 w-28 sm:w-36 aspect-[2/3] rounded-lg overflow-hidden bg-[#17140F] border border-[#352F24] shadow-lg relative">
            <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />
            {book.thumbnail && !imageError ? (
              <img
                src={book.thumbnail}
                alt={book.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full p-3 flex flex-col justify-between items-center text-center bg-gradient-to-br from-[#2B1F22] to-[#140E10] border-l-2 border-[#7A3B41]">
                <div className="pt-3">
                  <BookOpen className="w-6 h-6 text-[#D8A94A] mx-auto mb-2" />
                  <span className="font-serif text-xs font-semibold text-[#ECE4D3] line-clamp-3">{book.title}</span>
                </div>
                <p className="text-[10px] text-[#9C9384] italic pb-2">{book.authors[0] || 'Curated Volume'}</p>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {book.averageRating && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#7A3B41]/40 border border-[#7A3B41]/60 text-[#ECE4D3] text-xs font-medium">
                  <Star className="w-3 h-3 fill-[#D8A94A] text-[#D8A94A]" />
                  <span>{book.averageRating.toFixed(1)}</span>
                  {book.ratingsCount && (
                    <span className="text-[10px] text-[#ECE4D3]/70">({book.ratingsCount})</span>
                  )}
                </div>
              )}
              {book.categories && book.categories.length > 0 && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2B261E] text-[#D8A94A] border border-[#352F24]">
                  {book.categories[0]}
                </span>
              )}
            </div>

            <h2 id="modal-book-title" className="font-serif text-2xl font-bold text-[#ECE4D3] leading-tight">
              {book.title}
            </h2>

            {book.subtitle && (
              <p className="text-sm text-[#9C9384] italic mt-1">{book.subtitle}</p>
            )}

            <p className="text-sm text-[#9C9384] mt-2">
              by <span className="text-[#ECE4D3] font-medium">{book.authors.join(', ')}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#9C9384] mt-3 pt-3 border-t border-[#352F24]">
              {book.publishedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D8A94A]" />
                  Published {book.publishedDate}
                </span>
              )}
              {book.pageCount && (
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#D8A94A]" />
                  {book.pageCount} pages
                </span>
              )}
              {book.publisher && (
                <span className="inline-flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#D8A94A]" />
                  {book.publisher}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Curator Note Highlight */}
        {book.fitNote && (
          <div className="p-4 rounded-xl bg-[#17140F] border border-[#D8A94A]/30 flex items-start gap-3">
            <Compass className="w-4 h-4 text-[#D8A94A] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-[#D8A94A] uppercase tracking-wider block mb-0.5">
                Why this book fits your topic
              </span>
              <p className="text-sm text-[#ECE4D3] leading-relaxed">{book.fitNote}</p>
            </div>
          </div>
        )}

        {/* Full Synopsis */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold text-[#9C9384] tracking-wider uppercase">
            Volume Synopsis
          </h4>
          <div className="text-sm text-[#ECE4D3]/90 leading-relaxed font-sans max-h-64 overflow-y-auto pr-2 space-y-3">
            {book.description ? (
              <p>{book.description}</p>
            ) : (
              <p className="italic text-[#9C9384]">No publisher description recorded for this volume.</p>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[#352F24] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-[#9C9384] hover:text-[#ECE4D3] transition-colors py-2 px-3"
          >
            Back to results
          </button>

          <a
            id="modal-google-books-link"
            href={book.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D8A94A] hover:bg-[#e4b75a] text-[#17140F] font-medium text-xs transition-colors"
          >
            <span>View on Google Books</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
