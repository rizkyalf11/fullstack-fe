import { BaseResponsePagination } from "@/lib/axiosClient";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number | undefined | string;
  created_at: string;
  updated_at: string;
}

export interface BookListResponse extends BaseResponsePagination {
  data: Book[];
}

export interface BookListFilter extends Partial<Book> {
  from_year?: string;
  to_year?: string;
  page : number ,
  pageSize : number
} 

export interface BookCreatePayload extends Pick<Book, "author" | "title" | "year"> {}
export interface BookUpdatePayload extends Pick<Book, "author" | "title" | "year" | "id"> {}
export interface BookCreateArrayPayload {
  data: BookCreatePayload[];
}

export interface BookCreateResponse {
  status: string;
  message: string;
  data?: Book;
}

export interface BookDetail extends Book{}

export interface BookDeleteArrayPayload {
  delete: number[]
}