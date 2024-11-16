import React, { useState } from 'react'
import Face6Icon from '@mui/icons-material/Face6';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import AppMode from './AppMode';
import {UseTheme} from '../useHook/useContextTheme'


const ThemeSelector = ({toogleMode, setToogleMode}) =>{

  return(
    <>
      <div className='relative' onClick={()=>setToogleMode({...toogleMode, switch:true})}>
        <button className=' flex justify-between'>
           <strong>Theme</strong>
            <UnfoldLessIcon/>
        </button>
        <div className=' p-1 rounded-full' style={{borderColor:'rgba(255, 159, 28, 1)', backgroundColor:'rgba(255, 191, 105, 1)' , color:'rgba(255, 159, 28, 1)'}}>
            <p>{toogleMode.valueMode === 'Manual' ? 'M' : 'A'}</p>
        </div>
     </div> 
    </>
  
  )
}


const ProfileBox = () =>{

  const [toogleMode, setToogleMode] = useState({valueMode:'Manual', switch:false})
  const date = new Date()
  const day = date.getHours() > 6 && date.getHours() < 18
  const {automatic} = UseTheme()


  const modeApp =  toogleMode.valueMode ==='Manual' ? <AppMode/> : <div className=' p-2 flex items-center justify-center'>{day? <LightModeIcon className=' text-yellow-300'/> : <DarkModeIcon/>}</div>

  const EltName = ({name}) =>{ return <p style={{color:'rgba(37, 36, 34, 1)', fontSize:'20px'}} >{name}</p>}
  const IconProfile = () =>{ return <div className = 'border border-black p-1 rounded-full'><Face6Icon style = {{color:'rgba(37, 36, 34, 1)'}}/></div>}
  const data = [
    {name: <EltName name={'Profile'} />, elt:<IconProfile/>},
    {name:<ThemeSelector toogleMode={toogleMode} setToogleMode={setToogleMode}/>, elt:modeApp},
    {name: <EltName name={'Logout'} />, elt:<button onClick={() =>{}}><LogoutIcon style={{color:'rgba(37, 36, 34, 1)'}}/></button>}
  ]
  const switchMode = [
    {name: 'Manual', handle:() =>setToogleMode({valueMode:'Manual', switch:false})},
    {name:'System', handle:() => {setToogleMode({valueMode:'System', switch: false}); automatic()}}
  ]
  return(
    <div className=' relative'>
      <div className=' relative flex flex-col divide-y z-10'>
        {
          data.map(elt =><div className=' w-full p-1 flex justify-between'><div>{elt.name}</div><div>{elt.elt}</div></div>)
        }
      </div>
     {toogleMode.switch && <div className = ' absolute left-0 top-1 z-20'>
      <div className=' flex flex-col divide-y '>
        {
          switchMode.map(elt =><button onClick={elt.handle} className=' w-full'>{elt.name}</button>)
        }
      </div>

    </div>
}
    </div>
  )
}



function ProfileHomePage() {
  return (
    <div className='h-full w-full relative bg-transparent '>
      <div className='absolute top-0 right-0 w-1/5 h-1/3 '>  
        <ProfileBox/>
      </div>
    </div>
  )
}

export default ProfileHomePage