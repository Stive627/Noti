import React from 'react'
import '../CSS/loader.css'
function Preload() {
  return (
    <div className=' flex w-screen h-screen bg-white'>
        <div className=' my-auto mx-auto'>
              <div className=' flex justify-center'>
                  <div  className=' loaderpreload w-10 h-10  lg:w-20 lg:h-20 border-t-orange-400 border-b-4 lg:border-b-8 border-b-orange-400 border-white rounded-full'></div>
              </div> 
              <p className=' text-center'>Please, wait for a moment...</p>
        </div>
    </div>
  )
}

export default Preload
