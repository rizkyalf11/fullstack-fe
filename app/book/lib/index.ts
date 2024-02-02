import { axiosClient } from "@/lib/axiosClient"
import { BookCreateArrayPayload, BookCreatePayload, BookCreateResponse, BookDeleteArrayPayload, BookDetail, BookListFilter, BookListResponse, BookUpdatePayload } from '@/app/book/interface'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { usePagination } from "@/hook/usePagination";
import { useToast } from "@/hook/useToast";

const useBookModule = () => {
  const queryClient = useQueryClient();
  const { toastError, toastSuccess, toastWarning } = useToast();

  const defaultParams = {
    page: 1,
    pageSize: 10,
    title: "",
    author: "",
    from_year: "",
    to_year: ""
  }

  // Get List
  const getBookList = async (params: BookListFilter): Promise<BookListResponse> => {
		return axiosClient.get('/book/list', { params }).then((res) => res.data);
	}

  const useBookList = () => {
    const{
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams
    } = usePagination(defaultParams)  

    const { data, isFetching, isLoading } = useQuery(
      ['/book/list', [filterParams]], 
      () => getBookList(filterParams), 
      {
        select: (response) => response,
      }
    )

    return { data, isFetching, isLoading, params, setParams, filterParams, handlePage, handlePageSize, handleFilter, handleClear }
  }

  // Create Book
  const createBook = async(payload: BookCreatePayload): Promise<BookCreateResponse> => {
    return axiosClient.post('/book/create', payload).then(res => res.data);
  }

  const useCreateBook = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BookCreatePayload) => {
        return axiosClient.post("/book/create", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
        },
        onError: (error) => {
         toastError()
        },
        onSettled: () => {}
      }
    );
    return { mutate, isLoading };
  };

  // Get Detail
  const getDetailBook = async (
    id:string
  ): Promise<BookDetail> => {
    return axiosClient.get(`/book/detail/${id}`).then((res) => res.data.data);
  };

  const useDetailBook = (id:string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/book/detail", { id }],
      () => getDetailBook(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };

  }

  // Update Book
  const useUpdateBook = (id:string) => {
    const { mutate, isLoading } = useMutation(
      (payload: BookUpdatePayload) => {
        return axiosClient.put(`/book/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/book/detail"]);
        },

        onError: (error) => {
          alert("ok");
        },
      }
    );
    return { mutate, isLoading };
  }

  // Delete
  const useDeleteBook = () => {
    const {mutate, isLoading} = useMutation(
      (id:number) => {
        return axiosClient.delete(`/book/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/book/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.data.message.response);
          } else {
            toastError()
          }
        },
      }
    );

    return {mutate, isLoading}
  };

  // Create Bulk
  const useCreateBulkBook = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BookCreateArrayPayload) => {
        return axiosClient.post("/book/create/bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
        },
        onError: (error) => {
          toastError()
        },
      }
    );
    return { mutate, isLoading };
  };

  // Delete Bulk
  const useDeleteBulkBook = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BookDeleteArrayPayload) => {
        return axiosClient.post("/book/delete/bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)

          queryClient.invalidateQueries(["/book/list"]);
        },
        onError: (error) => {
          toastError()
        },
      }
    );
    return { mutate, isLoading };
  };


  return { useBookList, useCreateBook, useDetailBook, useUpdateBook, useDeleteBook, useCreateBulkBook, useDeleteBulkBook }
}


export default useBookModule;
