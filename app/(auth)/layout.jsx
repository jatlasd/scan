import SidebarNav from '@/components/SidebarNav'
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex h-full'>
        <SidebarNav/>
        {children}
    </div>
  )
}

export default AuthLayout