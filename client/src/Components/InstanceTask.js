import React, { useState, useEffect} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddUpdateTaskInstanceForm } from './AddUpadateTask';
import axios from 'axios';
import Windows from './Windows';
import { getFullTaskDate } from './Sidebar';
import { useGetData } from '../data';

export const current_time = new Date()

export const RoundNoti = (num) => {
    return Math.floor(num)
}

const TaskDone = ({task }) => {
    const handleDoneTask = () => {
        axios({
            url: 'http://localhost:8000/donetask',
            data: { done: true },
            headers: {
                Authorization:localStorage.getItem('token')
            }
        }).then(response => console.log(response.data)).catch(error => console.log(error))
    }
    const endTask = getFullTaskDate(task.date, task.time2)
    let display = false

    if (endTask - current_time <= 300000) {
        display = true
    }
    return (
        <div className='col-span-1 mx-auto p-2 border-black border  bg-gray-50 rounded-md  flex flex-col gap-1'>
            <p>Your task is pending...</p>
            {display && <button onClick={handleDoneTask} className=' p-1 text-lg text-white bg-green-400'>Click to mark as done</button>}       
        </div>
    )
}

const InstanceTaskContainer = ({ children, deleteTask }) => {
    return (
        <div className={`relative z-20  h-full w-full ${deleteTask && 'opacity-30'}`}>
            <div className='  p-1 px-3 grid grid-rows-7 h-full' style={{backgroundColor:'rgba(82, 113, 255, 1)'}}>
                {children}
            </div>
        </div>

    )   
}

const InstanceTaskTitle = ({ title }) => {
    return (
        <div className=' row-span-3 flex justify-center items-center'>
            <h1 className=' font-bold text-white text-[70px]'>{title} </h1>
        </div>
    ) 
}

const InstanceTaskAfterTitle = () => {
    return (
        <div className=' row-span-1'>
        {''}
        </div>
    )
    
}

const InstanceTaskTiming = ({ date, timing }) => {
    return (
        <div className=' row-span-2'>
            <div className=' flex  flex-row justify-between font-bold items-center h-full'>
                <h3>{date}</h3>
                <h3>{timing}</h3>
            </div>
        </div>
    )
    
}

export const ButtonInstanceTask = ({icon, onClic, instance = false}) => {
    return (
        <button onClick={onClic} className={`rounded-full p-2 w-7 h-7 ${instance && ' bg-white border-blue-900 flex justify-center items-center'}`}>{icon}</button>
    )
}

const InstanceTaskButtonsContainer = ({children}) => {
  return (
      <div className=' row-span-1'>
          <div className=' flex  flex-row-reverse gap-2 h-full items-center'>
              {children}
          </div>
      </div>
  )
  
}
const InstanceTaskButtons = ({ setUpdateTask, setDeleteTask, deleteTask, setData }) => {

  return (
      <InstanceTaskButtonsContainer>
          <ButtonInstanceTask instance={true} icon={<DeleteIcon className=' text-red-500 object-cover' />} onClic={() => { setDeleteTask(!deleteTask)}} />
          <ButtonInstanceTask instance={true} icon={<EditIcon className='  text-black object-cover'/>} onClic={()=>setUpdateTask(true)}/>
      </InstanceTaskButtonsContainer>
  )
  
}

const EmptyDisplayInstance = () => {
    return (
        <div className='row-span-1 border border-black'>  
            <div className=' h-full flex justify-center items-center'>
                <p>No task available.</p>
            </div>
        </div>
    )   
}

function ProvidedDataInstance({ task, setUpdateTask, setDeleteTask,deleteTask, setData }) {
    const diff_date = (new Date(`${task.date}T${task.time2}`) - new Date())/1000
    const [timer, setTimer] = useState(diff_date)
        useEffect(() => {
            if (timer > 0) {
                const interval = setTimeout(() => {
                    setTimer(timer - 1)
                }, 1000)
                return () => clearInterval(interval)
            }
        }, [timer])
    const days = RoundNoti(timer/86400)%30
    const hours = RoundNoti((timer - days * 84000)/3600)%24
    const minutes = RoundNoti((timer - days * 8600 - hours * 3600) / 60) % 60
    const second = RoundNoti(timer % 60)
    let timer_record = `${days && `${days >1 ? days + 'Days' : days +'Day'}`} - ${hours && `${hours >9 ? hours : '0'+hours}`} :${minutes  && `${minutes>9 ? minutes : '0'+ minutes}`}:${second >9 ? second : '0' + second}`
  return (
      <InstanceTaskContainer deleteTask={deleteTask}>
          <InstanceTaskTitle title={task.title}/>
          <InstanceTaskAfterTitle />
          {current_time < getFullTaskDate(task.date, task.time1) ?  <InstanceTaskTiming date={task.date} timing={timer_record} /> : <TaskDone task={task}/>}
          <InstanceTaskButtons setData={setData} setUpdateTask={setUpdateTask} setDeleteTask={setDeleteTask} deleteTask={deleteTask} /> 
      </InstanceTaskContainer>
    )
}

const ContainerInstanceTask = ({children}) => {
    return (
            <div className=' row-span-1  grid grid-rows-1  relative'>
                {children}
            </div>
    )
}

function InstanceTask({ task }) {  
    const {setData} = useGetData()
    const deleteTas = () => {
        axios({
            method: 'DELETE',
            url: `http://localhost:8000/api/crudtask/${task.id}/`,
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        })
        .then(response => console.log(response.data))
        .catch(error => console.log(error.response.data))
        window.location.reload()
        
    }
    
    const [updateTask, setUpdateTask] = useState(false)
    const [deleteTask, setDeleteTask] = useState(false)
    const zIndex = deleteTask ? 'z-50' : 'z-10'

    if (updateTask) {
        return <AddUpdateTaskInstanceForm setUpdateTask={setUpdateTask} add={false} titles={'Update task'} task={task} value={'Edit task'} />
    }
   

    return <> {task ?
        <ContainerInstanceTask>
            <ProvidedDataInstance setData={setData} deleteTask={deleteTask} setUpdateTask={setUpdateTask} task={task}  setDeleteTask={setDeleteTask}/>
            <Windows zIndex={zIndex} title={'Are you sure you want to delete this task?'} onclickY={deleteTas} onclickN={setDeleteTask} />
        </ContainerInstanceTask> : <EmptyDisplayInstance />}</>
}
export default InstanceTask