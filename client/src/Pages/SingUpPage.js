import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {validateEmail} from '../Utils/utils'
import Error from '../Validators/Error'
import axios from 'axios'
import SettingsIcon from '@mui/icons-material/Settings';
import '../CSS/loader.css'





export const Portals = ({children}) => {
    return (
        <div className=' flex h-screen w-screen'>
            <div className=' mx-auto my-auto px-4'>
                {children}
            </div>
        </div>
    )
}

export const FieldForm = ({ placeholder, field, setField, errorField, validField, name, type, errorFieldServer = '' ,showErrorServer = undefined, setShowErrorServer=() =>{}}) => {
    return (
        <>
            <input type={type} name={name} className=' p-1 w-full border-black rounded-md border' onChange={e =>setField({...field, value:e.target.value})} placeholder={placeholder} value={field.value} onBlur={()=>setField({...field, isTouched:true})} onFocus={() =>setShowErrorServer(false)}/>      
            {validField && <Error text={errorField} />}
            {errorFieldServer && showErrorServer && <Error text={errorFieldServer} />}
        </>
    )
    
}

export const ButtonValid = ({disabled, value, onClic, icon={}, visible=false}) => {
    return (
        <div className=' flex justify-center'>
            <button type='submit' onClick={onClic} disabled={!disabled} className={` cursor-pointer sm:w-1/2 w-full rounded-lg text-white ${!disabled ? 'bg-orange-100' : 'bg-orange-400'} `}>{visible && icon}{' '}{value}</button>
        </div>
    )
}

export const SwitchConnexion = ({question, page, direction}) => {
    return (
        <div>
            <span>{question} { ' '}</span><span style={{ color: 'rgba(255, 145, 77, 1)' }}><Link to={page}>{ direction}</Link></span>
            <p className=' text-center text-lg'>continue with</p>
        </div>
    )
}

export const ImageContainer = ({ dim = 'w-10 h-10',  url, alt }) => {
    return (
        <div className={dim}>
            <img alt={alt} className='object-cover'  src={url} />  
        </div>
    )
}

export const SocialConnexionContainer = ({children}) => {
    return (
        <div className=' flex justify-center'>
            <div className=' flex flex-row gap-3'>
                {children}
            </div>
        </div>
    )
}

export const SocialConnexion = () => {
    return (
            <SocialConnexionContainer>
                <ImageContainer alt={'Google'}  url={require('../Images/google.jpg')} />
            <ImageContainer alt={'Github'} url={require('../Images/github.jpg' )} />
            <ImageContainer alt={'Facebook'} url={ require('../Images/facebook.jpg' )} />
            </SocialConnexionContainer>
    )
}

export const  WelcomeContainer = ({title, image}) =>{
    return (
        <div className=' flex flex-col gap-2 '>
            {image}
            <h3 className=' text-center'>{title}</h3>
        </div>
    )
}


export const Welcome = ({ title }) => {
    return (
        <WelcomeContainer title={title} image={<ImageContainer alt={'Logo Noti'} dim={'w-1/2 h-1/5'} url={require('../Images/noti1.png') }/>}/>
    )
}

const FormRegister = () => {

    const [username, setUsername]= useState({value:'', isTouched:false, errorUsername:''})
    const [email, setEmail]=useState({value:'', isTouched:false})
    const [password, setPassword]=useState({value:'', isTouched:false})
    const [repassword, setRepassword] = useState({ value: '', isTouched: false })
    const validUsername = username.value.length < 3 && username.isTouched 
    const validEmail = !validateEmail(email.value) && email.isTouched
    const validPassword = password.value.length < 8 && password.isTouched
    const validRePassword = password.value !== repassword.value && repassword.isTouched
    const disabled = username.value.length > 3 && username.isTouched && validateEmail(email.value) && password.value === repassword.value  && password.value.length >= 8 && password.isTouched
    const [errorU, setErroru] = useState('')
    const [errorE, setErrorE] = useState('')
    const [buttonIcon, setButtonIcon] = useState({icon:<SettingsIcon className='loader'/>, status:false})
    const navigate = useNavigate()
    const [showErrorServer, setShowErrorServer] = useState(true)


    const clearForm = () => {
        setUsername({ value: '', isTouched: false })
        setEmail({ value: '', isTouched: false })
        setPassword({ value: '', isTouched: false })
        setRepassword({value:'', isTouched:false})
    }
    const handleSingUp = (e) => {

        e.preventDefault()
        setButtonIcon({ ...buttonIcon, status: true })
        setShowErrorServer(true)
        let formData = new FormData()
        formData.append('username', username.value)
        formData.append('email', email.value) 
        formData.append('password', password.value)
        axios({
                url: 'http://localhost:8000/api/register/',
                method: 'POST',
                data:formData
            
            })
            .then(function (response) {
                console.log(response.status)
                console.log(response.message)
                console.log(response.data)
                clearForm()
                navigate('/login')
            })
            .catch(function (error) {
                if (error.response && error.response.status ===400) {
                    setButtonIcon({ ...buttonIcon, status: false })
                    console.log(error.response.data)
                    const arrError = Object.keys(error.response.data)
                    console.log(error.response.data.username[0])
                    if (arrError.includes('username')) {
                        setErroru(error.response.data.username[0])
                        console.log(errorU)
                        setUsername({ ...username, isTouched: false, })
                    }
                    if (arrError.includes('email')) {
                        setErrorE(error.response.data.email[0])
                        console.log(errorE)
                        setEmail({ ...email, isTouched: false })
                        
                    }

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
            <form onSubmit={e =>handleSingUp(e)} className=' flex flex-col gap-2'>
                <FieldForm placeholder={`Username`} type={'text'} validField={validUsername} name={'username'} field={username} setField={setUsername} errorField={'The username should contains more than 3 characters.'} errorFieldServer={errorU} showErrorServer={showErrorServer}  setShowErrorServer={setShowErrorServer}/>
                <FieldForm placeholder={`Email`} type={'text'} validField={validEmail} name={'email'} field={email} setField={setEmail} errorField={'The email is not valid.'} errorFieldServer={errorE} showErrorServer={showErrorServer}  setShowErrorServer={setShowErrorServer}/>
                <FieldForm placeholder={`Password`} type={'password'} validField={validPassword} name={'password'} field={password} setField={setPassword} errorField={'Password should contains more than 08 characters.'}/>
                <FieldForm placeholder={`Re-Enter your password`} type={'password'} validField={validRePassword} name={'re-password'} field={repassword} setField={setRepassword} errorField={"The two password don't match."}/>
                <ButtonValid icon={buttonIcon.icon} visible={buttonIcon.status} onClic={handleSingUp}  value={'Create your account'} disabled={disabled}/>
                <SwitchConnexion question={'Do you have an account ?'} direction={'Login here'} page={'/login'} />
                <SocialConnexion />
            </form>
        </div>
    )
}

export default function SingUpPage() {
    return (
        <Portals>
            <Welcome title={"Hi, let's create your account"}/>
            <FormRegister/>  
        </Portals>
    )  
}
