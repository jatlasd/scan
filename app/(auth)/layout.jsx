import SidebarNav from '@/components/SidebarNav'
import { checkUser } from '@/lib/checkUser'
import React from 'react'

const AuthLayout = async ({children}) => {
  let user = await checkUser()
  return (
    <div className='flex min-h-screen'>
        <SidebarNav/>
        <main className='flex-1 pl-64'>
            {children}
        </main>
    </div>
  )
}

export default AuthLayout