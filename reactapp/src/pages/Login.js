import React , {useState} from 'react'
import { useStateValue } from "../utils/StateProvider";
import { actionTypes } from "../utils/Reducer";
import { Button ,Input } from '@mui/material'
import loginImage from '../assets/login_image.png'

function Login() {
    
    const [state, dispatch] = useStateValue();

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")




    const onSubmit = () =>{
      console.log(email , password)

      email !== 'admin' ? dispatch({
        type: actionTypes.SET_USER,
        user: email,
        userType : 'user'
      }) : 
      dispatch({
        type: actionTypes.SET_USER,
        user: email,
        userType : 'admin'
      })
    }

    return(
        <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , height : '100vh'}}>
            <div style={{display : 'flex' , flexDirection : 'column' , marginRight : '40px'}}>
                <h1 style = {{marginBottom : '10px'}} >LOGIN</h1>
                <Input placeholder = "Email" type = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} style ={{margin : '10px'}} />
                <Input placeholder = "Password" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} style = {{margin : '10px'}}/>
                <Button variant = 'contained' onClick = {onSubmit} style = {{margin : '10px'}} >LOGIN</Button>
                <div>New to Bookstore? <a href='/signup'>Click here</a></div>
            </div>
            <div style = {{marginLeft : '40px'}}>
              <img src = {loginImage}/>
            </div>

        </div>
    )
}

export default Login;