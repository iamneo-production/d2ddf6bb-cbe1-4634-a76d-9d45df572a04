import Navbar from "../../components/Navbar";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import { useState } from 'react';
import { Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { ApiClient, doUrlEncodedRequest } from "../../utils/ApiClient";
import { useStateValue } from '../../utils/StateProvider';
import { openSnackbar } from "../../utils/Reducer";


function Email() {
    let [state, dispatch] = useStateValue();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const sendEmail = () => {
        setLoading(true);
        ApiClient(doUrlEncodedRequest('POST', { body: code }, '/admin/mail')).then(() => {
            dispatch(openSnackbar('The email has been sent!', 'success'));
        }).finally(() => setLoading(false));
    }

    return (
        <div>
            <Navbar/>
            <h2 style={{ marginTop: '10px', paddingTop: '75px' }}>Send Promotional Email</h2>
            <Container maxWidth="md">
                <p>Enter your message below to send to all users. HTML is supported.</p>
                <Editor
                    value={code}
                    onValueChange={code => setCode( code )}
                    highlight={code => highlight(code, languages.html)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        border: '1px solid #000'
                    }}
                />
                <LoadingButton loading={loading} loadingIndicator="Sending..." sx={{ my: 2 }} variant="contained" onClick={sendEmail}>
                    Send Email
                </LoadingButton>
            </Container>
        </div>
    )
}

export default Email;