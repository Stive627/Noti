import axios from 'axios'
import React, { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import App_mode from './App_mode';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import { Avatar } from './NavBar';



const ProfileContainer = ({children}) => {
    return (
        <div className='grid grid-rows-3 bg-gray-200'>
            {children}
        </div>
    )
}

const ProfileAvatar = ({ profile }) => {
    const handleClick = () => {
        axios({
            url: 'http://localhost:8000/image',
            headers: {
                Authorization:localStorage.getItem('item')
            },
            method: 'POST',
            
        }).then(response => console.log(response.data)).catch(err => console.log(err))
    }
    return (
        <div className=' row-span-1 p-2'>
            {/* <div className=' static'><Avatar profile={profile} dim={'w-1/4 h-1/2'}/> <button onClick = {handleClick} className=' z-20 absolute bottom-0 right-0 p-1 bg-white'><AddAPhotoIcon className=' text-blue-500 text-lg'/></button></div> */}
            
            <p className=' text-center font-bold'>{profile.username}</p>

        </div>
    )
}

const DividerContainer = ({children}) => {
    return (
        <div className=' row-span-2 p-1 shadow-md bg-white'>
            <div className=' grid grid-rows-3 divide-y'>
                {children}
            </div>
        </div>
    )
}
const DivElement = ({element, content}) => {
    return (
        <div>
            <div className=' flex flex-row justify-between p-1'>
                <h3>{element}</h3>
                {content}
            </div>
        </div>
    )
}

const LogoutButton = () => {
    const deleteAccount = axios({
        url: 'http://localhost:8000/noti/logout',
        method: 'DELETE',
        headers: {
            Authorization:'# i will put the token there. '
        }
    }).catch(err =>console.log(err))
    return (
        <button onClick={deleteAccount}><LogoutIcon className=' w-full h-full'/></button>
    )
}
const DeleteAccountButton = () => {
    const deleteAccount = axios({
        url: 'http://localhost:8000/noti/delete/account/',
        method: 'DELETE',
        headers: {
            Authorization:'# i will put the token there. '
        }
    }).catch(err => console.log(err))
    return (
        <button onClick={deleteAccount}>
            <DeleteIcon className=' text-red-500 text-lg'/>
        </button>
    )
}

const data = [
    { element: 'Theme', content: <App_mode /> },
    { element: 'Logout', content: <LogoutButton /> },
    {element:<span className=' text-red-600 text-lg'>Delete account</span>, content:<DeleteAccountButton/>}
]

const DataContainer = () => {
    const rows = []
    data.forEach(element => {
        rows.push(<DivElement element={element.element} content={element.content}/>)    
    });
    return (
        <>
            {rows}
        </>
    )
}


function Profile() {
    const profile = ''
  return (
    <ProfileContainer>
        <ProfileAvatar profile={profile}/>
        <DividerContainer>
            <DataContainer/>  
        </DividerContainer>
    </ProfileContainer>
  )
}

export default Profile
