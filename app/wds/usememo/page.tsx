"use client"
import React, { useState, useMemo } from 'react'

const UseMemoPage = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => {
    return slowFunc(number);
  }, [number])

  const themeStyle = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black' 
  }

  return (
    <div className='flex flex-col items-center mt-12'>
      <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyle}>{doubleNumber}</div>
    </div>
  )
}

export default UseMemoPage

function slowFunc(num: number) {
  console.log('Calling slow func');
  for(let i = 0; i < 1000000000; i++) {}
  return num * 2;
}