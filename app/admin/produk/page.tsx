'use client'
import useProdukModule from '../lib'

const Produk = () => {
	const { useGetProduk } = useProdukModule()
	const { data, isFetching } = useGetProduk()

	if (isFetching) {
		return <h1>Loading...</h1>
	}

	return (
		<>
			<h1>Produk</h1>

			{data?.data.map((_) => (
				<div key={_.id} className="p-8 rounded-md border shadow-md mb-4">
					<h1>{_.nama_produk}</h1>
					<h1>harga {_.harga}</h1>
				</div>
			))}
		</>
	)
}

export default Produk
