import Button from "@/app/component/Button";
import { Dispatch, SetStateAction } from "react";

interface CardProps {
  tanggal: number;
  setTanggal: Dispatch<SetStateAction<number>>;
  bulan: string;
  setBulan: Dispatch<SetStateAction<string>>;
}

const Card: React.FC<CardProps> = ({ tanggal, setTanggal, bulan, setBulan }) => {
  return (
    <section className="w-[220px] m-2 shadow-md">
      <div className="w-full bg-red-500 text-white h-12 flex items-center justify-center text-lg rounded-t-xl">{bulan}</div>
      <div className="bg-white w-full flex flex-col items-center rounded-b-xl ">
        <h1 className="text-8xl">{tanggal}</h1>
        <section className="my-2">
          <Button title="clear" colorSchema="red" onClick={() => {
            setTanggal(0)
            setBulan('Agustus')
          }} />
        </section>
      </div>
    </section>
  )
}

export default Card