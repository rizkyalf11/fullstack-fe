"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";

const Page = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      Admin
      {JSON.stringify(session)}
      {status}
      <Button
        title="Logout"
        colorSchema="red"
        onClick={() => {
          signOut();
        }}
      />
    </div>
  );
};

export default Page;