"use client"
import React, { useEffect, useState } from 'react'

const Home = () => {

  let [message, setMessage] = useState<string>("hello world");

  useEffect(() => {
    setTimeout(() => {
      setMessage('use effect berjalan')
    }, 1000);
    console.log('use effect berjalan')
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default Home