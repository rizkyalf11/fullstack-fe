'use client'
import React, { useState } from 'react'
import Button from '../component/Button'

type Identitas = {
	nama: string
	sekolah: string
	umur: number | null
}

type Hasil = {
	mata_pelajaran: string
	nilai: number | null
}

const Home = () => {
	const [message, setMessage] = useState('hello')
	const [count, setCount] = useState(0)
	const [isLogin, setIsLogin] = useState(false)
	const [profile, setProfile] = useState<Identitas>({
		nama: 'Ilham Jaya Kusuma',
		sekolah: 'SMK Madinatul Quran',
		umur: 17,
	})

	let [hasil, setHasil] = useState<Hasil[]>([
		{
			mata_pelajaran: 'matematika',
			nilai: 80,
		},
		{
			mata_pelajaran: 'fisika',
			nilai: 90,
		},
		{
			mata_pelajaran: 'kimia',
			nilai: 95,
		},
	])

	return (
		<main>
			<div>
				<h2>Daftar Nilai</h2>
				{hasil.map((n, index) => (
					<section key={index}>
						<h5>Nama Mata pelajaran : {n.mata_pelajaran} </h5>
						<h5>Nilai : {n.nilai} </h5>
					</section>
				))}
        <Button
          title="Tambah"
          variant="solid"
          colorSchema="blue"
          onClick={() => {
            setHasil((prevHasil) => {
              return [
                ...prevHasil,
                {
                  mata_pelajaran: "B. Indonesia",
                  nilai: 100,
                },
              ];
            });
          }}
        />
        <Button
          title="Kurang"
          isDisabled={hasil.length <= 1}
          variant="solid"
          colorSchema="red"
          onClick={() => {
            setHasil((prevHasil) => {
              prevHasil.pop();
              return [...prevHasil];
            });
          }}
        />
			</div>

			<h1 className="text-2xl m-2">
				nama adalah {profile.nama} dan sekolah di {profile.sekolah} alamat -
			</h1>
			<Button
				title="ubah nama"
				colorSchema="blue"
				variant="solid"
				onClick={() => {
					setProfile((prevProfile) => {
						return {
							...prevProfile,
							nama: 'rizky a',
						}
					})
				}}
			/>
			<Button
				title="reset"
				colorSchema="blue"
				variant="solid"
				onClick={() => {
					setProfile((prevProfile) => {
						return {
							...prevProfile,
							nama: 'Ilham Jaya Kusuma',
						}
					})
				}}
			/>

			<h1 className="text-2xl">{message}</h1>
			<Button
				title="button 1"
				colorSchema="blue"
				variant="solid"
				onClick={() => {
					setMessage('hello')
				}}
			/>
			<Button
				title="button 2"
				colorSchema="red"
				variant="solid"
				onClick={() => {
					setMessage('hello ihsan')
				}}
			/>

			<h1 className="text-2xl">{count}</h1>
			<Button
				title="button +"
				colorSchema="blue"
				variant="solid"
				onClick={() => {
					setCount((prev) => {
						console.log(prev)
						return prev + 1
					})
				}}
			/>
			<Button
				title="button -"
				colorSchema="blue"
				variant="solid"
				isDisabled={count === 0}
				onClick={() => {
					setCount((prev) => {
						console.log(prev)
						return prev - 1
					})
				}}
			/>

			<h1>{isLogin ? 'Sudah Login' : 'Belum Login'}</h1>
			<Button
				title="log in"
				colorSchema="blue"
				variant="solid"
				isDisabled={isLogin}
				onClick={() => {
					setIsLogin(true)
				}}
			/>
			<Button
				title="log out"
				colorSchema="blue"
				variant="solid"
				isDisabled={!isLogin}
				onClick={() => {
					setIsLogin(false)
				}}
			/>
		</main>
	)
}

export default Home
