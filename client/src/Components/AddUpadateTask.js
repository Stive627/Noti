import { useState } from "react"
import { ButtonValid, FieldForm } from "../Pages/SingUpPage"
import axios from "axios"
import { useGetData } from "../data"

export const FlexContainer = ({ children}) => {
    return (
        <div className={`flex justify-between gap-2 `}>
            {children}
        </div>
    )
}


export const AddUpdateTaskInstanceForm = ({ task = '', titles, value, add = true, setUpdateTask, setAddTask}) => {
    const {data, setData, setReload} = useGetData()
    const [title, setTitle] = useState({ value: task? task.title : ' '  , isTouched: false })
    const [date, setDate] = useState({ value: task? task.date : '', isTouched: false })
    const [time1, setTime1] = useState({ value: task? task.time1 : '', isTouched: false })
    const [time2, setTime2]= useState({value: task? task.time2 : '', isTouched:false})
    const validTitle = title.value.length < 3  && title.isTouched
    const validDate = time2 > time1
    const disabled = title.value.length > 3

    const getData = () => {
        const formdata = new FormData()
        formdata.append('title', title.value)
        formdata.append('date', date.value)
        formdata.append('time1', time1.value)
        formdata.append('time2', time2.value)
        return formdata
    }
    
    const handleSubmitTaskAdd = (e) => {
        e.preventDefault()
        const formdata =  getData()
        axios({
            method: 'POST',
            data: formdata,
            url: 'http://localhost:8000/api/addtask/',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            } 
        })
        setAddTask(true)
        window.location.reload()
    }

    const handleSubmitTaskUpdate = (e) => {
        e.preventDefault()
        const formdata = getData()
        axios({
            method: 'PUT',
            data: formdata,
            url:  `http://localhost:8000/api/crudtask/${task.id}/`,
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
            
        })
        setReload(true)
        console.log(data)
        setUpdateTask(false)
        window.location.reload()
        
    }

    return (
        <div className='w-full'>
            <h1 className=" text-center font-bold text-[30px]">{titles}</h1>
            <form onSubmit={ e => add ? handleSubmitTaskAdd(e) : handleSubmitTaskUpdate(e)} className=" flex gap-2 flex-col  w-3/4 mx-auto">
            <FieldForm type={'text'} setField={setTitle} validField={validTitle} field={title} name={'Title'} placeholder={'Enter a title'} errorField={'The title should contains more than 03 characters'} />
            <FieldForm type={'date'} setField={setDate} validField={true} field={date} name={'date'} placeholder={'Date'} errorField={''} />
            <FlexContainer>
            <FieldForm type={'time'} setField={setTime1} validField={true} field={time1} name={'time1'} placeholder={''} />
            <FieldForm type={'time'} setField={setTime2} validField={validDate} field={time2} name={'time2'} placeholder={'Time2'} errorField={'The time1 should be greater than time2'} />                
            </FlexContainer>
            <ButtonValid disabled={disabled} value={value} onClic={onsubmit}/>
            </form>
        </div>
        )
    }


    

