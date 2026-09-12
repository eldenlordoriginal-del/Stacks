import React, { useState, useEffect, useCallback } from 'react';
import type { Book, SearchResponse, SearchState } from './types';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';
import { LoadingView } from './components/LoadingView';
import { BookCard } from './components/BookCard';
import { BookModal } from './components/BookModal';
import { NoResultsView } from './components/NoResultsView';
import { Compass, BookOpen, Layers } from 'lucide-react';

const RECENT_SEARCHES_KEY = 'stacks_recent_topics';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState('');
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [books, setBooks] = useState<Book[]>([]);
  const [intentSummary, setIntentSummary] = useState<string | undefined>();
  const [exploredQueries, setExploredQueries] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 6));
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveRecentSearch = useCallback((topic: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== topic.toLowerCase());
      const updated = [topic, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const handleSearch = useCallback(
    async (overrideTopic?: string) => {
      const target = (overrideTopic !== undefined ? overrideTopic : searchQuery).trim();
      if (!target) return;

      if (overrideTopic) {
        setSearchQuery(overrideTopic);
      }

      setActiveTopic(target);
      setSearchState('loading');
      setErrorMessage(null);
      saveRecentSearch(target);

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic: target }),
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const data = (await response.json()) as SearchResponse;

        if (data.books && data.books.length > 0) {
          setBooks(data.books);
          setIntentSummary(data.intentSummary);
          setExploredQueries(data.queries || []);
          setSearchState('results');
        } else {
          setBooks([]);
          setSearchState('empty');
        }
      } catch (err) {
        console.warn('Search lookup notice:', err);
        // Prompt directive 4: friendly suggestion to rephrase, not a raw error
        setBooks([]);
        setSearchState('empty');
      }
    },
    [searchQuery, saveRecentSearch]
  );

  const handleResetToHome = () => {
    setSearchState('idle');
    setSearchQuery('');
    setActiveTopic('');
    setBooks([]);
    setErrorMessage(null);
  };

  const isIdle = searchState === 'idle';

  return (
    <div className="min-h-screen bg-[#17140F] text-[#ECE4D3] flex flex-col font-sans selection:bg-[#D8A94A]/25 selection:text-[#ECE4D3]">
      {/* Pinned Header when not in idle mode */}
      {!isIdle && (
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearch}
          onResetToHome={handleResetToHome}
          isLoading={searchState === 'loading'}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {isIdle ? (
          <EmptyState
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
            recentSearches={recentSearches}
            onSelectRecent={handleSearch}
            onClearRecent={clearRecentSearches}
            isLoading={searchState === 'loading'}
          />
        ) : searchState === 'loading' ? (
          <LoadingView topic={activeTopic} />
        ) : searchState === 'empty' || searchState === 'error' ? (
          <div className="px-4 py-8">
            <NoResultsView
              topic={activeTopic}
              onRetry={handleResetToHome}
              onSelectTopic={handleSearch}
            />
          </div>
        ) : (
          /* Results View */
          <main id="search-results-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            {/* Results Header / Intent Banner */}
            <div className="mb-8 pb-6 border-b border-[#352F24]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#D8A94A] font-medium mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Curated reading list</span>
                  </div>
                  <h2
                    id="results-topic-title"
                    className="font-serif text-3xl sm:text-4xl font-bold text-[#ECE4D3] tracking-tight capitalize"
                  >
                    {activeTopic}
                  </h2>
                  {intentSummary && (
                    <p className="text-sm sm:text-base text-[#9C9384] mt-1.5 max-w-2xl leading-relaxed">
                      {intentSummary}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#9C9384] shrink-0 self-start md:self-auto">
                  <Layers className="w-4 h-4 text-[#D8A94A]" />
                  <span>{books.length} authoritative volumes</span>
                </div>
              </div>

              {/* Exploration Queries */}
              {exploredQueries.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#352F24]/50">
                  <span className="text-[11px] text-[#9C9384] mr-1">Interpreted queries:</span>
                  {exploredQueries.map((q, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#221E17] text-[#ECE4D3] border border-[#352F24]"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Book Cards Grid */}
            <div
              id="books-grid"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {books.map((book, idx) => (
                <BookCard
                  key={book.id}
                  book={book}
                  index={idx}
                  onSelectBook={setSelectedBook}
                />
              ))}
            </div>
          </main>
        )}
      </div>

      {/* Subtle Footer */}
      <footer className="mt-auto py-6 border-t border-[#352F24]/60 text-center text-xs text-[#9C9384] px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Stacks · A quiet reading room at night</span>
          <span className="text-[11px] text-[#9C9384]/80">
            Real book data from Google Books API · Curated with Gemini
          </span>
        </div>
      </footer>

      {/* Detail Modal */}
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
