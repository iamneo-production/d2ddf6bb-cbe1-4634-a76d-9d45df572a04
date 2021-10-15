import React , {useState} from 'react'
import { useStateValue } from "../utils/StateProvider";
import { actionTypes } from "../utils/Reducer";
import { Button ,Input } from '@mui/material'
import singupImage from '../assets/signup_image.png'
import { useHistory } from 'react-router-dom';
import { ApiClient } from '../utils/ApiClient';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Login() {
    
    const [state, dispatch] = useStateValue();

    const [email , setEmail] = useState("")
    const [username , setUsername] = useState('');
    const [mobile , setMobile] = useState('')
    const [password , setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")

    const [emailError , setEmailError] = useState(false);
    const [usernameError , setusernameError] = useState(false);
    const [mobError , setMobError] = useState(false);
    const [passwordError , setPasswordError] = useState(false);
    const [confirmPasswordError , setConfirmPasswordError] = useState(false);
    const history = useHistory();

    const onSubmit = () =>{
      setEmailError(false);
      setusernameError(false)
      setMobError(false)
      setPasswordError(false)
      setConfirmPasswordError(false)

      if(!validateEmail(email)){
        setEmailError(true);
        alert("Invalid Email")
        return;
      }

      if(username.trim() === ''){
        setusernameError(true)
        alert("Username cannot be empty")
        return
      }

      if(!(/^\d{10}$/.test(mobile))){
        setMobError(true)
        alert("Invalid mobile number")
        return
      }

      if(password.length < 6){
        setPasswordError(true)
        alert("Length of password should be atleast 6")
        return
      }

      if(password !== confirmPassword){
        setConfirmPasswordError(true)
        alert("confirm password doesn't match with password")
        return
      }

      ApiClient.post('/signup', {
        email, username, password, mobileNumber: mobile
      }).then(response => {
        if (response.data) {
          // success
          alert('Created!');
          history.push('/');
        }
        else {
          // email already existed
          alert('Email already exists!');
        }
      });

    }

    return(
        <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , height : '100vh'}}>
            <div style={{display : 'flex' , flexDirection : 'column' , marginRight : '40px'}}>
                <h1 style = {{marginBottom : '10px'}} >SIGN UP</h1>
                <Input id = 'email' placeholder = "Enter Email" error = {emailError} type = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} style ={{margin : '10px'}} />
                <Input id = 'username' placeholder = "Enter Username" error = {usernameError} type = "text" value = {username} onChange = {(e) => setUsername(e.target.value)} style = {{margin : '10px'}}/>
                <Input id = 'mobilenumber' placeholder = "Enter Mobile Number" error = {mobError} type = "text" value = {mobile} onChange = {(e) => setMobile(e.target.value)} style = {{margin : '10px'}}/>
                <Input id = 'password' placeholder = "Enter Password" error = {passwordError} type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} style = {{margin : '10px'}}/>
                <Input id = 'confirmpassword' placeholder = "Confirm Password" error = {confirmPasswordError} type = "password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} style = {{margin : '10px'}}/>
                <Button id = 'submitButton' variant = 'contained' onClick = {onSubmit} style = {{margin : '10px'}} >SIGN UP</Button>
                <div>Already a member? <a id='signinLink'  href="#" onClick={() => history.push('/') }>Click here</a></div>
            </div>
            <div style = {{marginLeft : '40px'}}>
              <img src = {singupImage}/>
            </div>

        </div>
    )
}

export default Login;