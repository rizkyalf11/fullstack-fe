"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const PageSiswa = () => {
  const { data: session, status } = useSession();
  const router = useRouter();


  return (
    <div>
      <h1>Halaman Siswa</h1>
      <p>Hello {JSON.stringify(session)}</p>

      <Button
        title="Logout"
        colorSchema="red"
        onClick={() => {
          signOut({redirect: false}).then(() => {
            router.push('/login')
          });
        }}
      />
    </div>
  );
};

export default PageSiswa;