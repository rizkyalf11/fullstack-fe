import { ProdukResponse } from "../interface";
import { BaseResponseSuccess, axiosClient } from "@/lib/axiosClient"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hook/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import useAxiosAuth from "@/hook/useAxiosAuth";


const useProdukModule = () => {
  const router = useRouter();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const axiosAuthClient = useAxiosAuth();
  const {data:session} = useSession();

  const getProduk = async(): Promise<ProdukResponse> => {
    return axiosAuthClient.get('/produk/list').then((res) => res.data);
  }

  const useGetProduk = () => {
    const { data, isFetching } = useQuery(
      ['/produk/list'],
      () => getProduk(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true
      }
    )

    return { data, isFetching }
  }

  return { useGetProduk }
}

export default useProdukModule;