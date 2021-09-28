import { useStateValue } from "../../utils/StateProvider";
import Navbar from "../../components/Navbar";

function UserHome() {

    const [{user}, dispatch] = useStateValue();
    
    return (
        <div>
            <Navbar/>
            <h2>Welcome {user} [User]</h2>
        </div>
    )
}

export default UserHome;