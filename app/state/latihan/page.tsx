'use client'
import Button from '@/app/component/Button'
import React, { useEffect, useState } from 'react'

type Nilai = {
  id?: number,
  mata_pelajaran: 'Fisika' | 'Kimia' | 'Biologi' | '',
  nilai: 70 | 80 | 90 | 100 | ''
}

const Home = () => {
  const [nilai, setnilai] = useState<Nilai[]>([
    {
      id: 1,
      mata_pelajaran: 'Fisika',
      nilai: 70
    }
  ])

  const [data, setData] = useState<Nilai>({
    mata_pelajaran: '',
    nilai: '',
  })

  const [btnSave, setBtnSave] = useState(true);

  const [count, setCount] = useState(1);
  const getLastIndex = () => {
    setCount(prev => prev + 1)
    return count + 1;
  }

  useEffect(() => {
    if(data.mata_pelajaran != '' && data.nilai != '') {
      setBtnSave(false)
    }
  }, [data])

  return (
    <main>
      {JSON.stringify(data)}
      <section className='p-2'>
        {nilai.map((n, i) => (
          <div key={i} className='border-2 p-2 mb-2 rounded-md shadow-md'>
            <h1>id: {n.id}</h1>
            <h1>Mata Pelajaran: {n.mata_pelajaran}</h1>
            <h1>Nilai: {n.nilai}</h1>
            <Button 
              colorSchema='red'
              title='Delete'
              onClick={() => {
                setnilai((prev) => {
                  return [
                    ...prev.filter((e) => e.id != n.id)
                  ]
                })
              }}
            />
          </div>
        ))}
      </section>

      <section className='p-2'>
        <Button 
          title='Fisika'
          colorSchema='red'
          isDisabled={data.mata_pelajaran === 'Fisika'}
          onClick={() => {
            setData((prev) => {
              return {
                ...prev,
                mata_pelajaran: 'Fisika'
              }
            })
          }}
        />
        <Button 
          title='Kimia'
          colorSchema='green'
          isDisabled={data.mata_pelajaran === 'Kimia'}
          onClick={() => {
            setData((prev) => {
              return {
                ...prev,
                mata_pelajaran: 'Kimia'
              }
            })
          }}
        />
        <Button 
          title='Biologi'
          colorSchema='blue'
          isDisabled={data.mata_pelajaran === 'Biologi'}
          onClick={() => {
            setData((prev) => {
              return {
                ...prev,
                mata_pelajaran: 'Biologi'
              }
            })
          }}
        />
      </section>

      <section className='p-2'>
        <Button 
          title='70'
          colorSchema='red'
          isDisabled={data.nilai === 70}
          onClick={() => {
            setData((prev) => {
              return {
                ...prev,
                nilai: 70
              }
            })
          }}
        />
        <Button 
          title='80'
          colorSchema='green'
          isDisabled={data.nilai === 80}
          onClick={() => {
            setData((prev) => {
              return {
                ...prev,
                nilai: 80
              }
            })
          }}
        />
        <Button 
          title='90'
          colorSchema='blue'
          isDisabled={data.nilai === 90}
          onClick={() => {
            setData((prev) => {
              return {
                ...prev,
                nilai: 90
              }
            })
          }}
        />
        <Button 
          title='100'
          colorSchema='red'
          isDisabled={data.nilai === 100}
          onClick={() => {
            setData((prev) => {
              return {
                ...prev,
                nilai: 100
              }
            })
          }}
        />
      </section>

      <section className='p-2'>
        <Button 
          title='Simpan'
          colorSchema='blue'
          isDisabled={btnSave}
          onClick={() => {
            setnilai((prev) => [
              ...prev,
              {
                id: getLastIndex(),
                mata_pelajaran: data.mata_pelajaran,
                nilai: data.nilai
              }
            ])
            setData((prev) => {
              return {
                ...prev,
                mata_pelajaran: '',
                nilai: ''
              }
            })
            setBtnSave(true)
          }}
        />
      </section>
    </main>
  )
}

export default Home