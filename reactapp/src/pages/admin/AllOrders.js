import Navbar from "../../components/Navbar";
import Datatable from "../../components/Datatable";
import styled from 'styled-components';

const Title = styled.h2`
    margin-top: 10px;
`

function AllOrders() {
    return (
        <div>
            <Navbar/>
            <Title style={{paddingTop: '75px'}} >All Orders</Title>
            <Datatable/>
        </div>
    )
}

export default AllOrders;