import React , {useState} from 'react'
import { useStateValue } from "../utils/StateProvider";
import { actionTypes, openSnackbar } from "../utils/Reducer";
import { Input, Grid } from '@mui/material'
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
            userType : response.headers['user-role'].toLowerCase()
          });

          dispatch(openSnackbar('Welcome!', 'success'));
        }
      }).finally(() => setLoading(false));
    }

    return(
        <Grid container maxWidth="md" style={{height : '100vh', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
          <Grid item lg={6} id="loginBox" sx={{ display: 'flex', flexDirection: 'column' }} style={{maxWidth: '20rem'}}>
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
          </Grid>
          <Grid item lg={6} style={{maxWidth: '20rem'}} sx={{ display: { xs: 'none', md: 'block' } }}>
            <img src="/images/login_image.png" />
          </Grid>
        </Grid>
    )
}

export default Login;