import { useState } from 'react'
import { useStateValue } from "../utils/StateProvider";
import { actionTypes, openSnackbar } from "../utils/Reducer";
import { Input, Container } from '@mui/material'
import { useHistory, useParams } from 'react-router-dom';
import { ApiClient } from '../utils/ApiClient';
import LoadingButton from '@mui/lab/LoadingButton';

function ResetPassword() {
    const { code } = useParams();
    const [state, dispatch] = useStateValue();

    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const onSubmit = () => {
        if(password.length < 5){
            dispatch(openSnackbar('Length of password should be at least 5.', 'error'));
            return;
        }

        if(password !== confirmPassword){
            dispatch(openSnackbar('Confirm password does not match entered password.', 'error'));
            return;
        }
      setLoading(true);

      ApiClient.post('/resetPassword', { token: code, newPassword: password }).then(response => {
        history.push('/');
        dispatch(openSnackbar('You can now login using your new password.', 'success'));
      }).finally(() => setLoading(false));
    }

    return(
        <Container maxWidth="sm" style={{height : '100vh', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
            <h1 style = {{marginBottom : '10px'}} >RESET PASSWORD</h1>
            <p style={{ textAlign: 'justify' }}>Enter and confirm your new password.</p>
            <Input id = 'password' placeholder = "Password" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} style = {{margin : '10px'}}/>
            <Input id = 'confirmPassword' placeholder = "Confirm Password" type = "password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} style = {{margin : '10px'}}/>
            <LoadingButton 
                id = 'submitButton' 
                variant = 'contained'
                onClick = {onSubmit} 
                style = {{margin : '10px'}} 
                loading={loading}
                loadingIndicator="Resetting...">
                RESET PASSWORD
            </LoadingButton>
        </Container>
    )
}

export default ResetPassword;