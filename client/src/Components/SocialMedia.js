import React from 'react'

function SocialMedia() {
  const datas =[
    {
    image_source:()=>require('../Images/google.jpg'), 
    handleChange: ()=>{} 
    },
    {
      image_source:()=>require('../Images/github.jpg'), 
      handleChange: ()=>{}  
    },
    {
      image_source:()=>require('../Images/facebook.jpg'),  
      handleChange: ()=>{} 
    },

]
  
  return (
    <div className=' flex flex-row gap-3 w-full'>
      {
        datas.map((data)=>(
          <button onClick={data.handleChange}><img src={data.image_source} width='40px' height='40px' className=' rounded-full p-2'/></button>

        ))
      }
    </div>
  )
}

export default SocialMedia
