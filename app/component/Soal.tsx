import { ReactNode } from 'react'

interface SoalProps {
  children: ReactNode;
  color: 'blue' | 'red';
}

const Soal = (props: SoalProps) => {
  return (
    <div className='border-2 border-white p-2 w-[200px]'>
      <div className='mb-4'>
        {props.children}
      </div>

      <button className={`${props.color === 'blue' ? 'bg-blue-400' : 'bg-red-400'} p-2`}>Oke!</button>
    </div>
  )
}

export default Soal