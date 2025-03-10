import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import NotLoggedIn from '@/components/NotLoggedIn'

const Home = () => {
  return (
    <>
      <SignedIn>
        <p>hi</p>
      </SignedIn>
      <SignedOut>
        <NotLoggedIn/>
      </SignedOut>
    </>
  )
}

export default Home