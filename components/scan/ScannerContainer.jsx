"use client"

import { useState, useEffect } from 'react'
import Scanner from './Scanner'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ScannerContainer = ({ user }) => {
    const [upc, setUpc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const renderScanner = (user) => {
        if(user.settings[0].defaultLookupMethod === "CAMERA") {
            return <Scanner/>
        }
        else {
            return (
            <div className='flex'>
                <Input/>
                <Button></Button>
            </div>
            )
        }
    }
    if(!user) return <p>no user</p>
  return (
    <div>
        {renderScanner(user)}
    </div>
  )
}

export default ScannerContainer