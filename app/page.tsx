"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <main>
      {JSON.stringify(session)}
      <h1>Hello World</h1>
      {!!session && (
        <button onClick={() => signOut({redirect: false}).then(() => {
          router.push('/login')
        })}>logout</button>
      )}
    </main>
  );
};

export default Home;
