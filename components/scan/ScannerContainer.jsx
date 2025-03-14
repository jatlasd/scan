"use client"

import { useState, useEffect } from 'react'

const ScannerContainer = ({ user }) => {
  return (
    <div>
        <button onClick={()=>console.log(user)}>Click</button>
    </div>
  )
}

export default ScannerContainer