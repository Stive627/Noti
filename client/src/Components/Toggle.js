import React from 'react'
import AppMode from './AppMode'
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';


function Toggle() {
  const datas =[
    {
      'name':'Theme', 'content':<AppMode/>
    },
    {
      'name':'Logout', 'content':<LogoutIcon/>
    },
    {
      'name':'Delete account', 'content':<DeleteIcon/>
    }
  ]
  return (
    <div className=' w-20  h-16 z-20 border border-neutral-400 p-3 '>
      {
        datas.map((data)=>(
          <div className=' flex justify-between'>
            <div className={`${data.name ==='Delete' && 'text-red-700'}`}>{data.name}</div>
            <div>{data.content}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Toggle
