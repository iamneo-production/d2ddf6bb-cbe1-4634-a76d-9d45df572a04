import { useState } from 'react'
import { useStateValue } from "../utils/StateProvider";
import { actionTypes, openSnackbar } from "../utils/Reducer";
import { Input, Container } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { ApiClient } from '../utils/ApiClient';
import LoadingButton from '@mui/lab/LoadingButton';

function ForgotPassword() {
    
    const [state, dispatch] = useStateValue();

    const [email , setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const onSubmit = () =>{
      setLoading(true);

      ApiClient.post(`/forgotPassword/${email}`).then(response => {
        dispatch(openSnackbar('The email has been sent. Please check your inbox.', 'success'));
      }).finally(() => setLoading(false));
    }

    return(
        <Container maxWidth="sm" style={{height : '100vh', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
            <h1 style = {{marginBottom : '10px'}} >FORGOT PASSWORD</h1>
            <p style={{ textAlign: 'justify' }}>Enter your email and we will send you an email with the verification link to reset your password.</p>
            <Input id = 'email' placeholder = "Email" type = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} style ={{margin : '10px', width: '100%'}} />
            <LoadingButton 
                id = 'submitButton' 
                variant = 'contained'
                onClick = {onSubmit} 
                style = {{margin : '10px'}} 
                loading={loading}
                loadingIndicator="Sending...">
                SEND VERIFICATION EMAIL
            </LoadingButton>
            <div>Login? <a id='signinLink'  href="#" onClick={() => history.push('/') }>Click here</a></div>
        </Container>
    )
}

export default ForgotPassword;