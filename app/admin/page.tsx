"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div>
      Admin
      {JSON.stringify(session)}
      {status}
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

export default Page;