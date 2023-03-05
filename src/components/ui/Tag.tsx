import React from 'react'

type Props = {
  text:string 
}

const Tag = ({text}: Props) => {
  return (
    <div className='border bg-white hover:shadow-xl p-2 px-4 hover:border-gray-400 rounded-lg'>{text}</div>
  )
}

export default Tag