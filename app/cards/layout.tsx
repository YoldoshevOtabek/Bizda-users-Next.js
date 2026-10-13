import React, { ReactNode } from 'react'
import Navbar from '../../features/Navbar'

export default function Layout({children} : {children:ReactNode}) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}
