import React, { useState } from 'react'
import Sidebar from './Sidebar'
import DisplayScreen from './DisplayScreen'

export const ContentContainer = ({ children }) => {
  return (
    <div className=' row-span-10 '>
      <div className=' h-full bg-white grid grid-cols-6'>
        {children}
      </div>
    </div>
  )}

function Content({ tasks }) {
  const days = []
  if (tasks) {
    const singleDay = [...new Set(tasks.map(({ date }) => date))]
    singleDay.forEach(element => {
    days.push(tasks.filter(({date}) => date === element))
    });
    console.log(days.sort((a, b) => a[0].date - b[0].date))
  }
  const current_task = days.length > 0 ? days[0][0] : undefined
  const sortedDay = days.sort((a, b) => a[0].date.localeCompare(b[0].date))
  const [task, setTask] = useState(current_task)
  return (
    <ContentContainer>
      <Sidebar days={sortedDay} setTask={setTask}/>
      <DisplayScreen  task={task} /> 
    </ContentContainer>
   )
}
export default Content