import React, { useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const getFullTaskDate = (date, time) => {
  return new Date(`${date}T${time}`)
}

export const today = new Date()

export const dayF = (day) => new Date(day) 

const Task = ({ task, indexx, setActiveTask, seTask, number_tasks , activeTask}) => {
  const handleClick = () => {
    const arr = Array(number_tasks).fill(false)
    arr[indexx] = true
    setActiveTask(arr)
    seTask(task)
  }
    return(
        <div className=' w-full py-1'>
        <button onClick={handleClick} style={ activeTask[indexx] ?{backgroundColor:'rgba(240, 241, 250, 1) '}: {backgroundColor:'rgba(254, 254, 254, 1)'}} className={`w-full  text-center text-lg   rounded-md  shadow-inner`}>{task.title} { task.done &&<CheckCircleOutlineIcon className=' text-white  p-1 text-lg'/>}</button>
        </div>
    )
}
  
const ActiveDay = ({ day, open, setOpen, indexx, number_days, setTask }) => {
  let dayTitle;
  const todayDate = (today) =>today.slice(0, today.indexOf('T'))
  const currentDay = day[0].date

  const title = new Intl.DateTimeFormat(
    'en-US',
    { 'weekday': 'long' }
  ).format(dayF(currentDay))
  
  if (currentDay === todayDate(today.toISOString())) {
    dayTitle = 'Today'
  }
  else if (dayF(currentDay) - dayF(todayDate(today.toISOString())) === 86400000) {
    dayTitle = 'Tomorrow'
  }
  else {
    dayTitle = title
  }

  const afterTomorrow = !['Today', 'Tomorrow'].includes(dayTitle)

  const handleClick = () => {
    const arr = Array(number_days).fill(false)
    const arr_copy = arr.slice()
    arr_copy[indexx] = true
    setOpen(arr_copy)
  }
  const number_tasks = day.length
  const arr = Array(number_tasks).fill(false)
  arr[0] = true
  const [activeTask, setActiveTask] = useState(arr)

  const taskItem = day.map((task, index) =><Task key={index}  number_tasks={number_tasks} activeTask={activeTask} setActiveTask={setActiveTask} seTask = {setTask} task={task} indexx={index}/>)
  return (
    <div className=' w-full '>
      <button onClick={handleClick} className={`font-semibold w-full text-lg  py-1 rounded-lg px-1 ${afterTomorrow && 'flex justify-between'}`} style={open[indexx] ? {backgroundColor:'rgba(82, 113, 255, 1)'} : {backgroundColor:'rgba(229, 232, 255, 1)'}}>
        <h3>{dayTitle}</h3>
        {afterTomorrow && <h4>{day[0].date}</h4>}
      </button>
      {open[indexx] &&
      <div className = ' flex flex-col px-1'>
          {taskItem}  
      </div>} 
    </div>
    )    
}

const DailyRecapButton = ({ day, setTask }) => {
  return (
    <button style={{backgroundColor:'rgba(82, 113, 255, 1)'}} className=' w-full  text-white text-lg  rounded-lg py-1' onClick={() =>{setTask(day)}}>Daily Recap - {day[0].date} </button>
  )
}



const Day = ({ day, open, setOpen, indexx, number_days, setTask }) => { 

  const lastTask = day.slice(-1)[0]
  const lastTimeTask = getFullTaskDate(lastTask.date, lastTask.time2)
  return (
    <>
      {
        today > lastTimeTask ? <DailyRecapButton day={day} setTask={setTask}/> : <ActiveDay day={day} open={open} setOpen={setOpen} key={indexx} number_days={number_days} setTask={setTask} indexx={indexx}/>
      }
    </>
    )    
}
const SidebarContainer = ({children}) => {
  return (
    <div className='col-span-2 border  p-1' style={{backgroundColor:'rgba(253, 253, 253, 1)'}}>
      {children}
    </div>
  )
}

const SidebarNoData = () => {
  return (
    
     <div className='flex justify-center items-center h-full'>
        <p className='text-center text-slate-400'>No data available</p>
      </div>
    
  )
}
const  SidebarDataContainer = ({ children }) => {
  
  return (
      <div className=' w-full flex flex-col gap-1 px-2'>
        {children}
    </div>
  )
}

const SidebarData = ({ days, setTask}) => {
  const number_days = days.length
  let arr1 = Array(number_days).fill(false)
  arr1[0] = true
  const [open, setOpen] = useState(arr1)
  const content = []
  days.forEach((day, index) => {
    content.push(<Day  setTask={setTask} key={index} indexx={index} day={day} open={open} setOpen={setOpen} number_days={number_days} />)
  })
  return (
    <SidebarDataContainer>
      {content}
    </SidebarDataContainer>
  )
}

function Sidebar({ days, setTask }) {

  return (
    <SidebarContainer>
      {
        days.length > 0 ? <SidebarData days={days} setTask={setTask}/> : <SidebarNoData/>
      }
    </SidebarContainer>
  )
}
export default Sidebar
