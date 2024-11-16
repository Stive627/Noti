import React from 'react'

function Error({text, className = ''}) {
  return (
    <p className={`text-red-500 font-semibold ${className}`}>{ text}</p>
    
  )
}

export default Error
