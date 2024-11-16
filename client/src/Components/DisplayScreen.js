import React, { useState } from 'react'
import InstanceTask from './InstanceTask'
import Charts from './Charts'
import { AddUpdateTaskInstanceForm } from './AddUpadateTask'
import DailyRecap from './DailyRecap'


const DisplayScreenContainer = ({children}) => {
    return (
        <div className=' col-span-4 border border-black'>
            <div className=' h-full  grid grid-rows-2'>
            {children}
            </div>
        </div>
    )
}

function DisplayScreen({ task}) {
  const [addTask, setAddTask] = useState(false)
  return (
    <DisplayScreenContainer>
      {
        addTask ?
        <AddUpdateTaskInstanceForm setAddTask={setAddTask}  titles={'Add task'} value={'Add task'} />
        :
          <>{  Array.isArray(task) ? <DailyRecap tasks={task.flat()}/> : <InstanceTask task={task}  addTask={addTask} /> }</>
      }
    <Charts setAddTask={setAddTask} addTask={addTask}/>
    </DisplayScreenContainer>
  )
}

export default DisplayScreen
