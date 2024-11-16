import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ImageContainer } from '../Pages/SingUpPage'
import { Link } from 'react-router-dom';
import { useGetData } from '../data';



const NavContainer = ({ children}) => {
  return (
    <div className=' row-span-2  bg-green-400  flex items-center'>
      <div className='p-2 border flex justify-between items-center h-full w-full'>
        {children}
      </div>
    </div> 
  )
}

const FirstLetter = ({letter}) => {
  return (
  <button className='  w-12 h-12 flex items-center justify-center  font-bold text-white  text-[40px] border border-black p-2 rounded-full ' style={{ backgroundColor: 'rgba(82, 113, 255, 1)' }}><p className=' mb-2'>{letter}</p></button>
  )
}

const AvatarContainer = ({arrowDown, value}) =>{
  return (
    <div className=' hover:bg-indigo-200 rounded-lg'>
      <div className=' flex flex-row gap-2' >
        <div className='flex items-center w-full h-full rounded-full font-bold text-lg'>
          <Link to={'profile'}>{value}</Link>
        </div>
        <div>
          <button className=' mt-2'>
            {arrowDown}
          </button>
        </div>
      </div>
    </div>
  )
}


function NavBar({data}) {
  return (
    <NavContainer>
      <ImageContainer dim={'lg:w-1/12 h-1/6 w-1/3 h-1/3'} url={require('../Images/noti1.png')}/>
      <AvatarContainer arrowDown={<KeyboardArrowDownIcon/>} value={data.image ? <ImageContainer url={data.image} dim={'rounded-full w-7 h-7'} /> : <FirstLetter letter={data.username[0].toUpperCase()} />}/>
    </NavContainer>
  )
}

export default NavBar
