import Navbar from "../../components/Navbar";
import Datatable from "../../components/Datatable";
import { useEffect, useState } from 'react';
import { ApiClient } from '../../utils/ApiClient';


function Users() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        ApiClient.get('/admin/users').then(response => {
            console.log(response.data);
            //setUsers()
        });
    }, []);

    return (
        <div>
            <Navbar/>
            <h2 style={{ margin: '1rem' }}>All Users</h2>
            <Datatable />
        </div>
    )
}

export default Users;