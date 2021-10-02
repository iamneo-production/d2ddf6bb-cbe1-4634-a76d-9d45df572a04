import { useStateValue } from "../utils/StateProvider";
import { actionTypes } from "../utils/Reducer";

function Login() {
    
    const [state, dispatch] = useStateValue();

    return (
        <div>
            <h2>Login Page</h2>
            <br/>
            <button onClick={() => dispatch({
                type: actionTypes.SET_USER,
                user: "John Doe",
                userType: "user"
            })}>Login as User</button>
            
            <button onClick={() => dispatch({
                type: actionTypes.SET_USER,
                user: "John Doe",
                userType: "admin"
            })}>Login as Admin</button>
        </div>
    )

    // return(

    // )
}

export default Login;