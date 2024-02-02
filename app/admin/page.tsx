"use client"
import Button from '@/components/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log('session', session);
  return (
    <div>
      <p>Halaman Admin</p>

      <Button 
        title='logout'
        colorSchema='red'
        onClick={() => {
          router.push('login')
        }}
      />
    </div>
  )
}

export default AdminPage