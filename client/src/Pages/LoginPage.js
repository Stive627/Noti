import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import {Welcome, FieldForm, ButtonValid, SocialConnexion, Portals, SwitchConnexion} from './SingUpPage'
import Error from '../Validators/Error'
import axios from 'axios'
import SettingsIcon from '@mui/icons-material/Settings';
import '../CSS/loader.css'



const FormLogin = () => {
    const [usernameOrEmail, setUsernameOrEmail]= useState({value:'', isTouched:false})
    const [password, setPassword] = useState({ value:'', isTouched: false })
    const [userInfo, setUserInfo] = useState([])
    const [invalidLogin, setInvalidLogin] = useState('')
    const [buttonIcon, setButtonIcon] = useState({icon:<SettingsIcon className='loader'/>, status:false})

    const navigate = useNavigate()
    const handleLogin = (e) => {
        setButtonIcon({ ...buttonIcon, status: true })
        console.log(usernameOrEmail.value)
        console.log(password.value)
        let formData = new FormData()
        formData.append('usernameOrEmail', usernameOrEmail.value)
        formData.append('password', password.value)
        e.preventDefault()
        axios({ url: 'http://localhost:8000/api/login/', method: 'POST', data: formData }).
            then(response => {
                console.log(response.data)
                setUserInfo(response.data)
                localStorage.setItem("token", response.data.token)
                console.log(localStorage.getItem("token"))
                console.log(response.data.token)
                navigate('/')
            })
            .catch(function (error) {
                if (error.response) {
                    setButtonIcon({ ...buttonIcon, status: false })
                    setPassword({...password, value:''})
                    console.log(error.response.data)
                    setInvalidLogin(error.response.data.message)
                }
                else if (error.request) {
                    console.log(error.request)
                }
                else {
                    console.log('Error', error.message)
                }
                console.log(error.config)
                
         })
    
        
    }
    return (
        <div className=' flex flex-col gap-1'>
            <form onSubmit={e => handleLogin(e)} className=' flex flex-col gap-2'>
                {invalidLogin && <Error text={invalidLogin} className='text-center'/>}
                <FieldForm placeholder={'Username or Email'} field={usernameOrEmail} setField={setUsernameOrEmail} errorField={''} validField={true}  name={'usernameOrEmail'}/>
                <FieldForm placeholder={'Password'} field={password} setField={setPassword} errorField={''} validField={true} name={'password'} />
                <Error text={''} />
                <ButtonValid disabled={true} value={'Login'} icon={buttonIcon.icon} visible={buttonIcon.status}/>
                <SwitchConnexion question={"You don't have an account?"} page={'/signup'} direction={'Register here'} />
                <SocialConnexion />
            </form>
        </div>
    )
}



export default function LoginPage() {
    return (
        <Portals>
            <Welcome title={"Welcome to your app, let's log to continue."} />
            <FormLogin />
        </Portals>
    )
    
}
