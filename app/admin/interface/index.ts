import { BaseResponseSuccess } from "@/lib/axiosClient";

interface Produk {
  id: number;
  nama_produk: string;
  deskripsi_produk: string;
  harga: number;
  stok: number;
  created_by: {
    id: number;
    nama: string;
  };
  updated_by: {
    id: number;
    nama: string;
  } | null;
  kategori: {
    id: number;
    nama_kategori: string;
  };
}

export interface ProdukResponse extends BaseResponseSuccess {
  data: Produk[];
}
