export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  description: string;
  thumbnail?: string;
  averageRating?: number;
  ratingsCount?: number;
  infoLink: string;
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
  categories?: string[];
  language?: string;
  fitNote?: string;
}

export interface SearchResponse {
  topic: string;
  queries: string[];
  intentSummary?: string;
  books: Book[];
}

export type SearchState = 'idle' | 'loading' | 'results' | 'empty' | 'error';
