interface CondProps {
  warna: 'merah' | 'biru';
  pesan: string;
}

const Conditonal: React.FC<CondProps> = ({ warna, pesan }) => {
  return (
    <>
      {warna === 'merah' ? (
        <div className="w-[200px] h-[200px] bg-red-500">
          <p className="text-white">{pesan}</p>
        </div>
      ) : (
        <div className="w-[200px] h-[200px] bg-blue-500">
          <p className="text-white">{pesan}</p>
        </div>
      )}
    </>
  )
}

export default Conditonal;