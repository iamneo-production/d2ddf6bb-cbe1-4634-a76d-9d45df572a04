import Navbar from "../../components/Navbar";
import Datatable from "../../components/Datatable";


function Users() {

    return (
        <div>
            <Navbar/>
            <h2 style={{ marginTop: '10px', paddingTop: '75px' }}>All Users</h2>
            <Datatable type="users" />
        </div>
    )
}

export default Users;