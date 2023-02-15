import React from 'react'
import Navbar from './Navbar'


type Props = {
  children:React.ReactNode
}

const AppLayout = ({children}:Props) => {
  return (
    <>
    <Navbar/>
    <div>{children}</div>
    </>
  )
}

export default AppLayout