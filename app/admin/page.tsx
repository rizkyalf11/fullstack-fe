"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useAuthModule from "../(auth)/lib";

const Page = () => {
  const {useProfile} = useAuthModule()
  const {data:profile, isFetching} = useProfile()
  const { data: session } = useSession()

  const router = useRouter();

  if(isFetching) {
    return <h1>Loading..</h1>
  }

  return (
    <div className="w-full">
      Admin
      {JSON.stringify(profile)}
      <hr />
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