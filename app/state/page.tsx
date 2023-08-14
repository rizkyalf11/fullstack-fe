"use client"; // gunakan use client karena ada onChange pda komponen
import { useState } from "react";
import Button from "../component/Button";

type Identitas = {
  nama: string;
  sekolah: string;
  umur: number | null;
};

type Hasil = {
  mata_pelajaran: string;
  nilai: number | null;
};

const State = () => {
  let [message, setMessage] = useState("hai"); // jika string, dengan data awal "hai"
  let [count, setCount] = useState(0); // jika number , dengan data awal 0
  let [isLogin, setIsLogin] = useState(false); // jika booelan, dengan data awal false
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

      <p>message addalah {message}</p>

      <p>Count adalah {count}</p>

      <p> {isLogin ? "Sudah Login" : "Belum Login"}</p>

      <div className="flex flex-col">
        <h5>Nama : {profile.nama}</h5>
        <h5>Sekolah : {profile.sekolah}</h5>
        <h5>Umur : {profile.umur}</h5>
      </div>

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
        title="Hello"
        variant="solid"
        colorSchema="blue"
        onClick={() => {
          setMessage("Hello");
        }}
      />

      <Button
        title="Salam"
        variant="outline"
        colorSchema="blue"
        onClick={() => {
          setMessage("Assalamualaikum");
        }}
      />

    <p>Count adalah {count}</p>
      <Button
        title="Tambah"
        variant="solid"
        colorSchema="blue"
        onClick={() => {
          setCount((prevCount) => prevCount + 1);
        }}
      />
      <Button
        title="Kurang"
        isDisabled={count < 1}
        variant="solid"
        colorSchema="red"
        onClick={() => {
          setCount((prevCount) => prevCount - 1);
        }}
      />

    <p> {isLogin ? "Sudah Login" : "Belum Login"}</p>
      <Button
        title="Login"
        isDisabled={isLogin === true}
        variant="solid"
        colorSchema="blue"
        onClick={() => {
          setIsLogin(true);
        }}
      />
      <Button
        title="Logout"
        isDisabled={isLogin === false}
        variant="solid"
        colorSchema="red"
        onClick={() => {
          setIsLogin(false);
        }}
      />
    </main>
  );
};

export default State;
