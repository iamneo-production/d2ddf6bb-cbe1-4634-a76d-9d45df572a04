import React , {useState} from 'react'
import { useStateValue } from "../utils/StateProvider";
import { actionTypes, openSnackbar } from "../utils/Reducer";
import { Input } from '@mui/material'
import loginImage from '../assets/login_image.png';
import { useHistory } from 'react-router-dom';
import { ApiClient, setAuthorizationHeader } from '../utils/ApiClient';
import LoadingButton from '@mui/lab/LoadingButton';

function Login() {
    
    const [state, dispatch] = useStateValue();

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const onSubmit = () =>{
      setLoading(true);

      ApiClient.post('/login', { email, password }).then(response => {
        if (response.data) {
          // success
          setAuthorizationHeader(response.headers.authorization);
          dispatch({
            type: actionTypes.SET_USER,
            user: email,
            userType : 'user'
          });

          dispatch(openSnackbar('Welcome back!', 'success'));
        }
      }).finally(() => setLoading(false));
      /*

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
      */
    }

    return(
        <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , height : '100vh'}}>
            <div style={{display : 'flex' , flexDirection : 'column' , marginRight : '40px'}}>
                <h1 style = {{marginBottom : '10px'}} >LOGIN</h1>
                <Input id = 'email' placeholder = "Email" type = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} style ={{margin : '10px'}} />
                <Input id = 'password' placeholder = "Password" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} style = {{margin : '10px'}}/>
                <LoadingButton 
                  id = 'submitButton' 
                  variant = 'contained'
                  onClick = {onSubmit} 
                  style = {{margin : '10px'}} 
                  loading={loading}
                  loadingIndicator="Logging in...">
                  LOGIN
                </LoadingButton>
                <div>New to STORE? <a id="signupLink" href="#" onClick={() => history.push('/signup') }>Click here</a></div>
            </div>
            <div style = {{marginLeft : '40px'}}>
              <img src = {loginImage}/>
            </div>

        </div>
    )
}

export default Login;