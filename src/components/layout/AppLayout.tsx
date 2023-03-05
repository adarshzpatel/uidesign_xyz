import React from 'react'
import Navbar from './Navbar'
import { Toaster } from 'react-hot-toast'


type Props = {
  children:React.ReactNode
}

const AppLayout = ({children}:Props) => {
  return (
    <>
    <Toaster position='bottom-left'/>
    <Navbar/>
    <div>{children}</div>
    </>
  )
}

export default AppLayout