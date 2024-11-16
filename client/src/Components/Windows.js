import React from 'react'

const WindowsContainer = ({ children, zIndex }) => {
    return (
        <div className={` absolute top-0 left-0 w-full h-full  ${zIndex}  bg-transparent`}>
            <div className=' h-full flex justify-center items-center'>
                <div className=' h-1/2 w-1/2 bg-white border border-black shadow-2xl bg-transparent  p-3 flex flex-col justify-between rounded-md'>
                    {children}
                </div>
            </div>
        </div>
    )
}


const TitleWindows = ({ title }) => {
    return (
        <h3 className='text-center font-bold text-lg'>{title}</h3>
    )
}


const ButtonWindows = ({onclick, buttonValue}) => {
    return (
        <button onClick={onclick} className='p-2 font-bold shadow-md rounded-lg'>{buttonValue}</button>
    )
}
const FlexContainerWindows = ({children}) => {
    return (
        <div className='flex items-center justify-center gap-6'>
            <div className=' w-1/3 h-full flex justify-between'>
                {children}
            </div>
        </div>
    )
}


function Windows({title, onclickY, onclickN, zIndex}) {
  return (
    <WindowsContainer zIndex={zIndex}>
        <TitleWindows title={title} />
        <FlexContainerWindows>
              <ButtonWindows buttonValue={'No'} onclick={() => { onclickN(false);}} />
            <ButtonWindows buttonValue={'Yes'} onclick={() =>onclickY()}/>
        </FlexContainerWindows>
    </WindowsContainer>
  )
}

export default Windows
