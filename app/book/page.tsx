'use client'
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Table'
import React, { useMemo, useState } from 'react'
import { DateFormat } from '@/utils'
import useBookModule from './lib'
import { Pagination } from '@/components/Pagination'
import { Drawer } from '@/components/Drawer'
import { useClosure } from '@/hook'
import Button from '@/components/Button'
import Filter from '@/components/Filter'
import { useRouter } from 'next/navigation'
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import Swal from 'sweetalert2'
import { useConfirmDelete } from '@/hook/useConfirmDelete'
import { useConfirmDeleteBulk } from '@/hook/useConfirmBulkDelete'

const BookPage = () => {
	const { useBookList, useDeleteBook, useDeleteBulkBook } = useBookModule();

	const {mutate, isLoading } = useDeleteBook()
	const { mutate: mutateDeleteBulk, isLoading: isLoadingDeleteBulk } = useDeleteBulkBook();

	const { data, isFetching, params, handlePage, handlePageSize, setParams, handleClear, handleFilter } = useBookList()

	const { isOpen, onClose, onOpen } = useClosure()

	const router = useRouter()

	const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  })

	// const [deletePayload, setDeletePayload] = useState<number[]>([]);

  const { handleDeleteBulk, deletePayload, setDeletePayload, checked } =
	useConfirmDeleteBulk({
		data: data,
		onSubmit: (payload) => {
			mutateDeleteBulk(
				{ delete: payload },
				{
					onSuccess: () => {
						setDeletePayload([]);
					},
				}
			);
		},
	});

	return (
		<>
		<Drawer title='Filter Buku' isOpen={isOpen} onClose={onClose} onClear={handleClear} onSubmit={handleFilter} >
			<Filter params={params} setParams={setParams} />
		</Drawer>
			<section className="container px-4 mx-auto w-full">
				<div className='flex w-full justify-between'>
					<div className='w-24'>
						<Button 
							colorSchema='blue'
							title='filter'
							onClick={onOpen}
							isLoading={false}
						/>
						<Button 
							colorSchema='red'
							title='hapus'
							onClick={() => {
								handleDeleteBulk(deletePayload)
							}}
							isLoading={isLoadingDeleteBulk}
							isDisabled={deletePayload.length === 0}
						/>
					</div>
					<div className='w-24'>
						<Button 
							colorSchema='green'
							title='create'
							onClick={() => router.push('/book/create')}
							isLoading={false}
						/>
						<Button 
							colorSchema='red'
							title='create bulk'
							onClick={() => router.push('/book/tambah-bulk')}
							isLoading={false}
						/>
					</div>
				</div>
				<Table>
					<Thead>
						<Tr>

							<Th scope="col">
								<div className="flex items-center gap-x-3">
									<input
                      checked={checked.isAllCheced}
                      onChange={() => {
                        if (checked.isAllCheced) {
                          setDeletePayload([]);
                        } else {
                          setDeletePayload((state) => {
                            if (!data) {
                              return [];
                            }

                            const selected: number[] = Array.from(
                              new Set([
                                ...state,
                                ...data?.data?.map((n) => Number(n.id)),
                              ])
                            );

                            return [...selected];
                          });
                        }
                      }}
                      type="checkbox"
                      className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                    />
								</div>
							</Th>
							<Th scope="col">No</Th>
							<Th scope="col">Title</Th>
							<Th scope="col">Author</Th>
							<Th scope="col">Year</Th>
							<Th scope="col">DiBuat</Th>
							<Th scope="col">DiUpdate</Th>
							<Th scope="col">Aksi</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data?.data.map((item, index) => (
							<Tr key={index}>
								<Td>
									<input
										checked={deletePayload.includes(item.id)}
										onChange={(e) => {
											if (e.target.checked) {
												setDeletePayload((state) => [...state, item.id]);
											} else {
												const filtered = deletePayload.filter(
													(n) => n !== item.id
												);
												setDeletePayload(filtered);
											}
										}}
										type="checkbox"
										className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
									/>
								</Td>
								<Td>{(params.page - 1) * params.pageSize + index + 1}</Td>
								<Td>
									<span>{item.title}</span>
								</Td>
								<Td>
									<span>{item.author}</span>
								</Td>
								<Td>
									<span>{item.year}</span>
								</Td>
								<Td>
									<span>{DateFormat.formatDateInd(item.created_at)}</span>
								</Td>
								<Td>
									<span>{DateFormat.formatDateInd(item.updated_at)}</span>
								</Td>
								<Td>
									<DeleteButton
										isLoading={isLoading}
										onClick={() => {
											handleDelete(item.id || 0);
										}}
									/>
									<EditButton
										onClick={() => {
											router.push(`book/${item.id}/edit`)
										}}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
				<Pagination 
					 page={params.page}
					 pageSize={params.pageSize}
					 handlePageSize={handlePageSize}
					 handlePage={handlePage}
					 pagination={data?.pagination}
				/>
			</section>
		</>
	)
}

export default BookPage
