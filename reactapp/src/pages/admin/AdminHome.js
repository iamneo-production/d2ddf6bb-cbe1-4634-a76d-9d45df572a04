import { useStateValue } from "../../utils/StateProvider";
import { useHistory } from 'react-router-dom';
import Navbar from "../../components/Navbar";

function AdminHome() {
    
    const [{user}, dispatch] = useStateValue();

    return (
        <div>
            <Navbar/>
            <h2>Welcome {user} [Admin]</h2>
        </div>
    )
}

export default AdminHome;