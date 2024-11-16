import React from 'react'
import AddIcon from '@mui/icons-material/Add';



const ChartContainer = ({ children }) => {
    return (
        <div className=' row-span-1 '>
            <div className=' h-full static'>
                {children}  
            </div> 
        </div>
    )
}


const AddTask = ({addTask, setAddTask}) => {
    return (
        <>
            {!addTask && <button onClick={() => setAddTask(true)} style={{ backgroundColor: 'rgba(255, 145, 77, 1)' }} className=' absolute bottom-0 right-0 flex items-center p-3 rounded-full m-3'>
                <AddIcon className=' text-lg text-white font-bold' />
            </button>} 
        </>
    )
}

function Charts({setAddTask, addTask}) {
    return (
        <ChartContainer>
            <AddTask addTask={addTask} setAddTask={setAddTask}/>   
        </ChartContainer>
  )
}

export default Charts
