import Button from "../component/Button";
import { Dispatch, SetStateAction } from "react";
import { Hasil, Identitas } from '../state/stateprops/page'

interface BelajarStateProps {
  hasil: Hasil[];
  setHasil: Dispatch<SetStateAction<Hasil[]>>;
  profile: Identitas;
  setProfile: Dispatch<SetStateAction<Identitas>>;
}

const BelajarState: React.FC<BelajarStateProps> = ({
  hasil,
  setHasil,
  profile,
  setProfile,
}) => {
  return (
    <section>
      <h1>Belajar Event</h1>
      <div className="flex flex-col">
        <h5>Nama : {profile.nama}</h5>
        <h5>Sekolah : {profile.sekolah}</h5>
        <h5>Umur : {profile.umur}</h5>
      </div>

      <Button
        title="Ubah Nama"
        variant="solid"
        colorSchema="blue"
        onClick={() => {
          setProfile((prevProfile) => {
            return {
              ...prevProfile,
              nama: "Ilham Maulana Fikri",
            };
          });
        }}
      />
      <Button
        title="Update"
        variant="solid"
        colorSchema="blue"
        onClick={() => {
          setProfile((prevProfile) => {
            return {
              ...prevProfile,
              sekolah: "SMP MADINATULQURAN",
            };
          });
        }}
      />

      <div>
        <h2>Daftar Nilai</h2>
        {hasil.map((n, index) => (
          <section key={index}>
            <h5>Nama Mata pelajaran : {n.mata_pelajaran} </h5>
            <h5>Nilai : {n.nilai} </h5>
          </section>
        ))}
      </div>
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
    </section>
  );
};

export default BelajarState;
