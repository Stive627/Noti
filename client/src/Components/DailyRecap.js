import React from 'react'

const DailyRecapContainer = ({children}) => {
    return (
        <div className=' relative w-full h-full p-2' style={{backgroundColor:'rgba(82, 113, 255, 1)'}}>
            <div className=' grid grid-rows-7 w-full h-full '>
            {children}
            </div>
        </div>
        
    )
}
const TitleRecap = () => {
    return (
        <div className=' row-span-2'>
            <h1 className=' text-white font-bold text-center text-[50px]'>Daily recap</h1>
        </div>    
    )
}

const TaskRecap = ({children}) => {
    return (
        <div className=' row-span-3 flex justify-between'>
            {children}
        </div>  
    )
}
const TaskDefineDone = ({ title, tasks }) => {
    const taskItems = tasks.map(task => <li key={task.title} className=' text-white '>{task.title}</li>)
    
    return (
        <div>
            <h3 className=' font-semibold'>{title}</h3>
            <ul>
               {taskItems} 
            </ul>
        </div>
        
    )
}

const PercentageDoneRecap = ({ task1, task2 }) => {
    
    let color;
    let appreciation;
    
    const percentage = Math.floor(task2.length / task1.length) * 100
    if (percentage === 100) {
        color = 'bg-green-500'
        appreciation = 'Completed✌️'
    }
    if (percentage < 100 && percentage > 60) {
        color = 'bg-yellow-100'
        appreciation= 'Well done👌'
    }
    if (percentage < 60 && percentage > 40) {
        color = 'bg-gray-400'
        appreciation =  'Average🤷‍♂️'
    }
    
    if (percentage < 40 && percentage >15) {
        color = 'bg-red-300'
        appreciation = 'Bad🤦‍♂️'
    }
    if(percentage<15){
        color = 'bg-red-700'
        appreciation =  'Worst😒'
    }
    return (
        <div className=' row-span-2 flex justify-center items-center'><p className=' text-center '> Status {' '}<span className={`${color} px-2 rounded-md py-1 text-lg text-white  `}>{appreciation}</span></p></div>
        
    )
}

function DailyRecap({ tasks }) {
    const t = [...tasks]
    const task1 = t.filter(t => !t.done)
    const task2 = t.filter(t => t.done)
  return (
    <DailyRecapContainer>
        <TitleRecap />   
        <TaskRecap>
            <TaskDefineDone title={'Task defined'} tasks={task1}/>
            <TaskDefineDone title={'Task done'} tasks={task2}/>
          </TaskRecap>
        <PercentageDoneRecap task1={task1} task2={task2}/>
    </DailyRecapContainer>
  )
}

export default DailyRecap