'use client'
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Table'
import React, { useState } from 'react'
import { DateFormat } from '@/utils'
import useBookModule from './lib'
import { Pagination } from '@/components/Pagination'
import { Drawer } from '@/components/Drawer'
import { useClosure } from '@/hook'
import Button from '@/components/Button'
import Filter from '@/components/Filter'

const BookPage = () => {
	const { useBookList } = useBookModule();

	const { data, isFetching, isLoading, params, handlePage, handlePageSize, setParams, handleClear, handleFilter } = useBookList()
	console.log(params)

	const { isOpen, onClose, onOpen } = useClosure()

	return (
		<>
		<Drawer title='Filter Buku' isOpen={isOpen} onClose={onClose} onClear={handleClear} onSubmit={handleFilter} >
			<Filter params={params} setParams={setParams} />
		</Drawer>
			<section className="container px-4 mx-auto w-full">
				<Button 
					colorSchema='blue'
					title='filter'
					onClick={onOpen}
					isLoading={false}
				/>
				<Table>
					<Thead>
						<Tr>
							<Th scope="col">
								<div className="flex items-center gap-x-3">
									<input
										type="checkbox"
										className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
									/>
								</div>
							</Th>
							<Th scope="col">Title</Th>
							<Th scope="col">Author</Th>
							<Th scope="col">Year</Th>
							<Th scope="col">DiBuat</Th>
							<Th scope="col">DiUpdate</Th>
							{/* <Th scope="col">
								<span className="sr-only">Actions</span>
							</Th> */}
						</Tr>
					</Thead>
					<Tbody>
						{data?.data.map((item, index) => (
							<Tr key={index}>
								<Td>
									<input
										type="checkbox"
										className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
									/>
								</Td>
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
