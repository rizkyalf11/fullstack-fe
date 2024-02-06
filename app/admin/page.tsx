"use client"
import Button from '@/components/Button';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'
import useAuthModule from '../auth/lib/index';


const AdminPage = () => {
  const router = useRouter();
  const { useProfile } = useAuthModule()
  const { data: profile, isFetching } = useProfile()
  const { data: session, status } = useSession();
  console.log("🚀 ~ AdminPage ~ session:", session)
  console.log('profile', profile)
  return (
    <div>
      <p>Halaman Admin</p>

      <Button 
        title='logout'
        colorSchema='red'
        onClick={() => {
          signOut()
          router.push('/auth/login')
        }}
      />
    </div>
  )
}

export default AdminPage