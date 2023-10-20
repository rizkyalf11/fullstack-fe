import { axiosClient } from "@/lib/axiosClient"
import { BookListFilter, BookListResponse } from "../interface"
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

const useBookModule = () => {
  const defaultParams = {
    page: 1,
    pageSize: 10
  }

  // Get List
  const getBookList = async (params: BookListFilter): Promise<BookListResponse> => {
		return axiosClient.get('/book/list', { params }).then((res) => res.data);
	}

  const useBookList = () => {
    let [params, setParams] = useState<BookListFilter>(defaultParams)
    let [filterParams, setFilterParams] = useState<BookListFilter>(defaultParams)

    const handleFilter = () => {
      setFilterParams({ ...params });
    };

    const handleClear = () => {
      setFilterParams(defaultParams);
       setParams(defaultParams);
    };

    const handlePage = (page: number) => {
      setParams((params) => ({...params, page: page }))
      setFilterParams((params) => ({...params, page: page }))
    }
    
    const handlePageSize = (e: ChangeEvent<any>) => {
      setParams((params) => ({...params, pageSize: e.target.value, page: 1 }))
      setFilterParams((params) => ({...params, pageSize: e.target.value }))
    }

    const { data, isFetching, isLoading } = useQuery(
      ['/book/list', [filterParams]], 
      () => getBookList(filterParams), 
      {
        select: (response) => response,
      }
    )

    return { data, isFetching, isLoading, params, setParams, filterParams, setFilterParams, handlePage, handlePageSize, handleFilter, handleClear }
  }

  return { useBookList }
}

export default useBookModule;
