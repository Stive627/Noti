import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import Content, { ContentContainer } from '../Components/Content'
import Preload from '../Components/Preload'
import {useGetData } from '../data'
import ProfileHomePage from '../Components/ProfileHomePage'

const ContainerPage = ({ children }) => {
  
  return (
    <div className='w-screen h-screen overflow-hidden  bg-red-500'>
      <div className='grid grid-rows-12  bg-purple-500 h-full'>
        {children}
      </div>   
    </div>
  )
}

function HomePage() {  
  // loading the data from the server.
  const { data, setData, reload} = useGetData()
  const [showProfileHomePage, setShowProfileHomePage] = useState(false)
  
  const [wait, setWait] = useState(true)
  useEffect(() => {
    if (!data) setTimeout(() => { setWait(false) }, 2000) 
    else if(data) setWait(false)
  }, [])
  
  return (
    <>
      {
        wait
        ?
          <Preload />
        :
          <ContainerPage>
            <NavBar data={data}/>
            {showProfileHomePage ? <ContentContainer><ProfileHomePage/></ContentContainer> : <Content  tasks={data.tasks}/>}
         </ContainerPage> 
      }
    </>
  )
}
export default HomePage
