"use client"; // gunakan use client karena ada onChange pda komponen
import { useState } from "react";
import BelajarState from "@/app/module/belajarstate";

export type Identitas = {
  nama: string;
  sekolah: string;
  umur: number | null;
};

export type Hasil = {
  mata_pelajaran: string;
  nilai: number | null;
};

const Home = () => {
  let [profile, setProfile] = useState<Identitas>({
    // jika sebuah object
    nama: "Ilham Jaya kusuma",
    sekolah: "SMK MADINATULQURAN",
    umur: 17,
  });

  let [hasil, setHasil] = useState<Hasil[]>([
    {
      mata_pelajaran: "matematika",
      nilai: 80,
    },
    {
      mata_pelajaran: "fisika",
      nilai: 90,
    },
    {
      mata_pelajaran: "kimia",
      nilai: 95,
    },
  ]); // jika sebuah array

  return (
    <main className="space-y-5">
      <h1>Hello World</h1>
      <BelajarState hasil={hasil} setHasil={setHasil} profile={profile} setProfile={setProfile} />
    </main>
  );
};

export default Home;
