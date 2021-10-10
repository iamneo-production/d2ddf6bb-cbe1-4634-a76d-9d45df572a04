import React , {useState} from 'react'
import { useStateValue } from "../utils/StateProvider";
import { actionTypes } from "../utils/Reducer";
import { Button ,Input } from '@mui/material'
import singupImage from '../assets/signup_image.png'

function Login() {
    
    const [state, dispatch] = useStateValue();

    const [email , setEmail] = useState("")
    const [username , setUsername] = useState('');
    const [mobile , setMobile] = useState('')
    const [password , setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")

    const onSubmit = () =>{
      console.log(email)
      console.log(username)
      console.log(mobile)
      console.log(password)
      console.log(confirmPassword)
    }

    return(
        <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , height : '100vh'}}>
            <div style={{display : 'flex' , flexDirection : 'column' , marginRight : '40px'}}>
                <h1 style = {{marginBottom : '10px'}} >SIGN UP</h1>
                <Input placeholder = "Enter Email" type = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} style ={{margin : '10px'}} />
                <Input placeholder = "Enter Username" type = "text" value = {username} onChange = {(e) => setUsername(e.target.value)} style = {{margin : '10px'}}/>
                <Input placeholder = "Enter Mobile Number" type = "text" value = {mobile} onChange = {(e) => setMobile(e.target.value)} style = {{margin : '10px'}}/>
                <Input placeholder = "Enter Password" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} style = {{margin : '10px'}}/>
                <Input placeholder = "Confirm Password" type = "password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} style = {{margin : '10px'}}/>
                <Button variant = 'contained' onClick = {onSubmit} style = {{margin : '10px'}} >SIGN UP</Button>
                <div>Already a member? <a href='/'>Click here</a></div>
            </div>
            <div style = {{marginLeft : '40px'}}>
              <img src = {singupImage}/>
            </div>

        </div>
    )
}

export default Login;