import React from 'react'
import { UseTheme } from '../useHook/useContextTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function AppMode() {
    const {theme, onchange } = UseTheme()
  return (
    <>
        <input id='themes' type='checkbox' className='hidden' checked={theme === 'light'} onChange={onchange}/>
        <label htmlFor='themes'>
            <div className=' w-16 h-7 p-1'>
                <div className={`flex justify-between`}>
                    <div className={`w-6 h-6 rounded-full`}>
                        <DarkModeIcon className={`object-cover ${theme === 'light' && 'opacity-45'}`}/>
                    </div>
                    <div className={`w-6 h-6 rounded-full ${theme === 'dark' && ' opacity-45'}`}>
                        <LightModeIcon className={`object-cover text-yellow-300 ${theme === 'light' && 'opacity-45'}`}/>
                    </div>
                </div>
            </div>
        </label>
    </>
  )
}

export default AppMode
