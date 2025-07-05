export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Borrow {
  _id: string;
  book: string; 
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface BorrowFormData {
  bookId: string;
  quantity: number;
  dueDate: string;
}