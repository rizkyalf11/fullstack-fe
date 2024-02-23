"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const LoadingPage = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession()

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <>
      {children}
    </>
  )
}

export default LoadingPage