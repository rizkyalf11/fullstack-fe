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